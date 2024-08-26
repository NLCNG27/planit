// src/components/Task.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Task = ({ task }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body2">
          Time: {task.time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Task;