"use client";

import { useState } from "react";

type Props = {
  answer: string;
  index: number;
  imageSrc?: string;
};

const getCircledNumber = (i: number) => {
  const circled = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";
  return circled[i] ?? String(i + 1);
};

const prod = process.env.NODE_ENV === "production";
const basePath = prod ? "/tictactoe_stage" : "";

export default function GridCell({ answer, imageSrc, index }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [visibleCountHistory, setVisibleCountHistory] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isFullyRevealed = visibleCount >= answer.length;

  const handleClick = () => {
    if (!isFullyRevealed) {
      setVisibleCountHistory((prev) => [...prev, visibleCount]);
      setVisibleCount((prev) => prev + 1);
    } else {
      setClickCount((prev) => (prev + 1) % 3);
    }
  };

  const handleUndo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (visibleCountHistory.length > 0) {
      const prevHistory = [...visibleCountHistory];
      const last = prevHistory.pop()!;
      setVisibleCountHistory(prevHistory);
      setVisibleCount(last);
    }
  };

  const getBaseColor = () => {
    if (!isFullyRevealed) return "#f0f0f0";
    if (clickCount === 1) return "#f0908d";
    if (clickCount === 2) return "#b2b2ff";
    return "#f0f0f0";
  };

  const getHoverColor = () => {
    if (!isFullyRevealed) return "#e0e0e0";
    if (clickCount === 1) return "#ff6666";
    if (clickCount === 2) return "#6666ff";
    return "#e0e0e0";
  };

  const backgroundColor = isHovered ? getHoverColor() : getBaseColor();

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cell"
      style={{
        backgroundColor,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0.2vh",
          left: "0.5vh",
          fontSize: "5vh",
          color: "#666",
        }}
      >
        {getCircledNumber(index)}
      </div>

      <div style={{position: "relative", top: "18%"}}>{answer.slice(0, visibleCount).padEnd(answer.length, "_")}</div>

      {imageSrc && (
        <img
          src={`${basePath}/images/${imageSrc}`}
          alt={answer}
          style={{
            position: "relative",
            top: "7%",
            width: "65%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
          }}
        />
      )}

      {visibleCount > 0 && (
        <button
          onClick={handleUndo}
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            fontSize: "3vh",
            padding: "0.2em 0.4em",
            background: "#eee",
            border: "1px solid #aaa",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ⟲
        </button>
      )}
    </div>
  );
}
