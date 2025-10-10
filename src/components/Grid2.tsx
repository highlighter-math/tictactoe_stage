import GridCell from "./GridCell";
import "./grid.css";

const cells = [
  { answer: "イスラエル", image: "イスラエル.png" },
  { answer: "インド", image: "インド.png" },
  { answer: "ロシア", image: "ロシア.png" },
  { answer: "スペイン", image: "スペイン.png" },
  { answer: "ウズベキスタン", image: "ウズベキスタン.png" },
  { answer: "クロアチア", image: "クロアチア.png" },
  { answer: "コートジボワール", image: "コートジボワール.png" },
  { answer: "トルコ", image: "トルコ.png" },
  { answer: "スイス", image: "スイス.png" }
];

const Grid2 = () => {
  return (
    <div className="grid">
      {cells.map((cell, idx) => (
        <GridCell key={idx} problem_id={1} answer={cell.answer} index={idx} imageSrc={cell.image} />
      ))}
    </div>
  );
};

export default Grid2;
