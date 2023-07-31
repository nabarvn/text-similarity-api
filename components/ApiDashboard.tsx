import { Session } from "next-auth";
import { notFound } from "next/navigation";
import { Heading, Input, Paragraph, Table } from "@/components/ui";
import { ApiKeyOptions } from "@/components";

type ApiKey = {
  id: string;
  key: string;
  enabled: boolean;
  userId: string;
};

type SerializableRequest = {
  timestamp: string;
  id: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  usedApiKey: string;
  apiKeyId: string;
};

interface ApiDashboardProps {
  session: Session | null;
  apiKeys: ApiKey[];
  serializableRequests: SerializableRequest[];
}

const ApiDashboard = ({
  session,
  apiKeys,
  serializableRequests,
}: ApiDashboardProps) => {
  if (!session) return notFound();

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) return notFound();

  return (
    <div className='container flex flex-col gap-6 mb-16'>
      <Heading>Welcome back, {session.user.name}</Heading>

      <div className='flex flex-col lg:flex-row gap-4 justify-center lg:justify-start items-center'>
        <Paragraph>Your API key:</Paragraph>

        <Input className='w-fit truncate' readOnly value={activeApiKey.key} />

        <ApiKeyOptions
          apiKeyId={activeApiKey.id}
          apiKeyValue={activeApiKey.key}
        />
      </div>

      <Paragraph className='text-center lg:text-left w-fit lg:w-full mx-auto lg:mx-0 mt-4 -mb-4'>
        Your API history:
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
