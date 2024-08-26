import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";


const Home = () => {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  

    const addTask = (task) => {
        const taskWithOriginalDuration = {
            ...task,
            originalDuration: task.duration,
        };
        setTasks([...tasks, taskWithOriginalDuration]);
        handleClose();
        toast.success("Task added successfully!");
    };

    const resetTimer = (taskTitle) => {
        setTasks(
            tasks.map((task) =>
                task.title === taskTitle
                    ? { ...task, duration: task.originalDuration }
                    : task
            )
        );
        toast.info("Timer reset successfully!");
    };

    return (
        <div>
            <Typography variant="h3" align="center" gutterBottom>
                Welcome to Planit
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{ display: "block", margin: "0 auto", mb: 4 }}
            >
                Add Task
            </Button>
            {tasks.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <img
                        src="/empty_state.png"
                        alt="Empty state"
                        style={{
                            width: "300px",
                            borderRadius: "15px",
                            opacity: 0.8,
                        }}
                    />
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        sx={{ mt: 2 }}
                    >
                        No tasks yet. Start by adding a new task!
                    </Typography>
                </Box>
            ) : (
                <TaskList tasks={tasks} resetTimer={resetTimer} />
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-task-modal"
                aria-describedby="add-task-form"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="add-task-modal" variant="h6" component="h2">
                        Add New Task
                    </Typography>
                    <TaskForm addTask={addTask} />
                </Box>
            </Modal>
        </div>
    );
};

export default Home;