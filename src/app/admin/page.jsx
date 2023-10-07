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
      // const res = await fetch("http://localhost:3000/api/register", {
      // deploy route vercel
      const res = await fetch(
        "https://file-signatory.vercel.app/api/register",
        {
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
        }
      );

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
        <div class="relative">
          <input
            type="text"
            id="name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            for="name"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Name
          </label>
        </div>
        <br />
        <br />
        <div class="relative">
          <input
            type="text"
            id="contact"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label
            for="contact"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Contact
          </label>
        </div>
        <br />
        <div class="relative">
          <input
            type="text"
            id="email"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            for="Email"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Email
          </label>
        </div>
        <br />
        <div class="relative">
          <input
            type="password"
            id="password"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            for="Password"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Password
          </label>
        </div>
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
          <option value="progchair">ProgChair</option>
        </select>

        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default AdminPage;
