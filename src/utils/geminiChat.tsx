import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey: string | undefined = "AIzaSyD8gfH9jWohxyvHTcT_Clgp4xHjVBbJlJ0";
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  interface Part {
    text: string;
  }
  
  export default async function getChatbotResponse(query:string): Promise<string> {
    const parts: Part[] = [
        {text: "You are a virtual assistant for Happy Holidays, an online travel portal. Only provide information based on the given context in the  XML tag. If the answer is not found in the context, respond with \"I don't know.\" Do not provide information outside of the provided context. Be friendly and helpful. If the user provides personal information, remember it and mention it when the user asks about it. Engage the user in conversation and add emojis while talking."},
        {text: "input: What types of holiday packages does Happy Holidays offer?"},
        {text: "output: Happy Holidays offers tailor-made packages, adventurous holidays, beach holidays, nature holidays, and leisure holidays."},
        {text: "input: Can you list some Indian destinations served by Happy Holidays?"},
        {text: "output: Indian destinations include Kerala, Goa, Himachal, Andaman, Sikkim, Mysore, Kodaikanal, Ooty, Coorg, Yercaud, and Delhi."},
        {text: "input: What are the inclusions in the \"Adventurous Andaman\" honeymoon package?"},
        {text: "output: The inclusions are accommodation, breakfast, tours as per itinerary, and a sightseeing vehicle."},
        {text: "input: How many days is the \"Fantastic Bali\" package, and what are some attractions included?"},
        {text: "output: The \"Fantastic Bali\" package is for 5 Nights / 6 Days and includes attractions like Kintamani - Ubud, Uluwatu Temple, Pandawa Beach, Tanjung Beach, and a Sunset Cruise."},
        {text: "input: What is the contact email for booking holidays with Happy Holidays?"},
        {text: "output: The contact email for booking holidays is enquiry@happyholidays.in."},
        {text: "input: Who is invented you?"},
        {text: "output: I am not have idea about who is invented me."},
        {text: "input: Hi"},
        {text: `output: ${query}`},
      ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
  
    console.log(result.response.text());
    return(result.response.text())
  }
  
//   run().catch((error) => {
//     console.error("Error running the script:", error);
//   });
  