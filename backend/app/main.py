from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from classifier import classify_email
from responder import suggest_response
from pydantic import BaseModel
import PyPDF2

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

@app.post("api/process_email/file")
async def process_email_file(file: UploadFile = File(...)):
    if file.filename.endswith(".txt"):
        content = await file.read()
        email_text = content.decode("utf-8", errors="ignore")
    elif file.filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(file.file)
        email_text = " ".join(
            [page.extract_text() for page in reader.pages if page.extract_text()]
        )
    else:
        return JSONResponse({"error": "Formato não suportado"}, status_code=400)

    category = classify_email(email_text)
    response = suggest_response(email_text, category)

    return {"categoria": category, "resposta": response}


@app.post("api/process_email/text")
async def process_email_text(body: TextInput):
    email_text = body.text
    category = classify_email(email_text)
    response = suggest_response(email_text, category)

    return {"categoria": category, "resposta": response}    
