// src/components/TaskForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      toast.error('Task name is required.');
      return;
    }

    const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60;

    if (totalSeconds === 0) {
      toast.error('Please specify at least one time value (hours or minutes).');
      return;
    }

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const time = `${hrs}h ${mins}m ${secs}s`.replace(/(?:0h )?(?:0m )?(?:0s)?/g, '').trim();


    addTask({ title: task, time, duration: totalSeconds });
    setTask('');
    setHours('');
    setMinutes('');
    toast.success('Task added successfully!');
  };

  const handleHoursChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setHours(value.toString());
  };

  const handleMinutesChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setMinutes(value.toString());
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Minutes"
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;