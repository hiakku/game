import "./App.css";
import Action from "./action/action";
import { useEffect, useRef, useState } from "react";
import {
  FRAME_SIZE,
  START,
  FOOD_START,
  SCALE,
  SNAKE_DIRECTIONS,
  SPEED_SNAKE,
} from "./constant/constant";
import Instruction from "./components/Instruction";
let score = 0;
function App() {
  const canvasRef = useRef(null);
  const [snakeGame, setSnakeGame] = useState(START);
  const [food, setFood] = useState(FOOD_START);
  const [direction, setDirection] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isShowReset, setIsShowReset] = useState(false);
  const [isShowInstruction, setIsShowInstruction] = useState(true);
  const handleResize = () => {
    if (window.innerWidth <= 475) {
      canvasRef.current.style.width = "300px";
      canvasRef.current.style.height = "440px";
    } else if (window.innerWidth <= 768) {
      canvasRef.current.style.width = "450px";
      canvasRef.current.style.height = "540px";
    } else {
      canvasRef.current.style.width = "680px";
      canvasRef.current.style.height = "640px";
    }
  };
  useEffect(() => {
    handleResize();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [handleResize]);
  const startSnakeMovement = () => {
    score = 0;
    setSnakeGame(START);
    setIsShowReset(true);
    setFood(FOOD_START);
    setDirection([0, -1]);
    setSpeed(SPEED_SNAKE);
    setGameOver(false);
  };
  const endSnakeMovement = () => {
    setSpeed(null);
    setGameOver(true);
  };
  const snakeMovement = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDirection(SNAKE_DIRECTIONS[keyCode]);
  const foodCreation = () =>
    food.map((_, i) => Math.floor((Math.random() * FRAME_SIZE[i]) / SCALE));
  const isSnakeCollided = (pieces, snk = snakeGame) => {
    if (
      pieces[0] * SCALE >= FRAME_SIZE[0] ||
      pieces[0] < 0 ||
      pieces[1] * SCALE >= FRAME_SIZE[1] ||
      pieces[1] < 0
    )
      return true;
    for (const segment of snk) {
      if (pieces[0] === segment[0] && pieces[1] === segment[1]) return true;
    }
    return false;
  };
  const isAppleEaten = (newSnake) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = foodCreation();
      while (isSnakeCollided(newFood, newSnake)) {
        newFood = foodCreation();
      }
      setFood(newFood);
      score += 10;
      return true;
    }
    return false;
  };
  const loopSnake = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snakeGame));
    const newSnakeHead = [
      snakeCopy[0][0] + direction[0],
      snakeCopy[0][1] + direction[1],
    ];
    snakeCopy.unshift(newSnakeHead);
    if (isSnakeCollided(newSnakeHead)) endSnakeMovement();
    if (!isAppleEaten(snakeCopy)) snakeCopy.pop();
    setSnakeGame(snakeCopy);
  };
  Action(() => loopSnake(), speed);

  useEffect(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    canvasContext.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    canvasContext.clearRect(0, 0, FRAME_SIZE[0], FRAME_SIZE[1]);
    canvasContext.fillStyle = "#90EE90";
    snakeGame.forEach(([x, y]) => canvasContext.fillRect(x, y, 1, 1));
    canvasContext.fillStyle = "#FFA07A";
    canvasContext.fillRect(food[0], food[1], 1, 1);
  }, [snakeGame, food, gameOver]);
  return (
    <div className="App">
      {isShowInstruction && (
        <Instruction setIsShowInstruction={setIsShowInstruction} />
      )}
      <header
        className="App-header"
        role="button"
        tabIndex="0"
        onKeyDown={(e) => snakeMovement(e)}
      >
        {gameOver && (
          <div className="gameOver">
            <div>Total Score: {score}</div>
            Game Over
          </div>
        )}
        <canvas
          style={{
            border: "1px solid white",
            boxShadow: "0 3px 14px rgba(255,255,255,0.6)",
          }}
          ref={canvasRef}
          width={`${FRAME_SIZE[0]}px`}
          height={`${FRAME_SIZE[1]}px`}
        />
        <div className="buttonContainer">
          <button onClick={startSnakeMovement} className="button">
            {isShowReset ? "Reset Game" : "Start Game"}
          </button>
          <button
            onClick={() => {
              // setSpeed(null);
              setIsShowInstruction(true);
            }}
            className="button"
          >
            Instructions
          </button>
          <button className="button">Score: {score}</button>
        </div>
      </header>
    </div>
  );
}

export default App;
