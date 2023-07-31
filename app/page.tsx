import { Heading, Paragraph } from "@/components/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Text Similarity API | Home",
  description: "Free and Open-Source Text Similarity API",
};

export default function Home() {
  return (
    <section className='overflow-y-auto h-full md:overflow-hidden lg:scrollbar-thin lg:scrollbar-thumb-slate-300 lg:dark:scrollbar-thumb-slate-500 lg:scrollbar-thumb-rounded-sm'>
      <div className='flex items-center justify-center min-h-screen lg:h-screen mb-12'>
        <div className='container max-w-7xl mx-auto w-full h-full'>
          <div className='relative flex flex-col justify-start lg:justify-center items-center lg:items-start h-full gap-6 lg:-mt-14'>
            <Heading
              size='lg'
              className='three-d text-black dark:text-light-gold lg:ml-2'
            >
              Easily determine <br /> text similarity.
            </Heading>

            <Paragraph className='max-w-md xl:max-w-lg lg:text-left lg:ml-2'>
              With this interface, you can easily determine the similarity
              between two pieces of text with a free{" "}
              <Link
                href='/login'
                className='underline underline-offset-2 text-black dark:text-light-gold'
              >
                API key
              </Link>
              .
            </Paragraph>

            <div className='relative w-full max-w-lg lg:max-w-md xl:max-w-xl 2xl:max-w-2xl lg:absolute lg:right-2 aspect-square'>
              <Image
                priority
                fill
                src='/typewriter.png'
                alt='Typewriter'
                quality={100}
                style={{ objectFit: "contain" }}
                sizes='50vw'
                className='img-shadow'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
