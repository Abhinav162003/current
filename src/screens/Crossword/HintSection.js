// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const HintSection = ({ hints }) => {
//   return (
//     <View style={styles.hintContainer}>
//       <Text style={styles.hintTitle}>Crossword Hints:</Text>
//       {hints.map((hint, index) => (
//         <Text key={index} style={styles.hintText}>
//           {hint}
//         </Text>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   hintContainer: {
//     marginBottom: 20,
//   },
//   hintTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   hintText: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: "#555",
//   },
// });

// export default HintSection;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HintSection = ({ hints }) => {
  return (
    <View style={styles.hintContainer}>
      <Text style={styles.hintTitle}>Crossword Hints:</Text>
      <Text style={styles.hintSubTitle}>Across:</Text>
      {hints.across.map((hint, index) => (
        <Text key={`across-${index}`} style={styles.hintText}>
          {hint}
        </Text>
      ))}
      <Text style={styles.hintSubTitle}>Down:</Text>
      {hints.down.map((hint, index) => (
        <Text key={`down-${index}`} style={styles.hintText}>
          {hint}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    marginBottom: 20,
  },
  hintTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  hintSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  hintText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
});

export default HintSection;
