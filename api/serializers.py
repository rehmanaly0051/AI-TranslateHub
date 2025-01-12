from rest_framework import serializers

class TranslateSerializer(serializers.Serializer):
    src_lang = serializers.CharField(required=True)
    tgt_lang = serializers.CharField(required=True)
    text = serializers.CharField(required=True)