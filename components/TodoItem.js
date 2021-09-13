import React, { useState } from "react";
import { Button, Switch, Text, } from "react-native";
import Row from "./Row";

      // const key = ( undefined | null ) ?? 'value';  => 앞에 있는 값이 
      //     undefined, null 인 경우 뒤의 value 값을 할당한다는 뜻!!!
      // const key = '' || 'value';  falsy == false, 0, undefined, 
      //     null, ''  => 비슷한 것들임!!!

function TodoItem( { id, label, isDone, onSwitchChange,  onDelete } ) {
  return (
    <Row style={{ alignItems: 'center', marginBottom: 12, }}>
        <Switch
          value={ isDone } 
          onValueChange={ value => onSwitchChange( id, value ) }
          style={{ marginRight: 8, }}
        />
        <Text style={{ color: isDone ? '#eee' : '#000', flex: 1 }}>{ label ?? '(내용없음)' }
        </Text>
        <Button title="삭제" onPress={ () => onDelete ( id )}/>
    </Row>
  )
}

export default TodoItem;