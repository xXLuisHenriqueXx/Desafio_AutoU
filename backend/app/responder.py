def suggest_response(text: str, category: str) -> str:
    if category == "Produtivo":
        return "Olá! Recebemos sua solicitação e em breve nossa equipe dará retorno."
    else:
        return "Obrigado pela sua mensagem! Ficamos felizes pelo contato."
