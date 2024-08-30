// import React from "react";
// import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");
// const cellSize = width / 8;

// const Cell = ({ cell, value, onChange }) => {
//   return (
//     <View style={styles.cell}>
//       {cell ? (
//         <Text style={styles.cellText}>{cell}</Text>
//       ) : (
//         <TextInput
//           style={styles.input}
//           maxLength={1}
//           onChangeText={onChange}
//           value={value}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cell: {
//     width: cellSize,
//     height: cellSize,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#4a4a4a",
//     backgroundColor: "#ffffff",
//     margin: 2,
//   },
//   input: {
//     width: cellSize - 10,
//     height: cellSize - 10,
//     textAlign: "center",
//     fontSize: 24,
//     color: "#333",
//     backgroundColor: "#e6e6e6",
//     borderRadius: 4,
//   },
//   cellText: {
//     fontSize: 24,
//     textAlign: "center",
//     color: "#4a4a4a",
//     fontWeight: "bold",
//   },
// });

// export default Cell;

import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cellSize = (width - 40) / 7; // Adjusted to account for the total padding

const Cell = ({ cell, value, onChange, editable }) => {
  return (
    <View style={styles.cell}>
      {editable ? ( // Editable if the cell should be editable
        <TextInput
          style={styles.input}
          maxLength={1}
          onChangeText={onChange}
          value={value}
        />
      ) : (
        <View style={styles.nonEditableCell} /> // Non-editable cells are just a view
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4a4a4a",
    backgroundColor: "#ffffff",
    margin: 2,
  },
  input: {
    width: cellSize - 10,
    height: cellSize - 10,
    textAlign: "center",
    fontSize: 24,
    color: "#333",
    backgroundColor: "#e6e6e6",
    borderRadius: 4,
  },
  nonEditableCell: {
    width: cellSize - 10,
    height: cellSize - 10,
    backgroundColor: "#4a4a4a",
  },
});

export default Cell;
