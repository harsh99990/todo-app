import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState({});
  const handleInputChange = (value) => {
    setInputValue({ id: value, content: value, checked: false });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddTodo(inputValue);
    setInputValue({ id: "", content: "" });
  };
  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            value={inputValue.content}
            onChange={(e) => handleInputChange(e.target.value)}
            className="todo-input"
            autoComplete="off"
          />
        </div>
        <div>
          <button type="submit" className="todo-button">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};

export default TodoForm;
