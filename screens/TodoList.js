import React, { useCallback, useEffect, useState } from 'react';
import {  Button, FlatList, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';

import TodoItem from '../components/TodoItem';
import Row from '../components/Row';
import Padding from '../components/Padding';


/*
    //  json
    const parmas = {
      confmKey: 'devU01TX0FVVEgyMDlxMDkxMjlzMzMzMjExMTY1NTY',
      currentPage: 1,
      countPerPage: 100,
    }

    const urlencoded = qs ( params ).toString();

    'https://host.com/pathname?' + urlencoded

    // url encoded ( string )
    confmKey=devU01TX0FVVEgyMDlxMDkxMjlzMzMzMjExMTY1NTY=&currentPage

*/


function updateStorage( data ) {
  return AsyncStorage.setItem( 'todo-list', JSON.stringify( data ));
}

function TodoList() {
  const [ list, setList ] = useState( [] );
  //{ id: '...', content: '...', isDone: true }
const [ inputText, setInputText ] = useState( '' );

const update = useCallback( data => {
  setList( data );
  updateStorage( data );
}, [ list ] );

const addItem = useCallback( () => {
  const item = {
    key: new Date().toString(),
    content: inputText,
    isDone: false,
  }
  const newData = [ ...list, item ];
  update( newData );
  setInputText( '' );
}, [ list, inputText ] );  

const removeItem = useCallback(( key ) => {
  const newData = list.filter( item => item.key !== key );
  update( newData );
}, [ list ] );

const updateItem = useCallback( ( key, value ) => {
    //list[ 0 ].isDone =
    //불변성 immutable
    //원본을 변경하지 않는다
    //반드시 변경된 사본을 통해 비교한다
    //array.push();  // 원본변경
    //array.filter(); // 사본생성
  const newData = produce( list, draft => {
    const index = list.findIndex( item => item.key === key );
    draft[ index ].isDone = value;
  } );
  update( newData );
}, [ list ] );

useEffect( ()=>{
  AsyncStorage.getItem( 'todo-list' ).then( rawData => {
    if( rawData ) {
      setList( JSON.parse( rawData ) );
    }
    else {
      update( [] );
    }
  })
}, [] )

  return (
    <Padding padding={ 12 } style={{ flex: 1 }}>

        {/* 출력 */}
      <FlatList
        data={ list }
        renderItem={ item => (
          <TodoItem 
            id={ item.item.key }
            label={ item.item.content } 
            isDone={ item.item.isDone }
            onSwitchChange={ updateItem }
            onDelete={removeItem } 
          />
        ) }
      style={{ flex: 1 }}
      />
        {/* 입력 */}

      <Row>
      <TextInput 
          style={ styles.input }
          value={ inputText }  
          onChangeText={ text => setInputText( text ) }
        />
      <Button title="전송" onPress={ addItem }/>
      </Row>
    </Padding>  
  )
}

export default TodoList;

const styles = StyleSheet.create({
    input: {
      flex: 1,
      borderWidth: 1,
    }
});
