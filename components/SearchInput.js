import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// class SearchInput extends Component {

//   state = {
//     text: ''
//   }

//   handleChangeText = text => {
//     this.setState({ text });
//   }

//   handleSubmitEditing = () => {
//     const { onSubmit } = this.props;
//     const { text } = this.state;

//     if (!text) return;

//     onSubmit(text);
//     this.setState({ text: '' });
//   };


//   render() {
//     const { placeholder } = this.props;
//     const { text } = this.state;
//     return (
//       <View style={styles.container}>
//         <TextInput
//           autoCorrect={false}
//           value={text}
//           placeholder={placeholder}
//           placeholderTextColor='white'
//           underlineColorAndroid='transparent'
//           style={styles.textInput}
//           clearButtonMode='always'
//           onChangeText={this.handleChangeText}
//           onSubmitEditing={this.handleSubmitEditing}
//         />
//       </View>
//     )
//   }
// };

const SearchInput = ({ placeholder, onSubmit }) => {

  const [input, setInput] = useState('');

  const handleChangeText = text => {
    setInput(text);
  }

  const handleSubmitEditing = () => {

    // const { text } = input;

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