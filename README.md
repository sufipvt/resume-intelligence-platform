# 📄 Resume Intelligence Platform

An AI-powered Resume Intelligence Platform that enables users to upload a PDF resume, extract structured information using an LLM, and interact with the resume through natural language conversations.

Built using **FastAPI**, **Groq GPT-OSS-120B**, **Pydantic**, and a responsive **HTML/CSS/JavaScript** frontend.

---

## 🚀 Live Demo

> **Frontend:** https://resume-intelligence-platform-plum.vercel.app/

> **Backend API:** https://resume-intelligence-api-3zg1.onrender.com

---

## 📌 Features

- 📄 Upload PDF resumes
- 🤖 AI-powered resume parsing
- 💬 Chat with uploaded resumes
- 📋 Generate professional resume summaries
- 🛠 Extract technical skills
- 💼 Analyze work experience
- 🚀 View projects and certifications
- 🎯 Generate interview questions
- ⚡ FastAPI REST API
- 📦 Structured data extraction using Pydantic
- 🎨 Clean and responsive frontend

---

# 🏗 Architecture

```text
                 User
                   │
                   ▼
        HTML • CSS • JavaScript
                   │
                   ▼
             FastAPI Backend
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
   PDF Extraction        Resume Parsing
   (PyPDF)               (Groq GPT OSS)
        │                     │
        └──────────┬──────────┘
                   ▼
          Structured Resume (JSON)
                   │
                   ▼
            Resume Chat Service
                   │
                   ▼
            Groq Language Model
```

---

# 🛠 Tech Stack

## Backend

- FastAPI
- Pydantic
- Groq API
- PyPDF
- Python 3.11

## Frontend

- HTML5
- CSS3
- JavaScript

## AI

- GPT OSS 120B (Groq)

---

# 📂 Project Structure

```text
resume-intelligence-platform/

│

├── backend/
│   ├── config.py
│   ├── main.py
│   ├── models.py
│   ├── prompts.py
│   ├── services.py
│   └── storage.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── pyproject.toml
├── uv.lock
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/resume-intelligence-platform.git

cd resume-intelligence-platform
```

---

## Create Environment Variables

Create a `.env` file.

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## Install Dependencies

Using **uv**

```bash
uv sync
```

---

## Run Backend

```bash
uv run uvicorn backend.main:app --reload
```

Backend will start on

```
http://127.0.0.1:8000
```

---

## Run Frontend

Open

```
frontend/index.html
```

or run it using **Live Server**.

---

# 📡 API Endpoints

## Upload Resume

```
POST /upload
```

Uploads a PDF resume and returns a unique Resume ID.

### Response

```json
{
  "resume_id": "uuid",
  "name": "John Doe"
}
```

---

## Chat with Resume

```
POST /chat
```

### Request

```json
{
  "resume_id": "uuid",
  "question": "Summarize this resume"
}
```

### Response

```json
{
  "answer": "..."
}
```

---

# 🧠 AI Workflow

```text
Upload Resume
      │
      ▼
Read PDF
      │
      ▼
Extract Text
      │
      ▼
Groq LLM
      │
      ▼
Structured Resume JSON
      │
      ▼
Store Resume in Memory
      │
      ▼
User Asks Question
      │
      ▼
Resume JSON + Prompt
      │
      ▼
Groq LLM
      │
      ▼
Formatted Markdown Response
```

---

# 📖 What I Learned

Through this project, I gained hands-on experience with:

- Building REST APIs using FastAPI
- Request validation with Pydantic
- Prompt Engineering
- Integrating Large Language Models using Groq
- Parsing PDF documents
- Backend service architecture
- Separating business logic from API routes
- Frontend–Backend communication using Fetch API
- CORS configuration
- JSON serialization and validation
- Project modularization
- Git & GitHub workflow

---

# ⚠ Current Limitation

The application currently stores uploaded resumes in memory using a Python dictionary.

Restarting the server clears all uploaded resumes.

Future versions will use a database such as PostgreSQL or MongoDB for persistent storage.

---

# 🚀 Future Improvements

- ATS Resume Scoring
- Job Description Matching
- Resume Improvement Suggestions
- Cover Letter Generator
- LinkedIn Profile Generator
- Chat History
- User Authentication
- Database Integration
- Resume Versioning
- Multiple Resume Support
- Docker Deployment

---

# 👨‍💻 Author

**Sufiyan Rizvi**

B.Tech Computer Science (AI & ML)

GitHub: https://github.com/sufipvt


---

# 📄 License

This project is licensed under the MIT License.