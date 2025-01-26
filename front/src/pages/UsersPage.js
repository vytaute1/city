import { useState, useEffect } from "react";
import UserForm from "../components/Forms/UserForm";
import UsersList from "../components/UsersList/UsersList";
import { getUsers, updateUser, deleteUser } from "../api/userApi";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const editUserHandler = async (updatedUser) => {
    const { _id, ...userData } = updatedUser;

    try {
      const updatedUserData = await updateUser(_id, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === _id ? updatedUserData : user))
      );
      setUserToEdit(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const startEditHandler = (user) => {
    setUserToEdit(user); 
  }

  const cancelEditHandler = () => {
    setUserToEdit(null); 
  }

  const newUserHandler = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <UserForm onUserAdded={newUserHandler} userToEdit={userToEdit} onCancelEdit={cancelEditHandler} onEditUser={editUserHandler} />
      <UsersList data={users} onDelete={deleteUserHandler} onEdit={startEditHandler} />
    </div>
  );
};

export default UsersPage;