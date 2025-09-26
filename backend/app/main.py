from fastapi import FastAPI, UploadFile, Form, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.classifier import classify_email
from app.responder import suggest_response
from app.database import SessionLocal, engine, Base
from app.models import Email
import PyPDF2

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/process_email/")
async def process_email(
    file: UploadFile = None,
    text: str = Form(None),
    db: Session = Depends(get_db)
):
    email_text = None

    if file:
        if file.filename.endswith(".txt"):
            content = await file.read()
            email_text = content.decode("utf-8", errors="ignore")
        elif file.filename.endswith(".pdf"):
            reader = PyPDF2.PdfReader(file.file)
            email_text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
        else:
            return JSONResponse({"error": "Formato não suportado"}, status_code=400)
    elif text:
        email_text = text
    else:
        return JSONResponse({"error": "Nenhum email enviado"}, status_code=400)

    category = classify_email(email_text)

    response = suggest_response(email_text, category)

    email_entry = Email(content=email_text, category=category, response=response)
    db.add(email_entry)
    db.commit()
    db.refresh(email_entry)

    return {
        "id": email_entry.id,
        "categoria": category,
        "resposta": response
    }
