import GridCell from "./GridCell";
import "./grid.css";

const cells = [
  { answer: "アルゴン", image: "アルゴン.gif" },
  { answer: "フッ素", image: "フッ素.gif" },
  { answer: "ホウ素", image: "ホウ素.gif" },
  { answer: "ラジウム", image: "ラジウム.gif" },
  { answer: "ルテチウム", image: "ルテチウム.gif" },
  { answer: "しゅう素", image: "臭素.gif" },
  { answer: "すいぎん", image: "水銀.gif" },
  { answer: "すい素", image: "水素.gif" },
  { answer: "たん素", image: "炭素.gif" }
];

const Grid = () => {
  return (
    <div className="grid">
      {cells.map((cell, idx) => (
        <GridCell key={idx} answer={cell.answer} index={idx} imageSrc={cell.image} />
      ))}
    </div>
  );
};

export default Grid;