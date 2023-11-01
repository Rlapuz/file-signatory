"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import { BsFileEarmarkWordFill } from "react-icons/bs";
import { AiFillFilePpt } from "react-icons/ai";
import { RiFileVideoFill } from "react-icons/ri";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import Image from "next/image";

export const Retrieve = () => {
  const [deletedFiles, setDeletedFiles] = useState([]);
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState({});
  const [newFileName, setNewFileName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Fetch deleted files for the logged-in user
    const fetchDeletedFiles = async () => {
      try {
        if (session) {
          const userId = session.user._id; // Use the user's ID from the session

          // Replace the URL with your API endpoint to fetch deleted files for the specific user
          const res = await fetch(
            // deploy route vercel
            // `https://file-signatory.vercel.app/api/file/deleted?userId=${userId}`
            // local route
            `/api/file/deleted?userId=${userId}`
          );

          const deletedFile = await res.json();

          // Filter files that match the user's ID
          const filteredDeletedFile = deletedFile.filter(
            (file) => file.userId === userId
          );

          setDeletedFiles(filteredDeletedFile);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeletedFiles();
  }, [session]);

  const restoreDeletedFile = async (id) => {
    Swal.fire({
      title: "Restore File",
      text: "Are you sure you want to restore this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, restore it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Your code to send a PUT request to restore the file here
          const res = await fetch(`/api/file/restore?id=${id}`, {
            method: "PUT",
          });

          if (res.ok) {
            console.log("File restored successfully!");
            const { message } = await res.json();

            Swal.fire("Restored!", message, "success");

            setDeletedFiles((prevDeletedFiles) =>
              prevDeletedFiles.filter((file) => file._id !== id)
            );
            // You can add additional logic here, such as updating UI or showing notifications.
          } else {
            console.error("Failed to restore file.");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  // delete file permanently
  const deleteFilePermanently = async (id) => {
    Swal.fire({
      title: "Delete File Permanent",
      text: "Are you sure you want to delete this file permanent?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/file/permanent-delete?id=${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            console.log("File deleted permanently!");
            const { message } = await res.json();
            Swal.fire("Deleted!", message, "success");

            setDeletedFiles((prevDeletedFiles) =>
              prevDeletedFiles.filter((file) => file._id !== id)
            );
            // You can add additional logic here, such as updating UI or showing notifications.
          } else {
            console.error("Failed to delete file permanently.");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const toggleOptions = (id) => {
    setShowOptions((prevShowOptions) => ({
      ...prevShowOptions,
      [id]: !prevShowOptions[id],
    }));
  };

  // for dynamic icon
  const getIconForMimeType = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return (
          <BiSolidFilePdf
            size={20}
            className="text-red-900"
          />
        );
      case "application/msword":
        return (
          <BsFileEarmarkWordFill
            size={20}
            className="text-blue-900"
          />
        );
      case "application/vnd.ms-powerpoint":
        return (
          <AiFillFilePpt
            size={20}
            className="text-red-900"
          />
        );
      case "video/mp4":
        return (
          <RiFileVideoFill
            size={20}
            className="text-red-900"
          />
        );
      case "image/jpeg":
      case "image/png":
        return (
          <BsImage
            size={20}
            className="text-red-900"
          />
        );
      case "GIF":
        return (
          <AiOutlineFileGif
            size={20}
            className="text-red-900"
          />
        );
      default:
        return (
          <FaFileAlt
            size={20}
            className="text-blue-900"
          />
        );
    }
  };
  return (
    <>
      <h1 className="text-md font-semibold mb-8">Retrieve Files</h1>
      {deletedFiles.length === 0 ? (
        <p>No deleted files found.</p>
      ) : (
        <div className="flex justify-center">
          <section className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-3 lg:grid-cols-5 text-sm">
            {deletedFiles.map((file) => (
              <div key={file._id}>
                {/* nextui */}
                <Card className="py-4 h-[270px]">
                  <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
                    <div className="flex items-center">
                      {getIconForMimeType(file.mimetype)}
                    </div>
                    <div className="flex items-center">
                      <p className="text-tiny font-bold truncate w-20 text-center">
                        {file.filename}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <BiDotsVerticalRounded
                        size={20}
                        onClick={() => toggleOptions(file._id)}
                      />
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="file-preview"
                      className="object-cover rounded-lg"
                      src={file.url}
                      width={200}
                      height={150}
                    />
                  </CardBody>
                </Card>
                {/* nextui */}
                {showOptions[file._id] && (
                  <div className="flex gap-3 mt-2 ml-2">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => restoreDeletedFile(file._id)}>
                      Restore
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deleteFilePermanently(file._id)}>
                      Delete
                    </Button>
                    <Button
                      color="success"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `https://cdn.filestackcontent.com/${file.url}`
                        )
                      }>
                      View
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};
