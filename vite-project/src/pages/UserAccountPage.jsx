import React, { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import TicketPage from "./TicketPage";
import axios from 'axios';

export default function UserAccountPage() {
  const { user, setUser } = useContext(UserContext);
  const [newHobbies, setNewHobbies] = useState('');

  const handleHobbiesChange = (e) => {
    setNewHobbies(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await axios.put(`/profile/${user._id}`, { hobbies: newHobbies });
      setUser(updatedUser.data);
    } catch (error) {
      console.error('Error updating hobbies:', error);
    }
  };

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      Account Name: {user.name}
      Account Mail: {user.email}
      Hobbies: {user.hobbies}
      Social Points: {user.socialPoints}
      <form onSubmit={handleSubmit}>
        <label htmlFor="newHobbies">New Hobbies:</label>
        <input
          type="text"
          id="newHobbies"
          value={newHobbies}
          onChange={handleHobbiesChange}
        />
        <button type="submit">Update Hobbies</button>
      </form>
      <TicketPage />
    </div>
  );
}
