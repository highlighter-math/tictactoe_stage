import GridCell from "./GridCell";
import "./grid.css";

const cells = [
  { answer: "アペリー定数", image: "アペリー定数.png" },
  { answer: "アボガドロ定数", image: "アボガドロ定数.png" },
  { answer: "オイラー定数", image: "オイラー定数.png" },
  { answer: "ファラデー定数", image: "ファラデー定数.png" },
  { answer: "プランク定数", image: "プランク定数.png" },
  { answer: "円周率", image: "円周率.png" },
  { answer: "光速", image: "光速.png" },
  { answer: "標準気圧", image: "標準気圧.png" },
  { answer: "万有引力定数", image: "万有引力定数.png" }
];

const Grid2 = () => {
  return (
    <div className="grid">
      {cells.map((cell, idx) => (
        <GridCell key={idx} answer={cell.answer} index={idx} imageSrc={cell.image} />
      ))}
    </div>
  );
};

export default Grid2;