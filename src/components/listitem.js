import './listitem.css'
import './checkbox.css'
import { useEffect, useState } from 'react';

function ListItem({ name, id, delteItem, up_item, down_item, last, completed, done, completionTime }) {
  const [color, setColor] = useState('rgb(0, 128, 0)'); // Default color (green)

  useEffect(() => {
    let countdownInterval;

    const updateColor = () => {
      const now = new Date();
      const completionDate = new Date(completionTime);
      const remainingTime = completionDate.getTime() - now.getTime();

      let newColor = 'rgb(0, 128, 0)'; // Default color (green)

      if (remainingTime < 0) {
        newColor = 'rgb(255, 0, 0)'; // Time passed and not completed (red)
      } else if (remainingTime < 12 * 3600 * 1000) {
        newColor = 'rgb(255, 69, 0)'; // Less than 12 hours remaining (orangered)
      } else if (remainingTime < 24 * 3600 * 1000) {
        newColor = 'rgb(255, 99, 71)'; // Less than 24 hours remaining (lightcoral)
      } else if (remainingTime < 36 * 3600 * 1000) {
        newColor = 'rgb(255, 165, 0)'; // Less than 36 hours remaining (orange)
      }

      setColor(newColor); // Update the color state
    };

    updateColor(); // Initial call to set the color
    countdownInterval = setInterval(updateColor, 5000); // Update every hour

    return () => {
      clearInterval(countdownInterval); // Clear the interval on unmount
    };
  }, [completionTime]);

  function onChange() {
    console.log('sab shi h bhai chinta mt kr')
    console.log(completionTime)
  }
  // console.log(color)
  return (
    <>
      <div className="items">
        <div className="checkbox-wrapper-11">
          <input id={id} type="checkbox" checked={done ? true : false}
            onClick={() => completed(id)} onChange={onChange} />
          <label htmlFor="02-11">To-do</label>
        </div>
        <div className={`item ${done ? ' completed' : ''}`} style={done ? { backgroundColor: `rgb(10, 16, 77)` } : { backgroundColor: color }} onClick={() => completed(id)} >

          <div className="item-text">
            {name}
          </div>
          <div className="timestamp">
            {completionTime}
          </div>
        </div>
        {id ? <button className="up" onClick={() => up_item(id)} > Up</button> : <button className="up" onClick={() => up_item(id)} style={{ cursor: 'not-allowed' }} disabled > Up</button>}
        {last(id) ? <button className="up" onClick={() => down_item(id)} style={{ cursor: 'not-allowed' }} disabled > Down</button> : <button className="up" onClick={() => down_item(id)} > Down</button>}
        <button className="delete" onClick={() => delteItem(id)}>delete</button>
      </div>
    </>
  )

}

export default ListItem;