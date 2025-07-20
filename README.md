
# AI Resume Screening System (MERN + Python NLP)

## 📦 Project Structure
- `client/`: React frontend to upload resume & show score
- `server/`: Node.js backend to handle uploads and call Python service
- `python-nlp/`: Flask NLP service to process and compare resumes

## 🚀 How to Run

### 1. Python NLP Microservice
```bash
cd python-nlp
pip install flask scikit-learn docx2txt pdfminer.six
python app.py
```

### 2. Node Server
```bash
cd server
npm install express multer axios cors form-data
node server.js
```

### 3. React Frontend
```bash
cd client
npm install axios
npm start
```

## ✅ Use
- Upload a resume and paste job description.
- Score is returned based on skill match.
