import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    } else {
      Alert.alert('Oops!', 'Please enter a task before adding.');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 My Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add something cool..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="➕ Add" onPress={addTask} />

      <FlatList
        data={tasks}
        ListEmptyComponent={<Text style={styles.empty}>Nothing to do yet. Add something!</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleComplete(item.id)}>
            <View style={styles.taskContainer}>
              <Text style={[styles.taskText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingHorizontal: 20,
    backgroundColor: '#e8f0fe'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    fontSize: 18,
    color: '#ff4d4d',
    marginLeft: 10
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#777'
  }
});
