import React, { useState } from 'react';
import './TaskAdd.css';
import { useNavigate } from 'react-router-dom';

function TaskAdd() {
  const [title, setTitle] = useState('');
  const [statuss, setStatuss] = useState('');
  const [assignedMember, setAssignedMember] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isAssigned, setIsAssigned] = useState('');
  const [hour, setHour] = useState('');
  const [priority, setPriority] = useState('');
  const[tasks , setTasks] = useState([]);

   const navigate = useNavigate()

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !statuss || !assignedMember || !dueDate || !isAssigned || !hour || !priority) {
      alert('All data is mandatory');
      return;
    }
  
    // Fetch the current tasks to find the max serial number and task is
    const response = await fetch('http://localhost:8000/employee');
    const currentTasks = await response.json();

    const maxSerialNo = currentTasks.length > 0 ? Math.max(...currentTasks.map((task) => task.serialNo || 0)) : 0;
    const serialNo = maxSerialNo + 1;

    const AutoId = currentTasks.length > 0 ? Math.max(...currentTasks.map((id) => id.taskId || 20 )) : 0 ;
    const taskId = AutoId + 1;
  
    const createdate = (() => {
      const date = new Date();
      const year = date.getFullYear(); // 
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    })();

    const taskdata = { title, statuss, assignedMember, dueDate, isAssigned, hour, priority, createdate, serialNo , taskId};
  
    // Post new task with incremented serial number

    fetch('http://localhost:8000/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskdata),
    })
      .then(() => {
        setTasks([...tasks, taskdata]);
        setTitle('');
        setStatuss('');
        setAssignedMember('');
        setDueDate('');
        setIsAssigned('');
        setHour('');
        setPriority('');
        navigate('/');
      })
      .catch((err) => console.log(err.message));
  };
  

  const Status = ['Uninitiated', 'In Progress', 'Completed'];
  const Members = ['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'];
  const Assigned = ['True', 'False'];
  const Priority = ['Low', 'Medium', 'High'];

  return (
    <>
      <h1 id='create_task'>Create Task</h1>
    <div className='create-form'>
      <form onSubmit={handleSubmit}>
        <div className='Task_title'>
          <div className='title_alinment'>
            <label htmlFor="serial_name" id='title'>Task Title : </label>
            <input
              type="text"
              id="serial_name"
              value={title}
              className='input_title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br />
          <div className='status_member'>
            <div>
              <label htmlFor="status">Status : </label>
              <select name="status" className="status" value={statuss} onChange={(e) => setStatuss(e.target.value)}>
                <option value="Status">Status</option>
                {Status.map((status, i) => (
                  <option value={status} key={i} className='status_select'>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Assigned Members : </label>
              <select className="status" value={assignedMember} onChange={(e) => setAssignedMember(e.target.value)}>
              <option value="member">Assigned Member</option>
                {Members.map((m, i) => (
                  <option value={m} key={i} className='status_select'>{m}</option>
                ))}
              </select>
            </div>
          </div> 
          <br />
          <div className='due_date'>
            <div>
              <label>Due Date : </label>
              <input type="date" className='status' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label>Is Assigned : </label>
              <select className="status" value={isAssigned} onChange={(e) => setIsAssigned(e.target.value)}>
              <option value="Status">Is Assigned</option>
                {Assigned.map((a, i) => (
                  <option value={a} key={i}>{a}</option>
                ))}
              </select>
            </div>
          </div> 
          <br />
          <div className='hour_priority'>
            <div>
              <label>Hour : </label>
              <input type="time" className='status' value={hour} onChange={(e) => setHour(e.target.value)} />
            </div>
            <div>
              <label>Priority : </label>
              <select className='status' value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Status">Priority</option>
                {Priority.map((p, i) => (
                  <option value={p} key={i}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='submit_btn'>
            <input type="submit" value="Save" id='submit' />
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default TaskAdd;





