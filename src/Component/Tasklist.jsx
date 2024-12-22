import React, { useEffect, useState } from 'react';
import './Tasklist.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { DragDropContext , Droppable , Draggable} from 'react-beautiful-dnd';


function Tasklist() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Add state for filtered tasks
  const [filterInput, setFilterInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [autoTaskId, setAutoTaskId] = useState();
  const [member, setMember] = useState('');
  const [assigned, setAssigned] = useState('');
  const [priority, setPriority] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [estimateTime, setEstimateTime] = useState('');
  const [createTime, setCreateTime] = useState('');
  const [currentPageData, setCurrentPageData] = useState([]);
  const navigate = useNavigate();
  console.log(autoTaskId)
  
  useEffect(() => {
    fetch('http://localhost:8000/employee')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setFilteredTasks(data); // Initialize filteredTasks with full data
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Filter tasks based on dropdown selections
  useEffect(() => {
    let filtered = tasks;

    if (filterInput) {
      filtered = filtered.filter(task => task.title.toLowerCase().includes(filterInput.toLowerCase()));
      
    }
    if (filterStatus) {
      filtered = filtered.filter(task => task.statuss === filterStatus);
    }
    if (autoTaskId) {
      filtered = filtered.filter(task => task.taskId === Number(autoTaskId));
    }
    if (member) {
      filtered = filtered.filter(task => task.assignedMember === member);
    }
    if (assigned) {
      filtered = filtered.filter(task => task.isAssigned === assigned);
    }
    if (priority) {
      filtered = filtered.filter(task => task.priority === priority);
    }
    if (filterDate) {
      filtered = filtered.filter(task => task.dueDate === filterDate);
    }
    if (estimateTime) {
      filtered = filtered.filter(task => task.hour === estimateTime);
    }

    if (createTime) {
      filtered = filtered.filter(task => 
          new Date(task.createdate).toISOString().split('T')[0] === createTime
      );
  }
    
    setFilteredTasks(filtered);
    console.log(filtered)
  }, [tasks, filterInput, filterStatus, autoTaskId, member, assigned, priority, filterDate, estimateTime, createTime]);

  function removetask(id) {
    fetch(`http://localhost:8000/employee/${id}`, { method: 'DELETE' })
      .then(() => {
        const updatedTasks = tasks.filter(item => item.id !== id);
        setTasks(updatedTasks);
      })
      .catch((err) => console.log(err.message));
  }

  function handlePageChange(pagination){
    setCurrentPageData(pagination)
  }

  const Status = ['Uninitiated', 'In Progress', 'Completed'];
  const Members = ['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'];
  const Assigned = ['True', 'False'];
  const Priority = ['Low', 'Medium', 'High'];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(currentPageData);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setCurrentPageData(updatedTasks);
  };

  return (
    <>
      <div>
        <h1 id='header'>Task Management</h1>
      </div>
      <div className="create_task">
        <Link to="Create/task" className="addTotask"> Add to Task</Link>
      </div>
      <div className="task-header">
        <DragDropContext onDragEnd={onDragEnd}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr id="top">
              <td>SERIAL NO.</td>
              <td>TASK TITLE <br />
                <input type="text" className='filter-input' value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
              </td>
              <td>TASK ID <br />
                <select id="taskId" onChange={(e) => setAutoTaskId(e.target.value)}>
                  <option value="">All</option>
                  {tasks.map((s, i) => (
                    <option value={s.taskId} key={i}>{s.taskId}</option>
                  ))}
                </select>
              </td>
              <td>STATUS <br />
                <select id="status" onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All</option>
                  {Status.map((a, i) => (
                    <option value={a} key={i}>{a}</option>
                  ))}
                </select>
              </td>
              <td>ASSIGNED MEMBERS <br />
                <select id="member" onChange={(e) => setMember(e.target.value)}>
                  <option value="">All</option>
                  {Members.map((m, i) => (
                    <option value={m} key={i}>{m}</option>
                  ))}
                </select>
              </td>
              <td>DUE DATE <br />
                <input type='date' id="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              </td>
              <td>IS ASSIGNED <br />
                <select id="assigned" onChange={(e) => setAssigned(e.target.value)}>
                  <option value="">All</option>
                  {Assigned.map((a, i) => (
                    <option value={a} key={i}>{a}</option>
                  ))}
                </select>
              </td>
              <td>ESTIMATED HOURS <br />
                <input type="Time"  pattern='' value={estimateTime} onChange={(e) => setEstimateTime(e.target.value)} />
              </td>
              <td>PRIORITY <br />
                <select id="priority" onChange={(e) => setPriority(e.target.value)}>
                  <option value="">All</option>
                  {Priority.map((p, i) => (
                    <option value={p} key={i}>{p}</option>
                  ))}
                </select>
              </td>
              <td>CREATED ON <br />
                <input type='date' id="createdate"    value={createTime} onChange={(e) => setCreateTime(e.target.value)} />
              </td>
              <td>ACTIONS</td>
            </tr>
          </thead>
          <Droppable droppableId="droppable-tasks">
           {
            (provided) => (
             <tbody ref={provided.innerRef} {...provided.droppableProps}>
                   {currentPageData.length > 0 ? currentPageData.map((tsk , index) => (
             <Draggable key={tsk.taskId} draggableId={tsk.taskId.toString()} index={index}>
             {(provided) => (
                <tr
               ref={provided.innerRef}
               {...provided.draggableProps}
                 {...provided.dragHandleProps}
                   >
        <td>{tsk.serialNo}</td>
        <td>{tsk.title}</td>
        <td>{tsk.taskId}</td>
        <td>{tsk.statuss}</td>
        <td>{tsk.assignedMember}</td>
        <td>{tsk.dueDate}</td>
        <td>{tsk.isAssigned}</td>
        <td>{tsk.hour}</td>
        <td>{tsk.priority}</td>
        <td>{tsk.createdate}</td>
        <td className="edit_delete">
          <button onClick={() => navigate(`/edit/task/${tsk.id}`)}>Edit</button>
          <button onClick={() => removetask(tsk.id)}>Delete</button>
        </td>
      </tr>
    )}
  </Draggable>
)) : <tr><td colSpan="11">No tasks found</td></tr>}
       {provided.placeholder}

          </tbody>
            )
           }
          </Droppable>
        </table>
        </DragDropContext>
        
        <div>
           <Pagination filter={filteredTasks} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}

export default Tasklist;


