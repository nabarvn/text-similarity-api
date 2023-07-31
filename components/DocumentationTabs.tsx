"use client";

import { Tabs } from "@/components/ui";
import { TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import { Code } from "@/components";
import { nodejs, python } from "@/helpers/documentation-code";
import SimpleBar from "simplebar-react";

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue='nodejs' className='max-w-2xl w-full mb-12'>
      <TabsList>
        <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>

      <TabsContent value='nodejs'>
        <SimpleBar>
          <Code language='javascript' code={nodejs} show={true} animated />
        </SimpleBar>
      </TabsContent>

      <TabsContent value='python'>
        <SimpleBar>
          <Code language='python' code={python} show={true} animated />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
