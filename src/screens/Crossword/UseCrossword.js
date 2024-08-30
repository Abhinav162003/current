// useCrossword.js

import { useState } from "react";

const useCrossword = (selectedCrossword) => {
  const { grid, correctAnswers } = selectedCrossword;

  // Initialize input state
  const [inputs, setInputs] = useState(grid.map((row) => row.map(() => "")));

  const handleChange = (row, col, value) => {
    const newInputs = [...inputs];
    newInputs[row][col] = value.toUpperCase();
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    let isCorrect = true;

    // Validate all inputs against the correct answers
    for (let row = 0; row < correctAnswers.length; row++) {
      for (let col = 0; col < correctAnswers[row].length; col++) {
        if (
          correctAnswers[row][col] &&
          correctAnswers[row][col] !== inputs[row][col]
        ) {
          isCorrect = false;
        }
      }
    }

    // Return result
    return isCorrect;
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
  };
};

export default useCrossword;
