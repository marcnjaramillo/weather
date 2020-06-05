import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchInput = ({ placeholder, onSubmit }) => {

  const [input, setInput] = useState('');

  const handleChangeText = text => {
    setInput(text);
  }

  const handleSubmitEditing = () => {

    if (!input) return;

    onSubmit(input);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={input}
        placeholder={placeholder}
        placeholderTextColor='white'
        underlineColorAndroid='transparent'
        style={styles.textInput}
        clearButtonMode='always'
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white'
  },
});

export default SearchInput;