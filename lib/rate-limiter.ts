import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(9, "1 h"),
  prefix: "@upstash/ratelimit",
});
