import React, { useState } from 'react';
import axios from 'axios';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/tasks/', { title, description, completed });
      alert('Task created successfully!');
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
            Completed
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTask;
