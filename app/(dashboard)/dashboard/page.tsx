import { ApiDashboard, RequestApiKey } from "@/components";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";

export const metadata: Metadata = {
  title: "Text Similarity API | Dashboard",
  description: "Free and Open-Source Text Similarity API",
};

const DashboardPage = async () => {
  const session = await getAuthSession();

  if (!session) return notFound();

  // valid api key
  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: session.user.id,
      enabled: true,
    },
  });

  // all api keys the user has generated irrespective of being valid
  const apiKeys = await db.apiKey.findMany({
    where: { userId: session.user.id },
  });

  // all requests made by the user with their api keys
  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()), // convert timestamp into a more human readable format
  }));

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      {apiKey ? (
        <ApiDashboard
          session={session}
          apiKeys={apiKeys}
          serializableRequests={serializableRequests}
        />
      ) : (
        <RequestApiKey />
      )}
    </div>
  );
};

export default DashboardPage;
