"use client";
import { useState } from "react";
import { BsPersonFillDown } from "react-icons/bs";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
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

    // Email validation regex
    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // if (!emailRegex.test(email)) {
    //   setError("Invalid email address");
    //   return;
    // }

    // Password validation (minimum length of 8 characters)
    // if (password.length < 8) {
    //   setError("Password must be at least 8 characters long");
    //   return;
    // }

    // Convert email to lowercase
    // const lowercaseEmail = email.toLowerCase();

    try {
      // Send lowercaseEmail to the server
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contact,
          employeeId,
          // email: lowercaseEmail,
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
        // Display a success  message
        toast.success("Register Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Register failed!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Error during registration", error);
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists!", { position: "top-center" });
      } else {
        toast.error("Registration failed!", { position: "top-center" });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full item-center justify-center">
          <div class="flex justify-center mb-6">
            <span class="inline-block bg-gray-200 rounded-full p-3">
              <BsPersonFillDown />
            </span>
          </div>
          <h2 class="text-2xl font-semibold text-center mb-4">
            Create a new account
          </h2>
          <p class="text-gray-600 text-center mb-6">
            Enter your details to register.
          </p>
          <form onSubmit={registerSubmit}>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label
                for="fullName"
                class="block text-gray-700 text-sm font-semibold mb-2">
                Employee ID
              </label>
              <input
                type="text"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2">
                Contact
              </label>
              <input
                type="text"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="@bulsu.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block text-gray-700 text-sm font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <p class="text-gray-600 text-xs mt-1">
                Must contain 1 uppercase letter, 1 number, min. 8 characters.
              </p> */}
            </div>
            <div className="mb-6">
              <Select
                label="Choose Role"
                placeholder="Select Role"
                className="max-w-xs"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <SelectItem
                  key="FOCAL"
                  value="FOCAL">
                  FOCAL
                </SelectItem>
                <SelectItem
                  key="ProgChair"
                  value="ProgChair">
                  ProgChair
                </SelectItem>
                <SelectItem
                  key="CESU"
                  value="CESU">
                  CESU
                </SelectItem>
                <SelectItem
                  key="DEAN"
                  value="DEAN">
                  DEAN
                </SelectItem>
                <SelectItem
                  key="ADMIN"
                  value="ADMIN">
                  ADMIN
                </SelectItem>
              </Select>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
