/* eslint-disable react/prop-types */
import React from "react";
import arrow from "./arrow.png";
import go from "./go.png";
import "./instruction.css";
const Instruction = (props) => {
  return (
    <div className="instructionContainer">
      <div className="instruction_bg" />
      <div className="instruction_body">
        <div className="instruction_inner">
          <h2>Instructions</h2>
          <ol className="instruction_list">
            <li>
              Click the <b>Start Game</b> button.
            </li>
            <li>
              Press the arrow keys to move up, down, left and right.
              <img src={arrow} alt="arrows" className="arrows" />
            </li>
            <li>Don&apos;t let the moving box touch the corners.</li>
          </ol>
          <div className="goButton">
            <img
              src={go}
              alt="go"
              className="goIcon"
              onClick={() => props.setIsShowInstruction(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
