import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constants from 'expo-constants';
import { Flatform, SafeAreaView, StyleSheet } from 'react-native';
import TodoList from './screens/TodoList';
import ZipCodeFinder from './screens/ZipCodeFinder';

    //  window.fetch() 페치는 윈도우에섬만 존재하기때문에 조치필요!!
    //  node fetch 사용

export default function App() {
  return (
    <SafeAreaView style={ styles.container }>
      <TodoList/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop : Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flex: 1
  },
});
