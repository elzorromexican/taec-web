import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.TAEC_GEMINI_KEY || process.env.GEMINI_API_KEY;
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(res => res.json())
  .then(data => {
    const models = data.models.filter(m => m.name.includes('flash')).map(m => m.name);
    console.log("Flash Models:", models);
  });
