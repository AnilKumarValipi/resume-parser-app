from fastapi import FastAPI, UploadFile, File
from pymongo import MongoClient
from resume_parser import parse_resume
import boto3

# Connect to MongoDB
client = MongoClient("mongodb+srv://anilkumarvalipi07:PGNwULepJpTwPmzT@mymongdb.cjti5ir.mongodb.net/?retryWrites=true&w=majority&appName=MyMongDB")
db = client["resume_parser"]
collection = db["resumes"]

# AWS S3 setup
s3 = boto3.client('s3', region_name='us-east-1')  # e.g., 'us-east-1'
bucket_name = 'my-resume-parser-bucket-anil'

app = FastAPI()

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Step 1: Upload to S3
    s3.upload_fileobj(file.file, bucket_name, file.filename)

    # Step 2: Reset file pointer after upload
    file.file.seek(0)
    content = await file.read()

    # Step 3: Parse resume content
    parsed_data = parse_resume(content)

    # Step 4: Save to MongoDB
    collection.insert_one({
        "filename": file.filename,
        "parsed": parsed_data,
        "s3_url": f"https://{bucket_name}.s3.amazonaws.com/{file.filename}"
    })

    return {
        "status": "uploaded to S3 and stored in MongoDB",
        "s3_url": f"https://{bucket_name}.s3.amazonaws.com/{file.filename}",
        "parsed": parsed_data
    }
