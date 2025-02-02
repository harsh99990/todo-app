import React, { useState } from "react";
import "./Todo.css";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import TodoDate from "../../components/TodoDate";
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "../../components/TodoLocalSto";
import { toast, ToastContainer } from "react-toastify";

const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    // check input filed is empty or not
    if (!content) return;

    // check input value already exists or not
    const ifTodoContentMatched = task.some(
      (curTask) => curTask.content.toLowerCase() === content.toLowerCase()
    );

    if (ifTodoContentMatched) {
      toast.error("Task already exists", {
        position: "top-right",
        autoClose: 1500,
        pauseOnHover: false,
      });
      return;
    }

    setTask((prev) => [...prev, { id, content, checked }]);
    toast.success("Task added successfully", {
      position: "top-right",
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  // add data in to local storage
  setLocalStorageTodoData(task);

  // delete todo
  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((currEl) => currEl.content !== value);
    if (confirm("Are you sure want to delete this task?")) {
      setTask(updatedTask);
      toast.success("Task deleted successfully", {
        position: "top-right",
        autoClose: 1500,
        pauseOnHover: false,
      });
    } else {
      return;
    }
  };

  // checked todo (completed)
  const handleCheckedTodo = (content) => {
    const updateTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updateTask);
  };

  // clear all
  const handleClearTodoData = () => {
    if (task.length === 0) {
      alert("Please enter at least one task");
    } else {
      if (confirm("Are you sure want to delete all this task?")) {
        setTask([]);
        toast.success("Tasks deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          pauseOnHover: false,
        });
      } else {
        return;
      }
    }
  };

  return (
    <>
      <section className="todo-container">
        <header>
          <h1>Todo List</h1>
          {/* date component here */}
          <TodoDate />
        </header>
        <TodoForm onAddTodo={handleFormSubmit} />
        <section className="myUnOrdList">
          <ul>
            {task.map((curTask) => {
              return (
                <TodoList
                  key={curTask.id}
                  data={curTask.content}
                  checked={curTask.checked}
                  onHandleCheckedTodo={handleCheckedTodo}
                  onDeleteTodo={handleDeleteTodo}
                />
              );
            })}
          </ul>
        </section>
        <section>
          <button className="clear-btn" onClick={handleClearTodoData}>
            Clear All
          </button>
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default Todo;
