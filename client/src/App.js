
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [score, setScore] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jd", jd);

    const res = await axios.post("http://localhost:5000/api/score", formData);
    setScore(res.data.matchScore);
  };

  return (
    <div>
      <h2>Resume Screening App</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste Job Description" />
        <button type="submit">Check Score</button>
      </form>
      {score && <h3>Match Score: {score}%</h3>}
    </div>
  );
}

export default App;
