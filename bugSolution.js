// bugSolution.js
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_KEY = 'myTask';

TaskManager.defineTask(TASK_KEY, async ({ data, error }) => {
  if (error) {
    console.error('Background task error:', error);
    return;
  }

  try {
    const value = await AsyncStorage.getItem('@my_key');
    const newValue = value ? parseInt(value) + 1 : 1;
    await AsyncStorage.setItem('@my_key', newValue.toString());
    console.log('AsyncStorage updated successfully in the background:', newValue);
  } catch (e) {
    console.error('AsyncStorage error in background task:', e);
  }
});

// ... rest of your Expo app code ...

// Ensure the task is scheduled appropriately in your app's lifecycle, perhaps during app startup
TaskManager.isTaskRegisteredAsync(TASK_KEY).then(registered => {
  if(!registered){
    TaskManager.startTaskAsync(TASK_KEY);
  }
});