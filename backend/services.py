import json
from typing import BinaryIO

from pypdf import PdfReader

from config import client, MODEL_NAME
from models import Resume, resume_schema
from prompts import CHAT_SYSTEM_PROMPT, PARSER_SYSTEM_PROMPT



def read_pdf(pdf_file: BinaryIO) -> str:
    reader = PdfReader(pdf_file)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text





def ask_candidate(question: str, resume: Resume) -> str:
    system_prompt = CHAT_SYSTEM_PROMPT.format(

        resume_json=resume.model_dump_json(indent=2)

    )
   
    user_prompt = f"""

    Question: {question}
    """
    message_system = {
        "role":"system",
        "content":system_prompt
    }
    message_user={
        "role" : "user",
        "content" :user_prompt
    }
    messages=[message_system, message_user]
    response=client.chat.completions.create(model=MODEL_NAME, messages=messages)
    answer = response.choices[0].message.content
    return answer

def parse_resume(resume_text: str) -> Resume:
    system_prompt = PARSER_SYSTEM_PROMPT.format(
        resume_schema=resume_schema
    )

    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    message_system = {
        "role":"system",
        "content":system_prompt
    }
    message_user={
        "role" : "user",
        "content" :user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=MODEL_NAME, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content

    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume