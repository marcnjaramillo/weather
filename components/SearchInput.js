import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

const SearchInput = ({ placeholder, onSubmit }) => {

  const [input, setInput] = useState('');

  const handleChangeText = text => {
    setInput(text);
  };

  const handleSubmitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={input}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );

}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});

export default SearchInput;