import { useState } from 'react';
import './additem.css'

const initialState ={
  name:'',
  completionTime : '',
}
function AddItem({Add_item}){
  const [task,setTask] = useState(initialState)
  function handleSubmit(e){
      e.preventDefault();
      Add_item(task);
      setTask(initialState)
  }

  function handleChange(e){
      setTask({...task,[e.target.name]: e.target.value})
  }
  function handleChangeTime(e){
    setTask({...task,[e.target.name]: e.target.value})
  }
    return(
        <>
          <div className="form">
            <form>
                <input type="text" name="name" placeholder="Enter your task" onChange={handleChange} value={task.name} ></input>
                <span className="label">  Add Due Date</span>
                <input type='datetime-local' className='date' name='completionTime' onChange={handleChangeTime} value ={task.completionTime} required></input>
                <button type="submit" onClick={handleSubmit}>Add Task</button>
            </form>
          </div>
        </>
    )
}

export default AddItem;