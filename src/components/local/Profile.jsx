import React from "react";

export const Profile = () => {
  return <div>Profile</div>;
};

/** 
* ! This is the Profile component the action is failed
"use client";


import { useState, useEffect } from "react";
// import Alert from "@mui/material/Alert";
import { useSession } from "next-auth/react";
import { updateCredential } from "@/action/updateAction";
import { Form } from "../context/Form";
import { Button } from "../context/Button";

export const Profile = () => {
  const { data: session, update } = useSession();
  const [alertMessage, setAlertMessage] = useState(null);

  console.log("Profile session", session);

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        setAlertMessage(null);
      }, 5000); // Change the timeout value (in milliseconds) to adjust the duration before the alert vanishes
      return () => clearTimeout(timeout);
    }
  }, [alertMessage]);

  async function handleUpdateprofile(formData) {
    const name = formData.get("name");
    const image = formData.get("image");
    const contact = formData.get("contact");
    const employeeId = formData.get("employeeId");

    let updatedImage = image;

    if (!image && session?.user?.image) {
      // If no new image is provided and there is an existing image in the session, use the existing image
      updatedImage = session.user.image;
    }

    if (update) {
      update({ name, image: updatedImage, contact, employeeId });
    }

    const res = await updateCredential({
      name,
      image: updatedImage,
      contact,
      employeeId,
    });
    if (res?.msg) setAlertMessage(res.msg);
  }
  return (
    <>
      <div className="w-full md:w-3/4 flex flex-col items-center mb-10 p-5 bg-slate-200 shadow-md rounded-md">
        <h2>Update Profile</h2>
        <Form
          action={handleUpdateprofile}
          className="flex flex-col gap-5 w-full md:w-2/4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="p-2 rounded-md"
          />
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            className="p-2 rounded-md"
          />
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            className="p-2 rounded-md"
          />
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            name="image"
            placeholder="Image"
            className="p-2 rounded-md"
          />
          <div className="flex justify-center">
            <Button value="Update" />
          </div>
        </Form>
        <div className="mt-10">
          {alertMessage && (
            // <Alert
            //   variant="filled"
            //   severity="success">
            //   {alertMessage}
            // </Alert>

            <h1>{alertMessage}</h1>
          )}
        </div>
      </div>
    </>
  );
};
*/
