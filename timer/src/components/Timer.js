
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Timer.css';

function Timer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timerOn, setTimerOn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [savedTimers, setSavedTimers] = useState([]); 

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let updatedTime = { ...prevTime };
          if (updatedTime.seconds > 0) updatedTime.seconds--;
          else if (updatedTime.minutes > 0) {
            updatedTime.minutes--;
            updatedTime.seconds = 59;
          } else if (updatedTime.hours > 0) {
            updatedTime.hours--;
            updatedTime.minutes = 59;
            updatedTime.seconds = 59;
          }
          return updatedTime;
        });

        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          clearInterval(interval);
          setTimerOn(false);
          setModalIsOpen(true); 
        }
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, time]);

  function closeModal() {
    setModalIsOpen(false);
  }

  function saveTimer() {
    const newTimer = { hours: time.hours, minutes: time.minutes, seconds: time.seconds };
    setSavedTimers([...savedTimers, newTimer]);
  }
  function loadTimer(savedTimer) {
    setTime({ ...savedTimer });
  }

  return (
    <div className='timer-container'>
    <h1 className='heading'>Countdown Timer</h1>
     <br/>
   <div className='timer-inputs'>
    
     <input
     type="number"
     value={time.hours}
     onChange={(e) => setTime({ ...time, hours: e.target.value })}
   />
   <p style={{color:"violet" ,fontSize:"28px"}} >Hours</p>
   <input
     type="number"
     value={time.minutes}
     onChange={(e) => setTime({ ...time, minutes: e.target.value })}
   />
   <p style={{color:"violet" ,fontSize:"28px"}}>Minutes</p>
   <input
     type="number"
     value={time.seconds}
     onChange={(e) => setTime({ ...time, seconds: e.target.value })}
   />
   <p style={{color:"violet",fontSize:"28px"}}>Seconds</p>
   </div>
   <p className='end'> The Time Remaining - {`${time.hours}: ${time.minutes}: ${time.seconds}`}</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Time is up!"
      >
        <h2 className='endpage'>Time is up!</h2>
        <button  className='close' onClick={closeModal}>Close</button>
      </Modal>
      <div className='timer-buttons'>
        <button onClick={() => setTimerOn(true)}>Start</button>
        <button onClick={() => setTimerOn(false)}>Pause</button>
        <button onClick={() => setTime({ hours: 0, minutes: 0, seconds: 0 })}>Reset</button>
        <button onClick={saveTimer}>Save Timer</button> 
      </div>
      <div className='saved-timers'>
        <h2>Saved Timers</h2>
        <ul>
          {savedTimers.map((savedTimer, index) => (
            <li key={index}>
              {`${savedTimer.hours}:${savedTimer.minutes}:${savedTimer.seconds}`}{' '}
              <button onClick={() => loadTimer(savedTimer)}>Load</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Timer;



