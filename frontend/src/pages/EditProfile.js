import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  if (!user) {
    return <h2>Please login first</h2>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = { name, email };
      if (password) payload.password = password;

      const res = await axios.put(
        `http://localhost:5000/api/students/${user._id}`,
        payload
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile Updated ✅");

      navigate("/profile"); // go back

    } catch (err) {
      alert("Update Failed ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Profile</h2>

      <form onSubmit={handleUpdate}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password (leave blank to keep current)"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;