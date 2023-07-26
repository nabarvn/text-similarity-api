import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);

    if (!user) {
      return new Response("Unauthorized to perform this action.", {
        status: 401,
      });
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (existingApiKey) {
      return new Response("You already have a valid API key.", { status: 400 });
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(32),
      },
    });

    return new Response(JSON.stringify({ error: null, createdApiKey }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(`${error.issues}`, { status: 400 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
