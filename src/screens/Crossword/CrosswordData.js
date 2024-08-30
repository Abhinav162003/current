// CrosswordData.js

const crosswords = [
  {
    id: 1,
    grid: [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ],
    correctAnswers: [
      ["A", "P", "P", "L", "E", "", ""],
      ["", "", "", "", "I", "", ""],
      ["B", "A", "N", "A", "N", "A", ""],
      ["", "", "", "", "O", "", ""],
      ["O", "R", "A", "N", "G", "E"],
      ["", "", "", "", "E", "", ""],
      ["G", "R", "A", "P", "E", "", ""],
    ],
    hints: {
      across: [
        "1. A popular fruit (5 letters)",
        "3. A yellow fruit (6 letters)",
        "5. A citrus fruit (6 letters)",
        "7. A small, purple or green fruit (5 letters)",
      ],
      down: [
        "1. A red or green fruit (5 letters)",
        "2. A type of tropical fruit (6 letters)",
        "4. Often found in fruit salads (5 letters)",
        "6. A small, sweet fruit (3 letters)",
      ],
    },
  },
  {
    id: 2,
    grid: [
      ["", "", "", "", "", "", ""],
      ["", "A", "", "", "", "", ""],
      ["", "", "B", "", "", "", ""],
      ["", "", "", "C", "", "", ""],
      ["", "", "", "", "D", "", ""],
      ["", "", "", "", "", "E", ""],
      ["", "", "", "", "", "", "F"],
    ],
    correctAnswers: [
      ["", "", "", "", "", "", ""],
      ["", "A", "", "", "", "", ""],
      ["", "", "B", "", "", "", ""],
      ["", "", "", "C", "", "", ""],
      ["", "", "", "", "D", "", ""],
      ["", "", "", "", "", "E", ""],
      ["", "", "", "", "", "", "F"],
    ],
    hints: {
      across: [
        "1. First letter (1 letter)",
        "3. Second letter (1 letter)",
        "5. Third letter (1 letter)",
        "7. Fourth letter (1 letter)",
      ],
      down: [
        "1. Fifth letter (1 letter)",
        "2. Sixth letter (1 letter)",
        "4. Seventh letter (1 letter)",
        "6. Eighth letter (1 letter)",
      ],
    },
  },
  // Add more crosswords here
];

export default crosswords;
