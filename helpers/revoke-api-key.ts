import axios from "axios";

export async function revokeApiKey() {
  const data = (await axios.post("/api/api-key/revoke")) as { error?: string };

  if (data.error) {
    throw new Error(data.error);
  }
}
