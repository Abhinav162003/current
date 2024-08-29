// import React, { useState } from "react";
// import { ScrollView, StyleSheet, Dimensions } from "react-native";
// import HintSection from "./HintSection";
// import Grid from "./Grid";

// const { width } = Dimensions.get("window");
// const cellSize = width / 8;

// const Crossword = ({ route }) => {
//   const defaultGrid = [
//     ["A", "", "", "", ""],
//     ["", "B", "", "", ""],
//     ["", "", "C", "", ""],
//     ["", "", "", "D", ""],
//     ["", "", "", "", "E"],
//   ];

//   const defaultHints = [
//     "1. First letter of the alphabet (across)",
//     "2. Second letter of the alphabet (down)",
//     "3. Third letter of the alphabet (diagonal)",
//     "4. Fourth letter of the alphabet (down)",
//     "5. Fifth letter of the alphabet (diagonal)",
//   ];

//   const { grid = defaultGrid, hints = defaultHints } = route.params || {};

//   const [inputs, setInputs] = useState(grid.map((row) => row.map(() => "")));

//   const handleChange = (row, col, value) => {
//     const newInputs = [...inputs];
//     newInputs[row][col] = value.toUpperCase();
//     setInputs(newInputs);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <HintSection hints={hints} />
//       <Grid grid={grid} inputs={inputs} onChange={handleChange} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#f0f0f0",
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default Crossword;

import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  View,
} from "react-native";
import HintSection from "./HintSection";
import Grid from "./Grid";

const { width } = Dimensions.get("window");
const cellSize = (width - 40) / 7; // Adjusted for padding (40 is the total horizontal padding)

const Crossword = ({ route }) => {
  // Updated grid with hidden words
  const defaultGrid = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  // Correct answers for validation
  const correctAnswers = [
    ["A", "P", "P", "L", "E", "", ""],
    ["", "", "", "", "I", "", ""],
    ["B", "A", "N", "A", "N", "A", ""],
    ["", "", "", "", "O", "", ""],
    ["O", "R", "A", "N", "G", "E"],
    ["", "", "", "", "E", "", ""],
    ["G", "R", "A", "P", "E", "", ""],
  ];

  const defaultHints = {
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
  };

  const { grid = defaultGrid, hints = defaultHints } = route.params || {};

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

    // Show feedback to the user
    if (isCorrect) {
      Alert.alert("Success!", "All answers are correct!");
    } else {
      Alert.alert("Try Again", "Some answers are incorrect.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HintSection hints={hints} />
      <View style={styles.gridContainer}>
        <Grid
          grid={grid}
          inputs={inputs}
          onChange={handleChange}
          correctAnswers={correctAnswers}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    padding: 20, // Add padding around the grid to prevent touching screen borders
  },
});

export default Crossword;
