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
import { Spinner } from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import { BsFileEarmarkWordFill } from "react-icons/bs";
import { AiFillFilePpt } from "react-icons/ai";
import { RiFileVideoFill } from "react-icons/ri";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

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
    try {
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
          const res = await fetch(`/api/file/restore?id=${id}`, {
            method: "PUT",
          });

          if (res.ok) {
            console.log("File restored successfully!");

            toast.success("File restored ", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            setDeletedFiles((prevDeletedFiles) =>
              prevDeletedFiles.filter((file) => file._id !== id)
            );
          } else {
            console.error("Failed to restore file.");
            toast.error("Error restoring file", { position: "top-center" });
          }
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Error restoring file", { position: "top-center" });
    }
  };

  // delete file permanently
  const deleteFilePermanently = async (id) => {
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
          const res = await fetch(`/api/file/permanent-delete?id=${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            console.log("File deleted permanently!");

            toast.success("File deleted permanently", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            setDeletedFiles((prevDeletedFiles) =>
              prevDeletedFiles.filter((file) => file._id !== id)
            );
          } else {
            console.error("Failed to delete file permanently.");
            toast.error("Error deleting file permanently", {
              position: "top-center",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Error deleting file permanently", {
        position: "top-center",
      });
    }
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
        <div className="flex justify-center">
          {session ? (
            <p>No deleted Files </p>
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
                            color="secondary"
                            size="sm"
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
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};
