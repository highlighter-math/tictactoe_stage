import GridCell from "./GridCell";
import "./grid.css";

const cells = [
  { answer: "ツバル", image: "ツバル.png" },
  { answer: "ボリビア", image: "ボリビア.png" },
  { answer: "二ホン", image: "日本.png" },
  { answer: "デンマーク", image: "デンマーク.png" },
  { answer: "スウェーデン", image: "スウェーデン.png" },
  { answer: "インド", image: "インド.png" },
  { answer: "モナコ", image: "モナコ.png" },
  { answer: "イタリア", image: "イタリア.png" },
  { answer: "バチカン市国", image: "バチカン市国.png" }
];

const Grid = () => {
  return (
    <div
      className="grid"
    >
      {cells.map((cell, idx) => (
        <GridCell
          key={idx}
          answer={cell.answer}
          index={idx}
          imageSrc={cell.image}
        />
      ))}
    </div>
  );
};

export default Grid;