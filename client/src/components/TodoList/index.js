import './index.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Item = ({id, text, status, reload}) => {
  console.log(id, text, status);
  
  function updateStatus(event) {
    axios.put("http://localhost:8080/api/task/updateTask/"+id)
    .then((result) => {
      reload();
    })
    .catch((error) => {
      console.error("error:", error);
    })
    event.preventDefault();
  }

  function deleteTask(event) {
    axios.delete("http://localhost:8080/api/task/deleteTask/"+id)
    .then((result) => {
      reload();
    })
    .catch((error) => {
      console.error("error:", error);
    })
    event.preventDefault();
  }

  return (
    <div className='item_container'>
      <input
          type="checkbox"
          onChange={updateStatus}
          checked={status}
          style={{marginRight: "10px"}}
        />
      <p style={{fontSize: 16}}>{text}</p>
      <form onSubmit={deleteTask}>
        <input type="submit" value="Delete" />
      </form>
    </div>
  );
}

const TodoList = ({list, reload}) => {
  
  return (
    <div className='todoList_container'>
      {list && list.map((item, index) => {
        return (
          <Item key={index} id={item._id} text={item.text} status={item.status} reload={reload}/>
        )
      })}
    </div>
  );
}

export default TodoList;