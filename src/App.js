import egypt1 from "./images/egypt1.jpg";
import "./App.scss";
import Egypt from "./Egypt";

import "./index.css";
import egypt2 from "./images/egpyt2.jpg";

import ReactDOM from "react-dom";
import "./index.css";
import UserList from "./UserList";
import React, { useState, useEffect, createContext, useReducer } from "react";

const App7 = () => {
  const [items, setItems] = useState([]); // State to store the list of items

  // Fetch items from the backend
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Function to remove an item
  const removeItem = async (id) => {
    try {
      // Send a DELETE request to the backend
      await fetch(`/api/items/${id}`, { method: "DELETE" });

      // Update the items state to remove the deleted item
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="App">
      <h1>Item List</h1>

      {/* List of items */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => removeItem(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App2 = () => {
  const [items, setItems] = useState([]); // State to store the list of items
  const [currentItem, setCurrentItem] = useState({ name: "", description: "" }); // State for the new item being added

  // Fetch items from the backend when the app loads
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Function to add a new item
  const addItem = async () => {
    try {
      // Send a POST request to the backend
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });
      const newItem = await res.json(); // Parse the response to get the new item

      // Add the new item to the local state
      setItems([...items, newItem]);
      setCurrentItem({ name: "", description: "" }); // Reset the input fields
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Item Management</h1>

      {/* Input fields for adding a new item */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={currentItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={currentItem.description}
          onChange={handleInputChange}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* List of items */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App3 = () => {
  const [items, setItems] = useState([]); // State to store items
  const [currentItem, setCurrentItem] = useState({ name: "", description: "" }); // State for the item being edited/added
  const [isEditing, setIsEditing] = useState(false); // State to track if editing is active

  // Fetch items from the backend
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Function to add a new item
  const addItem = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });
      const newItem = await res.json();
      setItems([...items, newItem]); // Add the new item to the state
      setCurrentItem({ name: "", description: "" }); // Reset input fields
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // Function to edit an existing item
  const editItem = async () => {
    try {
      const res = await fetch(`/api/items/${currentItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });
      const updatedItem = await res.json();

      // Update the item in the state
      setItems(
        items.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      setIsEditing(false); // Exit editing mode
      setCurrentItem({ name: "", description: "" }); // Reset input fields
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Item Management</h1>

      {/* Input fields for adding or editing */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={currentItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={currentItem.description}
          onChange={handleInputChange}
        />
        <button onClick={isEditing ? editItem : addItem}>
          {isEditing ? "Save Changes" : "Add Item"}
        </button>
      </div>

      {/* List of items */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
            <button
              onClick={() => {
                setCurrentItem(item); // Load the item into the input fields
                setIsEditing(true); // Enter editing mode
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App5 = () => {
  const [items, setItems] = useState([]); // State to store items

  // Fetch items from the backend
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Function to delete an item
  const deleteItem = async (id) => {
    try {
      // Send DELETE request to backend
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      // Update state to remove the deleted item
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="App">
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div>
      <Egypt />
      <img src={egypt1} alt="Logo" />
      <img src={egypt2} alt="Logo" />
      <UserList />
    </div>
  );
}

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const AppContext = createContext();

const App6 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <h1>React Reducer Example</h1>
        <p>Count: {state.count}</p>
        <div>
          <button onClick={() => dispatch({ type: "INCREMENT" })}>
            Increment
          </button>
          <button onClick={() => dispatch({ type: "DECREMENT" })}>
            Decrement
          </button>
          <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        </div>
      </div>
    </AppContext.Provider>
  );
};
export default App;
