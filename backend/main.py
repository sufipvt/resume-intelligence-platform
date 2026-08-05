from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid

from models import ChatRequest
from services import read_pdf, parse_resume, ask_candidate
from storage import resumes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/")
def home() -> dict:
    return {"message": "Welcome to the Resume Parser API!"}



@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)) -> dict:

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF file.")

    resume_text = read_pdf(file.file)
    resume = parse_resume(resume_text)
    resume.model_dump_json(indent=2)
    resume_id = str(uuid.uuid4())
    resumes[resume_id] = resume

    return {
    "resume_id": resume_id,
    "name": resume.name
    }

    



@app.post("/chat")
def chat(request: ChatRequest) -> dict:
    if request.resume_id not in resumes:
        raise HTTPException(status_code=404, detail="Resume not found. Please upload a resume first.")
    resume = resumes[request.resume_id]
    answer = ask_candidate(request.question, resume)
    return {"answer": answer}




