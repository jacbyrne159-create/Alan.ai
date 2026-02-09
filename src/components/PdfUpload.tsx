import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";

interface PdfUploadProps {
  onComplete: () => void;
}

const PdfUpload = ({ onComplete }: PdfUploadProps) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 20 * 1024 * 1024) {
        toast.error("File must be under 20MB");
        return;
      }
      setFile(selected);
      if (!title) setTitle(selected.name.replace(/\.[^.]+$/, ""));
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setIsProcessing(true);
    try {
      // Upload to storage
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("flashcard-uploads")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Call edge function to generate flashcards
      const { data, error } = await supabase.functions.invoke("generate-flashcards", {
        body: { filePath, title: title || file.name },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`Created ${data.count} flashcards from your upload!`);
      setFile(null);
      setTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      onComplete();
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to generate flashcards");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="border-dashed border-2">
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
          <h3 className="font-semibold text-lg">Upload Study Material</h3>
          <p className="text-sm text-muted-foreground">
            Upload a PDF of lecture slides, textbook chapters, or notes — AI will generate flashcards for you.
          </p>
        </div>

        <div className="space-y-3">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.md"
            onChange={handleFileChange}
            className="cursor-pointer"
          />

          {file && (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>{file.name}</span>
                <span className="ml-auto">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              </div>
              <Input
                placeholder="Set title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                onClick={handleUpload}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating flashcards…
                  </>
                ) : (
                  "Generate Flashcards"
                )}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfUpload;
