"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const File = () => {
  // State for storing files and handling errors
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
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

          const res = await fetch(`/api/file?userId=${userId}`, {
            cache: "no-store",
          });
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
      title: "Move to Trash",
      text: "Are you sure you want to move this file to trash ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, move it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a DELETE request to delete the file
          const res = await fetch(`/api/file?id=${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            // Notify the user about the successful file deletion
            toast.success("File move to trash!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            // Remove the deleted file from the state
            setFiles((prevFiles) =>
              prevFiles.filter((file) => file._id !== id)
            );
          } else {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error moving file to trash", {
            position: "top-center",
          });
        }
      }
    });
  };

  // // Function to toggle file options (like delete and download)
  // const toggleOptions = (id) => {
  //   setShowOptions((prevShowOptions) => ({
  //     ...prevShowOptions,
  //     [id]: !prevShowOptions[id],
  //   }));
  // };

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

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("newFileName", newFileName);

      const res = await fetch(`/api/file?id=${id}`, {
        method: "PUT",
        body: formData,
      });

      // console.log("Check newFileName", newFileName);
      // console.log("Check id", id);
      // console.log("Check res", res);

      if (res.ok) {
        toast.success("File renamed successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // console.log("Check Ok res", res);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error renaming file", {
        position: "top-center",
      });
    }
  };

  // Function to determine the content to display in CardBody based on file type
  const renderCardBodyContent = (file) => {
    const { mimetype, url } = file;

    if (mimetype.includes("video") || mimetype.includes("doc")) {
      return (
        <iframe
          style={{ width: "200px", height: "150px" }}
          src={url}></iframe>
      );
    } else if (
      mimetype.includes("image") ||
      mimetype.includes("gif") ||
      mimetype.includes("pdf")
    ) {
      return (
        <Image
          alt="file-preview"
          className="object-cover rounded-lg"
          src={url}
          width={200}
          height={150}
        />
      );
    } else {
      // Default content for other file types
      return (
        <Image
          alt="file-preview"
          className="object-cover rounded-lg"
          src={url}
          width={200}
          height={150}
        />
      );
    }
  };

  return (
    <>
      <h1 className="text-md font-semibold mb-8">Files</h1>
      {files.length === 0 ? (
        <div className="flex justify-center">
          {session ? (
            <p>No files uploaded</p>
          ) : (
            <Spinner
              label="Loading..."
              color="secondary"
            />
          )}
        </div>
      ) : (
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
                <Card className="py-4 h-[270px] bg-white">
                  <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
                    <div className="flex items-center">
                      {getIconForMimeType(file.mimetype)}
                    </div>
                    <div className="flex items-center">
                      <p className="text-tiny font-bold truncate w-20 text-center">
                        {file.filename}
                      </p>
                    </div>
                    {/* <div className="flex items-center">
                    <BiDotsVerticalRounded
                      size={20}
                      onClick={() => toggleOptions(file._id)}
                    />
                  </div> */}

                    {/* next ui */}
                    <Popover
                      placement="right"
                      showArrow={true}
                      className=" bg-slate-200">
                      <PopoverTrigger>
                        <div className="flex items-center">
                          <BiDotsVerticalRounded size={20} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col gap-3 p-5">
                          <Button
                            onPress={onOpen}
                            size="sm"
                            color="primary"
                            variant="shadow">
                            Rename
                          </Button>
                          <Button
                            color="danger"
                            variant="shadow"
                            size="sm"
                            onClick={() => deleteFile(file._id)}>
                            Trash
                          </Button>
                          <Button
                            color="success"
                            variant="shadow"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `https://cdn.filestackcontent.com/${file.url}`
                              )
                            }>
                            View
                          </Button>

                          {/* for rename modal */}
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
                                      onChange={(e) =>
                                        setNewFileName(e.target.value)
                                      }
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
                                      onClick={(e) => {
                                        handleSubmit(e, file._id);
                                        onOpenChange(); // Close the modal after handling the submit
                                      }}>
                                      Rename
                                    </Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex justify-center">
                    {renderCardBodyContent(file)}
                  </CardBody>
                </Card>
                {/* nextui */}
                {/* 
              * ? manual
              { showOptions[file._id] && (
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
              )} */}
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};
