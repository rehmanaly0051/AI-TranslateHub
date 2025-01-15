"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { translateText } from "@/lib/translateService";

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "Chinese (Mandarin)" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "ur", name: "Urdu" },
  { code: "ja", name: "Japanese" },
  { code: "de", name: "German" },
  { code: "tr", name: "Turkish" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
];


export function Translator() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ur");
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);  // ✅ Added state to detect client side

  // ✅ Ensure the component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    try {
      setIsPending(true);
      setError("");
      const translatedText = await translateText(text, sourceLang, targetLang);
      setResult(translatedText);
    } catch (error: unknown) {
      const errorAsError = error as Error;
      console.error("Translation failed:", errorAsError);
      setError(errorAsError.message || "Translation failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  if (!isClient) return null;  // ✅ Prevent server-side rendering

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Language Translator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sourceLang">Source Language</Label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger id="sourceLang">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetLang">Target Language</Label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger id="targetLang">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="text">Enter Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text to translate..."
            className="min-h-[100px]"
          />
        </div>
        <Button onClick={handleTranslate} disabled={isPending || !text.trim()} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            "Translate"
          )}
        </Button>
        {error && <div className="text-center text-red-500">{error}</div>}
        {result && (
          <div className="space-y-2">
            <Label>Translated Text</Label>
            <div className="p-4 rounded-md bg-muted/50 min-h-[100px] whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
