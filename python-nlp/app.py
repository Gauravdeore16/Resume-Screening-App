
from flask import Flask, request, jsonify
from pdfminer.high_level import extract_text
import docx2txt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

def extract_resume_text(filepath):
    if filepath.endswith('.pdf'):
        return extract_text(filepath)
    elif filepath.endswith('.docx'):
        return docx2txt.process(filepath)
    else:
        return ""

@app.route('/match-score', methods=['POST'])
def get_score():
    resume_file = request.files['resume']
    resume_file.save(resume_file.filename)
    resume_text = extract_resume_text(resume_file.filename)

    jd_text = request.form['jd']
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, jd_text])
    score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0] * 100
    return jsonify({'matchScore': round(score, 2)})

if __name__ == '__main__':
    app.run(port=5001)
