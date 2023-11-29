"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { editAction } from "@/action/editAction";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const FacultyMember = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState([]);
  // const [isOpen, setOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Fetch data from the /api/register endpoint
    fetch("/api/register")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.credentials)) {
          setUsers(data.credentials);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Delete File Permanent",
        text: "Are you sure you want to delete this file permanently?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        confirmButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/register?id=${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            // console.log("Credential deleted!");

            toast.success("Credential deleted!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            setDeleteUser((prevDeletedUser) =>
              prevDeletedUser.filter((user) => user._id !== id)
            );

            // Refetch the data to get the latest credentials
            const response = await fetch("/api/register");
            const newData = await response.json();

            // Update the state with the latest data
            setUsers(newData.credentials);
          } else {
            console.error("Failed to delete credential.");
            toast.error("Error deleting credential", {
              position: "top-center",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Error deleting credential ", {
        position: "top-center",
      });
    }
  };

  // const handleEdit = async (id, editedUser) => {
  //   try {
  //     const res = await fetch(`/api/register/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(editedUser),
  //     });

  //     console.log("res", res);

  //     if (res.ok) {
  //       // Handle success, close modal, and update the user list
  //       toast.success("User updated!", {
  //         position: "top-center",
  //         // Other toast options
  //       });

  //       onOpenChange();
  //       setUsers((prevUsers) =>
  //         prevUsers.map((u) => (u._id === id ? { ...u, ...editedUser } : u))
  //       );
  //     } else {
  //       // Handle error
  //       console.error("Failed to update user.");
  //       toast.error("Error updating user", {
  //         position: "top-center",
  //         // Other toast options
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error updating user", {
  //       position: "top-center",
  //       // Other toast options
  //     });
  //   }
  // };

  // async function handleUpdateprofile() {
  //   const { email, password, role } = formData;
  //   console.log("Formdata", formData);

  //   const res = await editAction({ email, password, role });

  //   console.log("res", res);

  //   if (res?.msg) {
  //     // Show the SweetAlert for profile update success
  //     showUpdateProfileSuccessAlert();
  //   }

  //   // Reset the form after a successful update
  //   setFormData({ email: "", password: "", role: "" }); q
  // }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const showUpdateProfileSuccessAlert = () => {
  //   Swal.fire({
  //     title: "Profile Updated",
  //     text: "Your profile has been updated successfully!",
  //     icon: "success",
  //   });
  // };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.image }}
              description={user.email}
              name={user.name}>
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.role}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <AiOutlineEye />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <BiSolidEdit
                    size={20}
                    // onClick={() => {
                    //   setEditUserId(user._id);
                    //   setEditUser({
                    //     email: user.email,
                    //     password: user.password,
                    //     role: user.role,
                    //   });
                    //   onOpen();
                    // }}
                    onClick={() => onOpen()}
                  />

                  {/* for modal */}
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center">
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Log in
                          </ModalHeader>
                          <ModalBody>
                            <Input
                              autoFocus
                              label="Email"
                              placeholder="Enter your email"
                              variant="bordered"
                              // value={editUser.email}
                              // onChange={(e) =>
                              //   setEditUser({
                              //     ...editUser,
                              //     email: e.target.value,
                              //   })
                              // }
                              name="email"
                              // value={formData.email}
                              // onChange={handleInputChange}
                            />
                            <Input
                              // endContent={
                              //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                              // }
                              label="Current Password"
                              placeholder="Enter your current password"
                              type="password"
                              variant="bordered"
                              name="password"
                              // value={editUser.password}
                              // onChange={(e) =>
                              //   setEditUser({
                              //     ...editUser,
                              //     password: e.target.value,
                              //   })
                              // }

                              // value={formData.password}
                              // onChange={handleInputChange}
                            />

                            {/* <Input
                              // endContent={
                              //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                              // }
                              label="New Password"
                              placeholder="Enter your new password"
                              type="password"
                              variant="bordered"
                              value={editUser.password}
                              onChange={(e) =>
                                setEditUser({
                                  ...editUser,
                                  password: e.target.value,
                                })
                              }
                            /> */}

                            <Select
                              label="Choose Role"
                              placeholder="Select Role"
                              className="max-w-xs"
                              name="role"
                              // value={formData.role}
                              // onChange={handleInputChange}
                            >
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
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="flat"
                              onPress={onClose}>
                              Close
                            </Button>
                            <Button
                              color="primary"
                              variant="flat"
                              // onPress={() => handleEdit(editUserId, editUser)}
                              // onPress={() => handleUpdateprofile()}
                            >
                              Edit
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </span>
              </Tooltip>
              <Tooltip
                color="danger"
                content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <RiDeleteBinLine onClick={() => handleDelete(user._id)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return user[columnKey];
      }
    },
    [isOpen, onOpen, onOpenChange]
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {users.map((user) => (
          <TableRow key={user._id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(user, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
