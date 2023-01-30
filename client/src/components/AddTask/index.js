import './index.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const AddTask = ({reload}) => {
  const [taskName, setTaskName] = useState("")
  
  function addTask(taskName) {
    if (taskName) {
      axios.post("http://localhost:8080/api/task/addTask", {text: taskName})
      .then((result) => {
        setTaskName("");
        reload();
      })
      .catch((error) => {
        console.error("error:", error);
      })
    } else {
      alert("Minimum 1 character");
    }
  }

  function handleSubmit(event) {
    addTask(taskName);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" value={taskName} onChange={(event) => {setTaskName(event.target.value)}} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddTask;