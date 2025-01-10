"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Types pour Drag and Drop
const ItemType = {
  TASK: "task",
};

// Composant tâche
const Task = ({ task, index, moveTask, column }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TASK,
    item: { index, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task rounded border-b border-stroke px-7 py-4 dark:border-strokedark bg-white shadow-default dark:bg-boxdark mb-5"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
     <h3 className="pb-5 font-medium text-black dark:text-white">{task.title}</h3>
      <ul>
        {task.subtasks.map((subtask, i) => (
          <li key={i} style={{ listStyle: "none" }}>
            <input type="checkbox" checked={subtask.done} readOnly /> {subtask.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Composant colonne
const Column = ({ title, tasks, moveTask, column }) => {
  const [, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item) => moveTask(item.index, item.column, column),
  });

  return (
    <div
       ref={drop}
       className="rounded column "
        style={{
            flex: 1,
            padding: "20px",
            margin: "0 10px",
        }}
    >
        <h3 className="pb-5 font-medium text-black dark:text-white">{title}</h3>
        <div
        >
        {tasks.map((task, index) => (
            <Task key={index} task={task} index={index} moveTask={moveTask} column={column} />
        ))}
        </div>
    </div>
    
  );
};

// Composant principal
export default function Home() {
  const [columns, setColumns] = useState({
    todo: [
      { title: "Task 1", subtasks: [{ text: "Subtask 1", done: false }] },
      { title: "Task 2", subtasks: [{ text: "Subtask 2", done: false }] },
    ],
    inProgress: [
      { title: "Task 3", subtasks: [{ text: "Subtask 3", done: false }] },
    ],
    completed: [
      { title: "Task 4", subtasks: [{ text: "Subtask 4", done: true }] },
    ],
  });

  const moveTask = (taskIndex, fromColumn, toColumn) => {
    const fromTasks = [...columns[fromColumn]];
    const toTasks = [...columns[toColumn]];
    const [movedTask] = fromTasks.splice(taskIndex, 1);
    toTasks.push(movedTask);

    setColumns({
      ...columns,
      [fromColumn]: fromTasks,
      [toColumn]: toTasks,
    });
  };

  return (
        <DndProvider backend={HTML5Backend}>
            <div className="mx-auto max-w-7xl h-screen">
                <Breadcrumb pageName="Task" />
                <div className="rounded">
                    <div className=" flex justify-between gap-4.5 border-b border-stroke px-7 py-4 dark:border-strokedark bg-white shadow-default dark:bg-boxdark">
                        <h3 className="font-medium text-black dark:text-white">
                        Personal Information
                        </h3>
                        <button
                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                            >
                            + Add Task
                            </button>
                    </div>
                    <div className="p-7">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Column
                            title={`To Do (${columns.todo.length})`}
                            tasks={columns.todo}
                            moveTask={moveTask}
                            column="todo"
                        />
                        <Column
                            title={`In Progress (${columns.inProgress.length})`}
                            tasks={columns.inProgress}
                            moveTask={moveTask}
                            column="inProgress"
                        />
                        <Column
                            title={`Completed (${columns.completed.length})`}
                            tasks={columns.completed}
                            moveTask={moveTask}
                            column="completed"
                        />
                        </div>
                    </div>
                    
                </div>
                </div>
        </DndProvider>
  );
}
