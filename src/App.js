import './App.css';
import ListItem from './components/listitem';
import AddItem from './components/additem'
import { useState } from 'react';
import Counting from './components/counting';
import Title from './components/title';
// import { init, storage } from '@ionic/react-forge';



function App() {
  const [tasks, setTasks] = useState([])
  const [no_cpmplete, setNo_comleted] = useState(1)
  const [trigger,setTrigger] = useState(10)
  // const [callingeffect,setcallingeffect] =useState(no_cpmplete+1)
  
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('myData'));
  //   const noComplete = parseInt(localStorage.getItem('no_complete'));   
  //    if (storedData) {
  //     setTasks(storedData);
    

  //   }
  //    if (noComplete) {
  //     setNo_comleted(noComplete);
  
      
  //   }
  // }, [])

  function loadData(){
    const storedData = JSON.parse(localStorage.getItem('myData'));
    const noComplete = parseInt(localStorage.getItem('no_complete'));   
     if (storedData) {
      setTasks(storedData);
    

    }
     if (noComplete) {
      setNo_comleted(noComplete);
  
      
    }
  }

  function click(){
    setTrigger(trigger+1)
  }

  setInterval(loadData,500)


  function Add_item(task) {
    const updatedTasks = [...tasks, { ...task, id: tasks.length, done: false }]
    setTasks(updatedTasks)
    localStorage.setItem('myData', JSON.stringify(updatedTasks));
  }


  function delteItem(id) {
    console.log(id)
    if (tasks[id].done) {
      tasks[id].done = false
      const updatedno = no_cpmplete - 1
      localStorage.setItem('no_complete', updatedno);

    }
    const updatedTasks = tasks.filter(item => item.id !== id);
    localStorage.setItem('myData', JSON.stringify(updatedTasks));
    console.log(tasks)
    update_id(id);

  }
  function update_id(id) {
    const newtasks = (tasks.filter(item => item.id !== id))
    if (newtasks) {
      for (let i = 0; i < newtasks.length; i++) {
        newtasks[i].id = i;

        const currentTime = new Date();
      const hoursToAdd = i; // Adjust this based on your requirements
      currentTime.setHours(currentTime.getHours() + hoursToAdd);

      // Format the updated time back to datetime-local format
      const year = currentTime.getFullYear();
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      const updatedTime = `${year}-${month}-${day}T${hours}:${minutes}`;

      newtasks[i].completionTime = updatedTime;
      }
      // console.log(newtasks) 
      setTasks(newtasks)
      const updatedTasks = newtasks
      localStorage.setItem('myData', JSON.stringify(updatedTasks));

    }

  }

  function up_item(id) {
    const newtasks = [...tasks]
    let item1 = newtasks[id];
    let item2 = newtasks[id - 1];
    let id1 = item1.id
    let id2 = item2.id
    item2.id = id1
    item1.id = id2
    newtasks[id - 1] = item1
    newtasks[id] = item2
    setTasks(newtasks)
    const updatedTasks = newtasks
      localStorage.setItem('myData', JSON.stringify(updatedTasks));
    // console.log(newtasks)
    click()


  }
  function down_item(id) {
    const newtasks = [...tasks]
    let item1 = newtasks[id];
    let item2 = newtasks[id + 1];
    let id1 = item1.id
    let id2 = item2.id
    item2.id = id1
    item1.id = id2
    newtasks[id + 1] = item1
    newtasks[id] = item2
    setTasks(newtasks)
    const updatedTasks = newtasks
      localStorage.setItem('myData', JSON.stringify(updatedTasks));
    // console.log(newtasks)
    click()

  }
  function isLast(id) {
    let last = false
    let last_id = tasks.length
    if (id === last_id - 1) {
      last = true
    }
    return last;


  }
  // const [comleted,setCompleted] = useState(false) 


  function completed(id) {
    console.log(id)
    if (tasks[id].done) {
      tasks[id].done = false
      const updatedTasks = tasks
      localStorage.setItem('myData', JSON.stringify(updatedTasks));
      const updatedno = no_cpmplete - 1
      localStorage.setItem('no_complete', updatedno);
    }
    else {
      tasks[id].done = true
      const updatedTasks = tasks
      localStorage.setItem('myData', JSON.stringify(updatedTasks));
      const updatedno = no_cpmplete + 1
      localStorage.setItem('no_complete', updatedno);
    }
  }
  return (
    <>
      <div className='App'>
        <div className='header'>
          <Title></Title>
          <AddItem Add_item={Add_item}></AddItem>
        </div>
        <div className="content">
          <Counting length={tasks.length} completed_task={no_cpmplete-1} ></Counting>

          {tasks.map(item => (
            <ListItem
              key={item.id}
              name={item.name}
              id={item.id}
              delteItem={delteItem}
              up_item={up_item}
              down_item={down_item}
              completed={completed}
              last={isLast}
              done={item.done}
              completionTime ={item.completionTime}
              trigger={trigger}
            >
            </ListItem>))}
        </div>
      </div>
    </>
  )
}

export default App;
