
-- Table for weekly deep work targets per user
CREATE TABLE public.study_targets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  weekly_deep_work_sessions integer NOT NULL DEFAULT 5,
  session_duration_minutes integer NOT NULL DEFAULT 90,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.study_targets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own targets"
  ON public.study_targets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own targets"
  ON public.study_targets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own targets"
  ON public.study_targets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own targets"
  ON public.study_targets FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_study_targets_updated_at
  BEFORE UPDATE ON public.study_targets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table for scheduled 90-min blocks
CREATE TABLE public.study_blocks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  subject text,
  block_date date NOT NULL,
  start_time time NOT NULL,
  block_type text NOT NULL DEFAULT 'focus', -- focus | rest | nsdr
  completed boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.study_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own blocks"
  ON public.study_blocks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own blocks"
  ON public.study_blocks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blocks"
  ON public.study_blocks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blocks"
  ON public.study_blocks FOR DELETE
  USING (auth.uid() = user_id);

-- Table to store user's calendar connections (ical URLs or Google tokens)
CREATE TABLE public.calendar_connections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  connection_type text NOT NULL, -- 'ical' | 'google'
  ical_url text,
  display_name text NOT NULL DEFAULT 'My Calendar',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.calendar_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own calendar connections"
  ON public.calendar_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calendar connections"
  ON public.calendar_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar connections"
  ON public.calendar_connections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar connections"
  ON public.calendar_connections FOR DELETE
  USING (auth.uid() = user_id);
