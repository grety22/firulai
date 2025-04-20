"use client";
import { useState } from "react";
import { useBodyStyle } from "./context/BodyStyleContext";
import fullGradients from "@/app/lib/classified_gradients_expanded.json";

const gradientCategories = fullGradients;
const allGradients = Object.values(gradientCategories).flat();
const tabKeys = ["All", ...Object.keys(gradientCategories)];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const { setPreview, setPermanent } = useBodyStyle();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Warm");

  const gradients =
    activeTab === "All"
      ? allGradients
      : gradientCategories[activeTab as keyof typeof gradientCategories];

  return (
    <div className="flex">
      <div className="px-10 w-1/2 md:w-1/5 sticky top-0 self-start h-screen">
        <h1 className="text-center my-10 sm:text-2xl md:text-7xl font-bold">GLLO</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {tabKeys.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setActiveIndex(null);
              }}
              className={`cursor-pointer border-gray-700 hover:bg-amber-400 hover:text-gray-800 px-5 py-3 rounded-full text-sm font-medium border-2 ${
                activeTab === tab
                  ? "bg-black/50 text-white"
                  : "bg-white/50 text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Copy Box */}
        {activeIndex !== null && (
          <div className="my-10 flex items-center gap-4 bg-white/20 backdrop-blur p-4 rounded-xl shadow-md border border-gray-200 justify-between">
            <code className="font-mono text-sm">{`${gradients[activeIndex].bg} ${gradients[activeIndex].text}`}</code>
            <div className="relative">
              <button
                className={`cursor-pointer ${gradients[activeIndex].text} transition`}
                onClick={() => {
                  navigator.clipboard.writeText(`${gradients[activeIndex].bg} ${gradients[activeIndex].text}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                title="Copy to clipboard"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4H4a2 2 0 0 1-2-2zm8 12v4h10V10h-4v4a2 2 0 0 1-2 2zm4-2V4H4v10z" fill="currentColor" />
                </svg>
              </button>
              {copied && (
                <div className="absolute -top-6 right-0 text-xs bg-black text-white px-2 py-1 rounded shadow animate-fade-in-out">
                  Copied!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gradient Grid */}
      <div className="w-1/2 md:w-4/5 m-14 grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 sm:gap-8 xl:grid-cols-8 gap-8">
        {gradients.map(({ bg, text }, index) => {
          const combined = `${bg} ${text}`;
          const isActive = activeIndex === index;
          const outline = isActive
            ? "outline-4 outline-offset-4 outline-dashed outline-gray-700"
            : "hover:outline-2 hover:outline-offset-4 hover:outline-dashed outline-gray-700";

          return (
            <div
              key={index}
              className={`group w-24 h-24 rounded-full cursor-pointer transition-all duration-300 ${combined} ${outline} flex items-center justify-center shadow-2xl`}
              onMouseEnter={() => setPreview(combined)}
              onMouseLeave={() => setPreview("")}
              onClick={() => {
                setPermanent(combined);
                setActiveIndex(index);
              }}
            >
              {/* SVG Icons */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 block group-hover:hidden">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877M1.827 7.5a5.673 5.673 0 1 1 11.346 0 5.673 5.673 0 0 1-11.346 0m3.21 1.714a.5.5 0 1 0-.82.572A4 4 0 0 0 7.5 11.5c1.36 0 2.56-.679 3.283-1.714a.5.5 0 0 0-.82-.572A3 3 0 0 1 7.5 10.5a3 3 0 0 1-2.463-1.286m.338-2.364a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75m5.125-.875a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0"
                    fill="currentColor"
                  />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 hidden group-hover:block">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 9h2m7 .05v-.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 15c-.5 1-1.79 2-4 2s-3.5-1-4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
