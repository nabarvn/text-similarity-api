"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeProps {
  code: string;
  show: boolean;
  language: string;
  animated?: boolean;
  animationDelay?: number;
}

const Code = ({
  code,
  show,
  language,
  animated,
  animationDelay,
}: CodeProps) => {
  const { theme: apptheme } = useTheme();
  const [text, setText] = useState(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;

      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;

          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  // number of lines
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = apptheme === "light" ? themes.nightOwlLight : themes.nightOwl;

  return (
    <Highlight code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div key={`line-${i}`} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, i });

                  return <span key={index} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
