import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Edit.css';


function Edittask() {
    const [name, setName] = useState('');
    const [statuss, setStatuss] = useState('');
    const [assignedMember, setAssignedMember] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isAssigned, setIsAssigned] = useState('');
    const [hour, setHour] = useState('');
    const [priority, setPriority] = useState('');
    const[tasks , setTasks] = useState([]);
    const {id} = useParams()
     const navigate = useNavigate()


    useEffect(() =>{
        fetch('http://localhost:8000/employee/'+id)
        .then((res) => res.json())
        .then((data) => {
            setName(data.name)
            setStatuss(data.statuss)
            setIsAssigned(data.isAssigned)
            setAssignedMember(data.assignedMember)
            setDueDate(data.dueDate)
            setHour(data.hour)
            setPriority(data.priority)
        } )
        .catch((err) => console.log(err.message))
    },[])

    
  const handleSubmit = (e) => {
    e.preventDefault();
    const staticId = tasks.length + 1
    const createdate = new Date().toLocaleDateString()
    const taskdata = { name, statuss, assignedMember, dueDate, isAssigned, hour, priority , createdate , staticId };

    fetch('http://localhost:8000/employee/'+id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskdata)
    })
      .then(() =>{ 
         setTasks([...tasks, taskdata])
         navigate('/')
      }
    )
      .catch((err) => console.log(err.message));

    setName('');
    setStatuss('');
    setAssignedMember('');
    setDueDate('');
    setIsAssigned('');
    setHour('');
    setPriority('');
    
    
  };

  const Status = ['Uninitiated', 'In Progress', 'Completed'];
  const Members = ['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'];
  const Assigned = ['True', 'False'];
  const Priority = ['Low', 'Medium', 'High'];
   
  return (
    <div>
         <h1 id='Edit_task'>Edit Task</h1>
      <div className='create-form'>
      <form onSubmit={handleSubmit}>
        <div className='Task_title'>
          <div className='title_alinment'>
            <label htmlFor="serial_name" id='title'>Task Title : </label>
            <input
              type="text"
              id="serial_name"
              value={name}
              className='input_title'
              onChange={(e) => setName(e.target.value)}
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
            <input type="submit" value="Edit Save" id='submit' />
          </div>
          <div className='backthome'>
          <button className='backt'onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Edittask
