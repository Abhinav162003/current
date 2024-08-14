import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const Crossword = ({ grid }) => {
  const [inputs, setInputs] = useState(grid.map(row => row.map(() => '') ));

  const handleChange = (row, col, value) => {
    const newInputs = [...inputs];
    newInputs[row][col] = value.toUpperCase();
    setInputs(newInputs);
  };

  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View key={colIndex} style={styles.cell}>
              {cell ? (
                <Text style={styles.cellText}>{cell}</Text>
              ) : (
                <TextInput
                  style={styles.input}
                  maxLength={1}
                  onChangeText={(text) => handleChange(rowIndex, colIndex, text)}
                  value={inputs[rowIndex][colIndex]}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const { width } = Dimensions.get('window');
const cellSize = width / 10;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  input: {
    width: cellSize,
    height: cellSize,
    textAlign: 'center',
    fontSize: 20,
  },
  cellText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Crossword;
