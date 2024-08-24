import React, { useState } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import HintSection from "./HintSection";
import Grid from "./Grid";

const { width } = Dimensions.get("window");
const cellSize = width / 8;

const Crossword = ({ route }) => {
  const defaultGrid = [
    ["A", "", "", "", ""],
    ["", "B", "", "", ""],
    ["", "", "C", "", ""],
    ["", "", "", "D", ""],
    ["", "", "", "", "E"],
  ];

  const defaultHints = [
    "1. First letter of the alphabet (across)",
    "2. Second letter of the alphabet (down)",
    "3. Third letter of the alphabet (diagonal)",
    "4. Fourth letter of the alphabet (down)",
    "5. Fifth letter of the alphabet (diagonal)",
  ];

  const { grid = defaultGrid, hints = defaultHints } = route.params || {};

  const [inputs, setInputs] = useState(grid.map((row) => row.map(() => "")));

  const handleChange = (row, col, value) => {
    const newInputs = [...inputs];
    newInputs[row][col] = value.toUpperCase();
    setInputs(newInputs);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HintSection hints={hints} />
      <Grid grid={grid} inputs={inputs} onChange={handleChange} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Crossword;
