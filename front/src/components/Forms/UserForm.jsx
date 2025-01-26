import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../../api/userApi";
import "./Form.scss";

const UserForm = ({ onUserAdded, userToEdit, onEditUser, onCancelEdit }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (userToEdit) {
      setNewUser({
        name: userToEdit.name || "",
        email: userToEdit.email || "",
      });
    } else {
      setNewUser({
        name: "",
        email: "",
      });
    }
  }, [userToEdit]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        const updatedUser = await updateUser(userToEdit._id, {...newUser})
        onEditUser(updatedUser); 
      } else {
        const createdUser = await createUser(newUser);
        onUserAdded(createdUser); 
      }
      setNewUser({ name: "", email: "" }); 
    } catch (error) {
      console.error(userToEdit ? "Error editing user:" : "Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleAddUser}  className="form-container">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={handleInputChange}
        className="form-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleInputChange}
        className="form-input"
      />
     <div className="form-actions">
        <button type="submit" className="form-button">
          {userToEdit ? "Update User" : "Add User"}
        </button>
        {userToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="form-button cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
