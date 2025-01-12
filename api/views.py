from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from .serializers import TranslateSerializer


class TranslateView(GenericAPIView):
    serializer_class = TranslateSerializer

    # Load M2M100 model and tokenizer
    MODEL_NAME = "facebook/m2m100_418M"  # Switch to "facebook/m2m100_1.2B" for better accuracy
    tokenizer = M2M100Tokenizer.from_pretrained(MODEL_NAME)
    model = M2M100ForConditionalGeneration.from_pretrained(MODEL_NAME)

    def post(self, request, *args, **kwargs):
        # Validate the input using the serializer
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Extract validated data
        src_lang = serializer.validated_data['src_lang']
        tgt_lang = serializer.validated_data['tgt_lang']
        text = serializer.validated_data['text'].strip()

        # Ensure source and target languages are different
        if src_lang == tgt_lang:
            return Response(
                {"error": "Source and target languages must be different."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Perform the translation
            translated_text = self.perform_translation(text, src_lang, tgt_lang)
            return Response({"translated_text": translated_text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_translation(self, text, src_lang, tgt_lang):
        """
        Translate text using M2M100.
        """
        # Set the source language for the tokenizer
        self.tokenizer.src_lang = src_lang

        # Tokenize the input text
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)

        # Generate the translated text
        generated_tokens = self.model.generate(
            **inputs,
            forced_bos_token_id=self.tokenizer.get_lang_id(tgt_lang)  # Set target language
        )

        # Decode and return the translated text
        return self.tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
