const API_BASE_URL = "https://playground.4geeks.com/todo";
const USERNAME = "{noahtest}"; // Replace with your username
const USER_API_URL = `${API_BASE_URL}/users/${USERNAME}`;
const TODOS_API_URL = `${API_BASE_URL}/todos/${USERNAME}`;

/**
 * Create a new user in the database.
 */
export const createUser = async () => {
    try {
        // First, check if the user already exists
        const checkResponse = await fetch(USER_API_URL);

        if (checkResponse.ok) {
            console.log(`✅ User '${USERNAME}' already exists.`);
            return; // Stop here if the user exists
        }

        // If the user doesn't exist, create it
        const response = await fetch(USER_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log(`✅ User '${USERNAME}' created successfully.`);
    } catch (error) {
        console.error("❌ Failed to create user:", error);
    }
};




/**
 * Fetch all todos for the user.
 */
export const fetchTodos = async () => {
    try {
        const response = await fetch(USER_API_URL);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.todos || []; // API returns { name: "user", todos: [...] }
    } catch (error) {
        console.error("❌ Failed to fetch todos:", error);
        return [];
    }
};

/**
 * Add a new todo item.
 */
export const addTodo = async (label) => {
    try {
        const response = await fetch(TODOS_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label, is_done: false })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log("✅ Todo added successfully.");
        return await fetchTodos();
    } catch (error) {
        console.error("❌ Failed to add todo:", error);
    }
};

/**
 * Update a todo item by ID.
 */
export const updateTodo = async (todoId, label, isDone) => {
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label, is_done: isDone })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log("✅ Todo updated successfully.");
        return await fetchTodos();
    } catch (error) {
        console.error("❌ Failed to update todo:", error);
    }
};

/**
 * Delete a todo item by ID.
 */
export const deleteTodo = async (todoId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log("✅ Todo deleted successfully.");
        return await fetchTodos();
    } catch (error) {
        console.error("❌ Failed to delete todo:", error);
    }
};

/**
 * Delete the user and all associated todos.
 */
export const deleteUser = async () => {
    try {
        const response = await fetch(USER_API_URL, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log("✅ User deleted successfully.");
    } catch (error) {
        console.error("❌ Failed to delete user:", error);
    }
};
