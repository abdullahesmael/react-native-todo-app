import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, FlatList , Alert} from 'react-native';
import Header from './components/header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn React Native', key: '1' },
    { text: 'Build an app', key: '2' },
    { text: 'Deploy to the cloud', key: '3' },
  ]);

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos,
        ]
      })
    } else {
      Alert.alert('Invalid TODO', 'Todo must be at least 3 characters long',  [
        { text: 'Understood' }
      ]);
    }
}

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <AddTodo
            submitHandler={submitHandler}
          />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding:40,
  },
  list: {
    marginTop:20,
  },
});
