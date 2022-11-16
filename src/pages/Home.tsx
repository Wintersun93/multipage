import React, { useState } from "react";
import "./home.scss";

type Point = {
  id: number;
  x: number;
  y: number;
  offset: number;
};

function Home() {
  const [points, setPoints] = useState<Point[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { pageX, pageY } = e;
    setPoints([
      ...points,
      {
        id: Date.now(),
        x: pageX,
        y: pageY,
        offset: 7.5,
      },
    ]);
  };

  const drawCircles = () => {
    let tempArr: Point[] = new Array();
    for (let i = 0; i < 5; i++) {
      tempArr[i] = {
        id: Date.now() + Math.random(),
        x: 315 + 50,
        y: 145 + 50 * i,
        offset: 7.5,
      };
    }
    setPoints([...points, ...tempArr]);
  };

  return (
    <>
      <button onClick={drawCircles}>Draw Circles</button>
      <div className="home" onClick={handleClick}>
        {points.map((point) => (
          <div
            key={point.id}
            className="circle"
            style={{
              left: point.x - point.offset,
              top: point.y - point.offset,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Home;
