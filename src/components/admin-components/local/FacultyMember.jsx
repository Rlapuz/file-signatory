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

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const FacultyMember = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

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

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback((user, columnKey) => {
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
                <BiSolidEdit />
              </span>
            </Tooltip>
            <Tooltip
              color="danger"
              content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBinLine />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return user[columnKey];
    }
  }, []);

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
