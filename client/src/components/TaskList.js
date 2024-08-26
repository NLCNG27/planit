// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Box,
    Snackbar,
    Alert,
    Button,
} from "@mui/material";

const TaskList = ({ tasks, resetTimer }) => {
    const [activeTask, setActiveTask] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        let timer;
        if (activeTask && !isPaused) {
            timer = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setAlertOpen(true);
                        playAlarmSound();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeTask, isPaused]);

    const handleTaskClick = (task) => {
        if (activeTask && activeTask.title === task.title) {
            setIsPaused(!isPaused);
        } else {
            setActiveTask(task);
            setRemainingTime(task.duration);
            setIsPaused(false);
        }
    };

    const handleResetClick = () => {
        if (activeTask) {
            resetTimer(activeTask.title);
            setRemainingTime(activeTask.originalDuration);
            setIsPaused(true);
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`.trim();
    };

    const playAlarmSound = () => {
        const audio = new Audio("/alarm.mp3");
        audio.play();
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <div>
            <List>
                {tasks.map((task, index) => (
                    <React.Fragment key={index}>
                        <ListItem button onClick={() => handleTaskClick(task)}>
                            <ListItemText
                                primary={task.title}
                                secondary={task.time}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            {activeTask && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 4,
                    }}
                >
                    <Typography variant="h4" align="center">
                        {`Time remaining for ${activeTask.title}:`}
                    </Typography>
                    <Typography variant="h2" align="center">
                        {formatTime(remainingTime)}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsPaused(false)}
                        >
                            Resume
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setIsPaused(true)}
                        >
                            Pause
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleResetClick}
                        >
                            Reset Timer
                        </Button>
                    </Box>
                </Box>
            )}
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="warning">
                    Time's up for {activeTask?.title}!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TaskList;
