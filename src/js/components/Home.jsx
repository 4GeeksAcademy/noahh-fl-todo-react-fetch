import React, { useState, useEffect } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo, createUser } from "../api.js";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    // Fetch todos on mount
    useEffect(() => {
        const initializeUser = async () => {
            await createUser();
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        };

        initializeUser();
    }, []);

    // Handle adding a new todo
    const handleAddTodo = async () => {
        if (!newTodo.trim()) return;
        const updatedTodos = await addTodo(newTodo);
        setTodos(updatedTodos);
        setNewTodo("");
    };

    // Handle toggling todo completion
    const handleToggleTodo = async (todo) => {
        const updatedTodos = await updateTodo(todo.id, todo.label, !todo.is_done);
        setTodos(updatedTodos);
    };

    // Handle deleting a todo
    const handleDeleteTodo = async (todoId) => {
        const updatedTodos = await deleteTodo(todoId);
        setTodos(updatedTodos);
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Todo List</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddTodo}>
                    Add
                </button>
            </div>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between">
                        <span
                            style={{ textDecoration: todo.is_done ? "line-through" : "none", cursor: "pointer" }}
                            onClick={() => handleToggleTodo(todo)}
                        >
                            {todo.label}
                        </span>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
