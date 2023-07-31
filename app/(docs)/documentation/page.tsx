import { DocumentationTabs } from "@/components";
import { Heading, Paragraph } from "@/components/ui";
import type { Metadata } from "next";
import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
  title: "Similarity API | Documentation",
  description: "Free and Open-Source Text Similarity API",
};

const DocumentationPage = () => {
  return (
    <div className='container max-w-7xl mx-auto'>
      <div className='flex flex-col items-center gap-6'>
        <Heading>Making a Request</Heading>

        <Paragraph>api/v1/text-similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default DocumentationPage;
