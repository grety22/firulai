"use client";

import { useBodyStyle } from "../context/BodyStyleContext";

export default function StyledBody({ children }: { children: React.ReactNode }) {
  const { current } = useBodyStyle();

  return (
    <body className={`antialiased min-h-screen flex flex-col items-center justify-center transition-all duration-300 ${current}`}>
      {children}
    </body>
  );
}
