
-- Storage bucket for uploaded PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('flashcard-uploads', 'flashcard-uploads', false);

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'flashcard-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read their own files
CREATE POLICY "Users can read their own files"
ON storage.objects FOR SELECT
USING (bucket_id = 'flashcard-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'flashcard-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Flashcard sets table
CREATE TABLE public.flashcard_sets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  source_filename TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcard_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sets"
ON public.flashcard_sets FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sets"
ON public.flashcard_sets FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sets"
ON public.flashcard_sets FOR DELETE USING (auth.uid() = user_id);

-- Individual flashcards table
CREATE TABLE public.flashcards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id UUID NOT NULL REFERENCES public.flashcard_sets(id) ON DELETE CASCADE,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own flashcards"
ON public.flashcards FOR SELECT
USING (EXISTS (SELECT 1 FROM public.flashcard_sets WHERE id = flashcards.set_id AND user_id = auth.uid()));

CREATE POLICY "Users can create flashcards in their sets"
ON public.flashcards FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.flashcard_sets WHERE id = flashcards.set_id AND user_id = auth.uid()));

CREATE POLICY "Users can delete their own flashcards"
ON public.flashcards FOR DELETE
USING (EXISTS (SELECT 1 FROM public.flashcard_sets WHERE id = flashcards.set_id AND user_id = auth.uid()));
