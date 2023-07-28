import { cosineSimilarity } from "@/helpers/cosine-similarity";
import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { TextValidator } from "@/lib/validators/text";
import { z } from "zod";

type RequestBody = {
  text1: string;
  text2: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  const apiKey = req.headers.get("authorization");

  if (!apiKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { text1, text2 } = TextValidator.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return new Response("API key is not valid.", { status: 401 });
    }

    // note the starting point timestamp for the api request
    const start = new Date();

    // this is where the magic happens
    const embeddings = await Promise.all(
      [text1, text2].map(async (text) => {
        // create a vector from text
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });

        return res.data.data[0].embedding;
      })
    );

    // determine similarity between two vectors
    const textSimilarity = cosineSimilarity(embeddings[0], embeddings[1]);

    // calculate total time taken (in ms) to perform the api request
    const duration = new Date().getTime() - start.getTime();

    // persist the request
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return new Response(
      JSON.stringify({ success: true, text1, text2, textSimilarity }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // for any kind of parsing error
    if (error instanceof z.ZodError) {
      return new Response(`${error.issues}`, { status: 422 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
