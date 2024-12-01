import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const deleteUser = () => {
    axios
      .delete(`http://localhost:5000/api/users/${userId}`)
      .then(() => alert("User deleted!"))
      .catch((err) => console.error(err));
  };

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <p>{user.city}</p>
      <p>{user.email}</p>
      <img src={user.image} alt={user.name} />
      <button onClick={deleteUser}>Delete User</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserDetails;
