"use client";

import { useState, useEffect } from "react";
// import Alert from "@mui/material/Alert";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/action/updateAction";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Swal from "sweetalert2";

export const Profile = () => {
  const { data: session, update } = useSession();
  const [alertMessage, setAlertMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    employeeId: "",
    image: "",
  });

  async function handleUpdateprofile() {
    const { name, image, contact, employeeId } = formData;

    let updatedImage = image;

    if (!image && session?.user?.image) {
      // If no new image is provided and there is an existing image in the session, use the existing image
      updatedImage = session.user.image;
    }

    if (update) {
      update({ name, image: updatedImage, contact, employeeId });
    }

    const res = await updateProfile({
      name,
      image: updatedImage,
      contact,
      employeeId,
    });

    if (res?.msg) setAlertMessage(res.msg);

    if (res?.msg) {
      // Show the SweetAlert for profile update success
      showUpdateProfileSuccessAlert();
    }

    // Reset the form after a successful update
    setFormData({
      name: "",
      contact: "",
      employeeId: "",
      image: "",
    });
  }

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;

  //   if (name === "image") {
  //     // Check if any files are selected
  //     if (files.length > 0) {
  //       // Use the first selected file
  //       const selectedFile = files[0];
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         [name]: selectedFile,
  //       }));
  //     }
  //   } else {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // for sweet alert
  const showUpdateProfileSuccessAlert = () => {
    Swal.fire({
      title: "Profile Updated",
      text: "Your profile has been updated successfully!",
      icon: "success",
    });
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <Table className="md:w-3/6">
          <TableHeader>
            <TableColumn className="text-center">Update Profile</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <form id="profileForm">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      label="Name"
                      color="secondary"
                      name="name"
                      placeholder="Update your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>
                <form id="profileForm">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      label="Contact"
                      color="secondary"
                      name="contact"
                      placeholder="Update your contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <form id="profileForm">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      label="Employee ID"
                      color="secondary"
                      name="employeeId"
                      placeholder="Update your employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>
                <form id="profileForm">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      label="Image"
                      color="secondary"
                      name="image"
                      placeholder="Update your image"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </TableCell>
            </TableRow>
            {/* error */}
            <TableRow key="5">
              <TableCell>
                <div className="flex justify-center">
                  {/* <Button
                  value="Update"
                  onClick={handleUpdateprofile}
                /> */}
                  <Button
                    color="secondary"
                    onClick={handleUpdateprofile}>
                    Update
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>
                {/** 
                 * ? This is for alert message manually
                <div className="mt-10 text-center">
                  {alertMessage && (
                    // <Alert
                    //   variant="filled"
                    //   severity="success">
                    //   {alertMessage}
                    // </Alert>

                    <h1>{alertMessage}</h1>
                  )}
                </div>
                */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* 
      /** 
      * ? This is the old code for the profile page
      <div className="w-full md:w-3/4 flex flex-col items-center mb-10 p-5 bg-slate-200 shadow-md rounded-md">
        <h2>Update Profile</h2>
        <Form
          // action={handleUpdateprofile}
          className="flex flex-col gap-5 w-full md:w-2/4">
          <label for="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="p-2 rounded-md"
          />
          <label for="contact">Contact:</label>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            className="p-2 rounded-md"
          />
          <label for="employeeId">Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            className="p-2 rounded-md"
          />
          <label for="image">Image:</label>
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
      
      */}
    </>
  );
};
