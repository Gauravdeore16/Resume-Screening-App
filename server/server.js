const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse"); // To extract text from resume PDF

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/api/score", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jd;
    const resumeFile = req.file;

    const dataBuffer = fs.readFileSync(resumeFile.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // Very basic score logic: count JD keywords in resume
    const jdWords = jobDescription.toLowerCase().split(/\W+/);
    const resumeWords = resumeText.toLowerCase();

    let matches = jdWords.filter(word => resumeWords.includes(word));
    let score = (matches.length / jdWords.length) * 100;
    score = Math.round(score);

    // Cleanup temp file
    fs.unlinkSync(resumeFile.path);

    res.json({ matchScore: score });
  } catch (error) {
    console.error("Error in /api/score:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
