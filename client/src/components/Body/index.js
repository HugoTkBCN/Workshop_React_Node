import './index.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AddTask from '../AddTask';
import TodoList from '../TodoList';

const Body = () => {
  const [todoList, setTodoList] = useState(null);

  function loadTodoList() {
    axios.get("http://localhost:8080/api/task/getTasks")
    .then((result) => {
      if (result.data.tasks) {
        setTodoList(result.data.tasks);
      }
    })
    .catch((error) => {
      console.error("error:", error);
    })
  }

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <div className="todo_list_container">
      <AddTask reload={loadTodoList} />
      <TodoList list={todoList} reload={loadTodoList} />
    </div>
  );
}

export default Body;