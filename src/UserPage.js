import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";

const UserPage = () => {
  const { id } = useParams();
  return (
    <div>
      <UserDetails userId={id} />
    </div>
  );
};

export default UserPage;
