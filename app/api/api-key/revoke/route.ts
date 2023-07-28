import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const user = await getAuthSession().then((res) => res?.user);

    if (!user) {
      return new Response("Unauthorized to perform this action.", {
        status: 401,
      });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (!validApiKey) {
      return new Response("This API key could not be revoked.", {
        status: 500,
      });
    }

    // invalidate api key
    await db.apiKey.update({
      where: { id: validApiKey.id },
      data: {
        enabled: false,
      },
    });

    return new Response(JSON.stringify({ error: null, success: true }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(`${error.issues}`, { status: 400 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
