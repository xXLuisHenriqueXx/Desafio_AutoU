from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def classify_email(text: str) -> str:
    prompt = (
        "Classifique o seguinte email em uma das duas categorias: 'Produtivo' ou 'Improdutivo'.\n"
        "'Produtivo' = requer ação ou resposta (ex.: solicitação de suporte, dúvidas).\n"
        "'Improdutivo' = não requer ação (ex.: felicitações, agradecimentos).\n\n"
        f"Email: {text}\n\nCategoria:"
    )

    response = client.chat.completions.create(
        model="gpt-5-nano",
        messages=[
            {"role": "user", "content": prompt}
        ])

    category = response.choices[0].message.content.strip()
    if category not in ["Produtivo", "Improdutivo"]:
        category = "Improdutivo"
    return category
