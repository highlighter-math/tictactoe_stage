"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@mui/material";
import { ZoomInMap, ZoomOutMap, Undo } from "@mui/icons-material";
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
          fontSize: "1.5rem",
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
          width: "15%",
          height: "15%",
          color: "#333",
          fontSize: "clamp(1rem, 2vw, 2.5rem)",
          minWidth: 0,
          padding: 0,
        }}
      >
        <ZoomOutMap sx={{ width: "100%", height: "100%" }} />
      </IconButton>

      {visibleCount > 0 && (
        <IconButton
          onClick={handleUndo}
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: "20%",
            height: "20%",
            color: "#333",
            backgroundColor: "transparent",
            zIndex: 0,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          <Undo sx={{ width: "120%", height: "120%" }} />
        </IconButton>
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
        <IconButton
          onClick={handleUndo}
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: "20%",
            height: "20%",
            color: "#333",
            backgroundColor: "transparent",
            zIndex: 0,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          <Undo sx={{ width: "100%", height: "100%" }} />
        </IconButton>
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
        style={{
          backgroundColor,
          position: "relative",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
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
        createPortal(
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
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
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  WebkitTouchCallout: "none",
                }}
                onClick={() => setIsZoomed(false)}
              >
                <motion.div
                  key="modal-content"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={(e) => {
                    handleClick();
                    e.stopPropagation();
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    backgroundColor,
                    padding: "3vh",
                    borderRadius: "1vh",
                    textAlign: "center",
                    width: "70%",
                    maxWidth: "600px",
                    position: "relative",
                    cursor: "pointer",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    WebkitTouchCallout: "none",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(false);
                    }}
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
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
