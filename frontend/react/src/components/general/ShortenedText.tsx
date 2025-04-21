import React from "react";

interface ShortTextProps {
  text: string;
}

const ShortenedText: React.FC<ShortTextProps> = ({ text }) => {
  const textShort = text.slice(0, 99) + "...";

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: textShort || "",
      }}
    />
  );
};

export default ShortenedText;
