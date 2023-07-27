import axios from "axios";

export async function createApiKey() {
  const { data } = await axios.get("/api/api-key/create");

  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(" "));
    }

    throw new Error(data.error ?? "Something went wrong.");
  }

  return data.createdApiKey.key as string;
}
