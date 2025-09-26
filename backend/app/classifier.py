from transformers import pipeline

classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

def classify_email(text: str) -> str:
    result = classifier(text[:512])[0]
    label = result["label"]

    if label == "POSITIVE":
        return "Produtivo"
    else:
        return "Improdutivo"
