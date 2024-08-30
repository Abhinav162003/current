// Crossword.js

// import React from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   Button,
//   Alert,
//   View,
// } from "react-native";
// import HintSection from "./HintSection";
// import Grid from "./Grid";
// import crosswords from "./CrosswordData";
// import useCrossword from "./UseCrossword";

// const { width } = Dimensions.get("window");
// const cellSize = (width - 40) / 7; // Adjusted for padding (40 is the total horizontal padding)

// const Crossword = ({ route }) => {
//   // Choose a crossword based on route params or set the default to the first crossword
//   const selectedCrossword = route.params?.crosswordId
//     ? crosswords.find((cw) => cw.id === route.params.crosswordId)
//     : crosswords[0];

//   const { hints } = selectedCrossword;
//   const { inputs, handleChange, handleSubmit } =
//     useCrossword(selectedCrossword);

//   const onSubmit = () => {
//     const isCorrect = handleSubmit();
//     if (isCorrect) {
//       Alert.alert("Success!", "All answers are correct!");
//     } else {
//       Alert.alert("Try Again", "Some answers are incorrect.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <HintSection hints={hints} />
//       <View style={styles.gridContainer}>
//         <Grid
//           grid={selectedCrossword.grid}
//           inputs={inputs}
//           onChange={handleChange}
//           correctAnswers={selectedCrossword.correctAnswers}
//         />
//       </View>
//       <Button title="Submit" onPress={onSubmit} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 20,
//     backgroundColor: "#f0f0f0",
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   gridContainer: {
//     padding: 20, // Add padding around the grid to prevent touching screen borders
//   },
// });

// export default Crossword;

// Crossword.js

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
import crosswords from "./CrosswordData";
import useCrossword from "./UseCrossword";

const { width } = Dimensions.get("window");
const cellSize = (width - 40) / 7; // Adjusted for padding (40 is the total horizontal padding)

const Crossword = ({ route, navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedCrossword = crosswords[currentIndex];
  const { hints } = selectedCrossword;
  const { inputs, handleChange, handleSubmit } =
    useCrossword(selectedCrossword);

  const onSubmit = () => {
    const isCorrect = handleSubmit();
    if (isCorrect) {
      Alert.alert("Success!", "All answers are correct!");
    } else {
      Alert.alert("Try Again", "Some answers are incorrect.");
    }
  };

  const handleNext = () => {
    if (currentIndex < crosswords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert(
        "End of Crosswords",
        "You have reached the end of the crosswords."
      );
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      Alert.alert(
        "Start of Crosswords",
        "You are at the beginning of the crosswords."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HintSection hints={hints} />
      <View style={styles.gridContainer}>
        <Grid
          grid={selectedCrossword.grid}
          inputs={inputs}
          onChange={handleChange}
          correctAnswers={selectedCrossword.correctAnswers}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Submit" onPress={onSubmit} />
        <Button title="Next" onPress={handleNext} />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default Crossword;
