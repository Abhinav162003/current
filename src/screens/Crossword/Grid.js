// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Cell from "./Cell";

// const Grid = ({ grid, inputs, onChange }) => {
//   return (
//     <View style={styles.gridContainer}>
//       {grid.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.row}>
//           {row.map((cell, colIndex) => (
//             <Cell
//               key={colIndex}
//               cell={cell}
//               value={inputs[rowIndex][colIndex]}
//               onChange={(text) => onChange(rowIndex, colIndex, text)}
//             />
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   gridContainer: {
//     flexDirection: "column",
//   },
//   row: {
//     flexDirection: "row",
//   },
// });

// export default Grid;

// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Cell from "./Cell";

// const Grid = ({ grid, inputs, onChange, correctAnswers }) => {
//   return (
//     <View style={styles.grid}>
//       {grid.map((row, rowIndex) => (
//         <View style={styles.row} key={rowIndex}>
//           {row.map((cell, colIndex) => (
//             <Cell
//               key={`${rowIndex}-${colIndex}`}
//               cell={cell}
//               value={inputs[rowIndex][colIndex]}
//               onChange={(value) => onChange(rowIndex, colIndex, value)}
//               editable={!!correctAnswers[rowIndex][colIndex]} // Editable only if there's an answer
//             />
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   grid: {
//     flexDirection: "column",
//   },
//   row: {
//     flexDirection: "row",
//   },
// });

// export default Grid;

import React from "react";
import { View, StyleSheet } from "react-native";
import Cell from "./Cell";

const Grid = ({ grid, inputs, onChange, correctAnswers }) => {
  return (
    <View style={styles.grid}>
      {grid.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              value={inputs[rowIndex][colIndex]}
              onChange={(value) => onChange(rowIndex, colIndex, value)}
              editable={!!correctAnswers[rowIndex][colIndex]}
              correctAnswer={correctAnswers[rowIndex][colIndex]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});

export default Grid;