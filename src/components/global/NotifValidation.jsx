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
import { useEffect, useState } from "react";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const statusColorMap = {
  unread: "danger",
  read: "success",
  vacation: "warning",
};

export const NotifValidation = () => {
  const [notifications, setNotifications] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch data from the /api/register endpoint
    fetch("/api/notification")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const columns = [
    { name: "NAME", uid: "name" },
    // { name: "ROLE", uid: "role" },
    { name: "FILE", uid: "file" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const deleteNotification = async (notification) => {
    try {
      // Send a request to the API to delete the notification
      const res = await fetch(`/api/notification`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });

      if (res.ok) {
        // Update the local state to reflect the deleted notification
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notification.id
          )
        );
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  //   const handleNotificationClick = async (file) => {
  //     console.log("Clicked File:", file);
  //     try {
  //       console.log("File ID:", file._id);
  //       const res = await fetch("/api/notification/approved", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ fileId: file._id }),
  //       });

  //       if (res.ok) {
  //         console.log("File Signatory status updated to 'approved'");

  //         // setFile((prevFiles) =>
  //         //   prevFiles.map((n) =>
  //         //     n._id === file._id ? { ...n, status: "Approved" } : n
  //         //   )
  //         // );

  //         setFiles((prevFiles) => {
  //           console.log("PrevFiles:", prevFiles); // Check the previous state
  //           return prevFiles.map((n) =>
  //             n._id === file._id ? { ...n, status: "Approved" } : n
  //           );
  //         });
  //       } else {
  //         console.error("Failed to update File Signatory status");
  //       }
  //     } catch (error) {
  //       console.error("Error updating File Signatory status:", error);
  //     }
  //   };

  const renderCell = React.useCallback((notification, columnKey) => {
    const cellValue = notification[columnKey];

    switch (columnKey) {
      case "name":
        return (
          // Render sender's name
          <User
            avatarProps={{ radius: "lg", src: notification.sender.image }}
            description={notification.sender.name}
            name={notification.sender.name}>
            {notification.sender.name}
          </User>
        );
      //   case "role":
      //     return (
      //       // Render sender's role
      //       <div className="flex flex-col">
      //         <p className="text-bold text-sm capitalize">
      //           {notification.sender.role}
      //         </p>
      //       </div>
      //     );
      case "file":
        return (
          // Render filename
          <div className="flex flex-col">
            {/* <Link href={`/dashboard/notifications/${file._id}`}> */}
            <p className="text-bold text-sm capitalize">
              {notification.message}
            </p>
            {/* </Link> */}
          </div>
        );
      case "status":
        return (
          // Render file status
          <Chip
            className="capitalize"
            color={statusColorMap[notification.status]}
            size="sm"
            variant="flat">
            {cellValue}
          </Chip>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Approved">
              <span className="text-lg text-success cursor-pointer active:opacity-50">
                <FaCheck
                //   onClick={() => handleNotificationClick(files)}
                />
              </span>
            </Tooltip>
            <Tooltip
              color="danger"
              content="Reject">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RxCross2 onClick={() => deleteNotification(notification)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return notification[columnKey];
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      {/* Table header rendering */}
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      {/* Table body rendering */}
      <TableBody items={notifications}>
        {notifications.map((notification) => (
          <TableRow key={notification._id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(notification, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
