import { ApiDashboard, RequestApiKey } from "@/components";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Text Similarity API | Dashboard",
  description: "Free and Open-Source Text Similarity API",
};

const DashboardPage = async () => {
  const session = await getAuthSession();

  if (!session) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: session.user.id,
      enabled: true,
    },
  });

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      {apiKey ? <ApiDashboard /> : <RequestApiKey />}
    </div>
  );
};

export default DashboardPage;
