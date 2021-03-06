import React, {useState} from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitems';
import AddTodo from './components/addTodo';
export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1'},
    { text: 'create an app', key: '2'},
    { text: 'play on the switch', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {

    if(text.length > 3){
      setTodos((prevTodos) => {
        return [ 
          {text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })
    }else{
      Alert.alert('Ooops!','Todos must be over 3 chars long', [
        {text: 'understood', onPress: () => console.log('alert closed')}
      ])
    }
    
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo  submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    margin: 20,
  },
  list: {
    margin: 20,
    padding:20,
  }

  
  
})