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
import { getSession } from "next-auth/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

export const Notif = () => {
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newFileName, setNewFileName] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [files, setFiles] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // setUserId(session.user._id);
        if (session) {
          // const userId = session.user._id;
          // const userRole = session.user.role;
          const role = session.user.role;
          // console.log("Check userRole", userRole);
          // console.log("Check role", role);
          // console.log("Check userId", userId);
          // console.log("Session", session);

          const res = await fetch(`/api/signatory/notif`, {
            cache: "no-store",
          });
          if (!res.ok) {
            throw new Error("Something went wrong");
          }

          const filesData = await res.json();

          //   // console.log("Files data:", filesData);

          // Filter files that match the user's ID
          const filteredFiles = filesData.filter(
            (file) => file.currentSignatory === role
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
          const res = await fetch(`/api/signatory?id=${id}`, {
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

  const downloadFile = (url) => {
    // Use the Filestack CDN to download the file
    window.open(`${url}?dl=true`, "_blank");
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

  const handleSubmit = async (id) => {
    try {
      const res = await fetch(`/api/signatory?id=${id}`, {
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

  const sendToSignatory = async (fileId) => {
    try {
      const session = await getSession();
      const userRole = session.user.role;

      const res = await fetch(`/api/signatory/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId, userRole }),
      });

      if (res.ok) {
        const result = await res.json();

        console.log("Successfully sent file to signatory", result);
        // Check if there's a specific message from the server
        if (result.message) {
          Swal.fire({
            title: "Success",
            text: result.message,
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          console.error("Unexpected response from the server");

          Swal.fire({
            title: "Error",
            text: "Failed to send file to signatory",
            icon: "error",
          });
        }
      } else {
        const errorResult = await res.json();
        console.error("Failed to send file to signatory", errorResult.message);

        Swal.fire({
          title: "Error",
          text: errorResult.message || "Failed to send file to signatory",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error while sending file to signatory:", error);

      Swal.fire({
        title: "Error",
        text: "Error while sending file to signatory",
        icon: "error",
      });
    }
  };

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  return (
    <>
      <h1 className="text-md font-semibold mb-8">Notifications</h1>
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
                            Delete
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
                          <Button
                            color="warning"
                            variant="shadow"
                            size="sm"
                            onClick={() => sendToSignatory(file._id)}>
                            Send to Signatory
                          </Button>
                          <Button
                            color="primary"
                            variant="outlined"
                            size="sm"
                            onClick={() => downloadFile(file.url)}>
                            Download
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
                                      onPress={onClose}
                                      onSubmit={() => handleSubmit(file._id)}>
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
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default Notif;
