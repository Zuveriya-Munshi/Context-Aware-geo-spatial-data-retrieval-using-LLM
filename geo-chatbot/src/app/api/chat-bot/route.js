import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("API Key: ", apiKey);

  if (!apiKey) {
    return NextResponse.json({ error: "The OPENAI_API_KEY environment variable is missing or empty." }, { status: 500 });
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    //Grabbing user's input
    const params = await request.json();
    
    //passing it to chatbot
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Hello, world",
        },
        {
          role: "user",
          content: params.prompt 
        }
      ],
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating completion: ", error);

    if (error.response && error.response.status === 429) {
      return NextResponse.json({ error: "You exceeded your current quota, please check your plan and billing details." }, { status: 429 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
