from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def suggest_response(text: str, category: str) -> str:
    if category == "Produtivo":
        prompt = (
            f"Você é um assistente profissional de atendimento.\n"
            f"Leia este email e gere uma resposta curta e profissional confirmando o recebimento e oferecendo ajuda se necessário.\n\n"
            f"Email: {text}\n\nResposta:"
        )
    else:
        prompt = (
            f"Você é um assistente simpático de atendimento.\n"
            f"Leia este email e gere uma resposta curta e amigável de agradecimento.\n\n"
            f"Email: {text}\n\nResposta:"
        )

    response = client.chat.completions.create(
        model="gpt-5-nano",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()
