
import { GoogleGenAI, Type } from "@google/genai";
import type { Post } from '../types';
import { Platform, Sentiment } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateAndAnalyzeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      platform: {
        type: Type.STRING,
        enum: [Platform.Twitter, Platform.Reddit],
        description: 'The social media platform for the post.',
      },
      username: {
        type: Type.STRING,
        description: 'A fictional, realistic username (e.g., @user123).',
      },
      content: {
        type: Type.STRING,
        description: 'The text content of the social media post.',
      },
      sentiment: {
        type: Type.STRING,
        enum: [Sentiment.POSITIVE, Sentiment.NEGATIVE, Sentiment.NEUTRAL],
        description: 'The sentiment of the post content.',
      },
    },
    required: ["platform", "username", "content", "sentiment"],
  },
};

export const generateAndAnalyzePosts = async (hashtag: string, count: number): Promise<Post[]> => {
  try {
    const prompt = `Generate ${count} realistic social media posts about the topic "${hashtag}". The posts should be diverse in opinion and style, coming from either 'Twitter' or 'Reddit'. For each post, provide a fictional username, the content of the post, and a sentiment analysis ('POSITIVE', 'NEGATIVE', or 'NEUTRAL').`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: generateAndAnalyzeSchema,
        temperature: 1, // Higher temperature for more creative/diverse posts
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    if (!Array.isArray(parsedResponse)) {
        console.error("Gemini API did not return an array:", parsedResponse);
        return [];
    }

    const postsWithTimestamp: Post[] = parsedResponse.map((post: Omit<Post, 'timestamp'>) => ({
        ...post,
        timestamp: Date.now(),
    }));

    return postsWithTimestamp;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // In a real app, you might want to throw the error or handle it more gracefully
    return [];
  }
};
