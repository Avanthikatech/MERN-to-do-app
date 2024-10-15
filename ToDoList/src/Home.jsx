import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import './App.css';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = async (id) => {
      const result = await axios.put(`http://localhost:3001/update/${id}`)
      .then(result =>  {location.reload()})
      .catch(err => console.log(err))

  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      console.log('Todo deleted successfully');
    } catch (err) {
      console.log(err);
      alert('Failed to delete the task. Please try again.');
    }
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create />

      {todos.length === 0 ? 
        <div><h2>No Record</h2></div>
       : 
        todos.map(todo => (
          <div className='task' key={todo._id}> 
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done ?
              <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>      
              :<BsCircleFill className='icon' />
               }
              <p className={todo.done? "line_through":""}>{todo.task}</p>
            </div>
            <div>
            <span onClick={() => handleDelete(todo._id)}>
                <BsFillTrashFill className='icon' />
                </span>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
