"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/views/components/ui/tooltip";

type TruncatedCellContentProps = React.JSX.IntrinsicElements["div"];

export const TruncatedCellContent = (props: TruncatedCellContentProps) => {
  const { children, className, ...rest } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        const element = contentRef.current;

        const isTextTruncated =
          element.scrollWidth > element.clientWidth ||
          element.scrollHeight > element.clientHeight;

        setIsTruncated(isTextTruncated);

        const text = element.textContent || element.innerText || "";
        setTextContent(text);
      }
    };

    const rafId = requestAnimationFrame(() => {
      checkTruncation();
    });

    window.addEventListener("resize", checkTruncation);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", checkTruncation);
    };
  }, []);

  const cellContent = (
    <div
      ref={contentRef}
      className={cn("w-full truncate", className)}
      {...rest}
    >
      {children}
    </div>
  );

  if (isTruncated && textContent) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cellContent}</TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs break-words">{textContent}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return cellContent;
};
