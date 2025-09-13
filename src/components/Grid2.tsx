import GridCell from "./GridCell";
import "./grid.css";

const cells = [
  { answer: "ウクライナ", image: "ウクライナ.png" },
  { answer: "インド", image: "インド.png" },
  { answer: "カナダ", image: "カナダ.png" },
  { answer: "タイ", image: "タイ.png" },
  { answer: "エルサルバドル", image: "エルサルバドル.png" },
  { answer: "ベルギー", image: "ベルギー.png" },
  { answer: "コートジボワール", image: "コートジボワール.png" },
  { answer: "カタール", image: "カタール.png" },
  { answer: "ロシア", image: "ロシア.png" }
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
