"use client";
import { useState } from "react";

export const AdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");

  const registerSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contact || !employeeId || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      // local route
      const res = await fetch("http://localhost:3000/api/register", {
        // deploy route vercel
        // const res = await fetch("https://file-signatory.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contact,
          employeeId,
          email,
          password,
          role,
        }),
      });

      if (res.ok) {
        // Clear the form fields manually
        setName("");
        setContact("");
        setEmployeeId("");
        setEmail("");
        setPassword("");
        setRole("user");
        // Display a success alert message
        alert("Registration successful!");

        // Clear the error message
        setError("");

        // Clear the success message after a few seconds (optional)
        setTimeout(() => alert(""), 3000);
      } else {
        console.log("Credential registration Failed");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  return (
    <>
      <h1>Admin Page</h1>
      <form
        onSubmit={registerSubmit}
        className="flex flex-col p-5 justify-center items-center">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="empoyeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <br />

        {/* choose role 4 roles Focal, Admin, Dean , and Cesu */}
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}>
          <option value="focal">Focal</option>
          <option value="admin">Admin</option>
          <option value="dean">Dean</option>
          <option value="cesu">Cesu</option>
        </select>

        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default AdminPage;
