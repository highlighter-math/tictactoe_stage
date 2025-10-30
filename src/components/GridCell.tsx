"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@mui/material";
import { ZoomInMap, ZoomOutMap } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  answer: string;
  index: number;
  imageSrc?: string;
};

const getCircledNumber = (i: number) => {
  const circled =
    "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";
  return circled[i] ?? String(i + 1);
};

const prod = process.env.NODE_ENV === "production";
const basePath = prod ? "/tictactoe_stage" : "";

export default function GridCell({ answer, imageSrc, index }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [visibleCountHistory, setVisibleCountHistory] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  if (!mounted) {
    return null;
  }
  
  const NormalCellContent = (
    <>
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

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(true);
        }}
        sx={{
          position: "absolute",
          top: "5%",
          right: "5%",
          width: "10%",
          height: "10%",
          color: "#333",
          fontSize: "clamp(1rem, 2vw, 2.5rem)",
          minWidth: 0,
          padding: 0,
        }}
      >
        <ZoomOutMap sx={{ width: "100%", height: "100%" }} />
      </IconButton>

      {visibleCount > 0 && (
        <button
          onClick={handleUndo}
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            fontSize: "3vh",
            padding: "0.2em 0.4em",
            background: "#eee",
            border: "1px solid #aaa",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex: "0",
          }}
        >
          ⟲
        </button>
      )}

      <div style={{ marginTop: "2vh", fontSize: "3vh" }}>
        {answer.slice(0, visibleCount).padEnd(answer.length, "_")}
      </div>

      {imageSrc && (
        <img
          src={`${basePath}/images/${imageSrc}`}
          alt={answer}
          style={{
            height: "70%",
            width: "70%",
            objectFit: "contain",
            display: "block",
            margin: "0",
          }}
        />
      )}
    </>
  );

  const ModalCellContent = (
    <>
      <div
        style={{
          position: "absolute",
          top: "0.5vh",
          left: "0.5vh",
          fontSize: "6vh",
          color: "#666",
        }}
      >
        {getCircledNumber(index)}
      </div>

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

      <div style={{ marginTop: "5vh", fontSize: "8vh" }}>
        {answer.slice(0, visibleCount).padEnd(answer.length, "_")}
      </div>

      {imageSrc && (
        <img
          src={`${basePath}/images/${imageSrc}`}
          alt={answer}
          style={{ height: "70%", width: "70%", display: "block", margin: "auto" }}
        />
      )}

    </>
  );

  return (
    <>
      <motion.div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cell"
        style={{ backgroundColor, position: "relative" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          ease: "easeOut",
        }}
      >
        {NormalCellContent}
      </motion.div>
      
      {mounted &&
        isZoomed &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
              onClick={() => setIsZoomed(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                style={{
                  backgroundColor,
                  padding: "3vh",
                  borderRadius: "1vh",
                  textAlign: "center",
                  width: "70%",
                  maxWidth: "600px",
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => setIsZoomed(false)}
                  sx={{
                    position: "absolute",
                    top: "5%",
                    right: "5%",
                    width: "10%",
                    height: "10%",
                    color: "#333",
                    minWidth: 0,
                    padding: 0,
                  }}
                >
                  <ZoomInMap sx={{ width: "100%", height: "100%" }} />
                </IconButton>
                {ModalCellContent}
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}