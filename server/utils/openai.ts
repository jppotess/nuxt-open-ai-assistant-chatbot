import * as dotenv from 'dotenv';
dotenv.config();


import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
});


export const assistant = process.env.OPEN_AI_ASSISTANT_ID;