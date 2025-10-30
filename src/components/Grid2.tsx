import GridCell from "./GridCell";
import "./grid.css";

const cells = [
  { answer: "パリ", image: "パリ.png" },
  { answer: "モスクワ", image: "モスクワ.png" },
  { answer: "ベルリン", image: "ベルリン.png" },
  { answer: "ローマ", image: "ローマ.png" },
  { answer: "アテネ", image: "アテネ.png" },
  { answer: "ペキン", image: "ペキン.png" },
  { answer: "ウランバートル", image: "ウランバートル.png" },
  { answer: "マドリード", image: "マドリード.png" },
  { answer: "ロンドン", image: "ロンドン.png" }
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
