"use client";

import { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { BiSolidFilePdf } from "react-icons/bi";
import { RiFileVideoFill } from "react-icons/ri";
import { BsFileEarmarkWordFill } from "react-icons/bs";
import { AiFillFilePpt } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";
import { AiOutlineFileGif } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
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
import Swal from "sweetalert2";

export const File = () => {
  // State for storing files and handling errors
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState({});
  // for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [userId, setUserId] = useState();
  const [newFileName, setNewFileName] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // setUserId(session.user._id);
        if (session) {
          const userId = session.user._id; // Get the user's ID from the session
          // console.log("Check userId", userId);
          // console.log("Session", session);

          const res = await fetch(
            // local route
            `/api/file?userId=${userId}`,
            // deploy route vercel
            // `https://file-signatory.vercel.app/api/file?userId=${userId}`,
            {
              cache: "no-store",
            }
          );
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const filesData = await res.json();

          // Filter files that match the user's ID
          const filteredFiles = filesData.filter(
            (file) => file.userId === userId
          );

          setFiles(filteredFiles);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchFiles();

    // Refresh the file list every 1 seconds (adjust the interval as needed)
    const refreshInterval = setInterval(fetchFiles, 1000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(refreshInterval);
    };
  }, [session]);

  // Function to delete a file by its ID
  const deleteFile = async (id) => {
    Swal.fire({
      title: "Delete File",
      text: "Are you sure you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // deploy route vercel
          // const res = await fetch(
          // `https://file-signatory.vercel.app/api/file?id=${id}`,
          // {
          // local route
          const res = await fetch(`/api/file?id=${id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const { message } = await res.json();

          Swal.fire("Deleted!", message, "success");

          setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
        } catch (error) {
          console.error(error);
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  // Function to toggle file options (like delete and download)
  const toggleOptions = (id) => {
    setShowOptions((prevShowOptions) => ({
      ...prevShowOptions,
      [id]: !prevShowOptions[id],
    }));
  };

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // deploy route vercel
      // const res = await fetch(
      // `https://file-signatory.vercel.app/api/file?id=${id}`,
      // {
      // local route
      const res = await fetch(`/api/file?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newFileName }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-md font-semibold mb-8">Files</h1>
      <div className="flex justify-center">
        <section className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-3 lg:grid-cols-5 text-sm">
          {files.map((file) => (
            <div key={file._id}>
              {/* manual */}
              {/* <div className="flex flex-col gap-2 border rounded-lg p-2 bg-gray-50 hover:bg-gray-200 box-border h-52 w-52 shadow-md  overflow-hidden">
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BsImage
                      size={20}
                      className=" text-red-900"
                    />
                    <h3 className="ml-0 truncate ...">{file.filename}</h3>
                  </div>
                  <BiDotsVerticalRounded
                    size={20}
                    onClick={() => toggleOptions(file._id)}
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src={file.url}
                    alt="file-preview"
                    height={150}
                    width={200}
                  />
                </div>
              </div> */}
              {/* nextui */}
              <Card className="py-4">
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
                    onPress={onOpen}
                    size="sm"
                    color="primary">
                    Rename
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => deleteFile(file._id)}>
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
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center">
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            File Name
                          </ModalHeader>
                          <ModalBody>
                            <Input
                              autoFocus
                              label="Rename"
                              placeholder=""
                              variant="bordered"
                              onChange={(e) => setNewFileName(e.target.value)}
                              value={newFileName}
                            />
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
                              onPress={onClose}
                              onSubmit={handleSubmit}>
                              Rename
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
};
