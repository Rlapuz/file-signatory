"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFolder } from "react-icons/fa";
import { useSession } from "next-auth/react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Folder = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState({});
  const [newFolderName, setNewFolderName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        if (session) {
          const userId = session.user._id; // Get the user's ID from the session
          const res = await fetch(`/api/folder?userId=${userId}`, {
            cache: "no-store",
          });
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const foldersData = await res.json();

          // Filter files that match the user's ID
          const filteredFolders = foldersData.filter(
            (file) => file.userId === userId
          );

          setFolders(filteredFolders);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchFolders();

    // Refresh the folder list every 1 seconds (adjust the interval as needed)
    const refreshInterval = setInterval(fetchFolders, 1000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(refreshInterval);
    };
  }, [session]);

  const deleteFolder = async (id) => {
    Swal.fire({
      title: "Delete Folder",
      text: "Are you sure you want to delete this folder and its contents?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/folder?id=${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            toast.success("Folder deleted successfully!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            throw new Error("Something went wrong");
          }

          // After successful delete, update the folders list by filtering out the deleted folder
          setFolders((prevFolders) =>
            prevFolders.filter((folder) => folder._id !== id)
          );
        } catch (error) {
          console.error(error);
          Swal.fire("Error", error.message, "error");
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

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("newFolderName", newFolderName);

      const res = await fetch(`/api/folder?id=${id}`, {
        method: "PUT",
        body: formData,
      });

      // console.log("Check newFolderName", newFolderName);
      // console.log("Check id", id);
      // console.log("Check res", res);

      if (res.ok) {
        toast.success("Folder renamed successfully!", {
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
      toast.error("Error renaming folder", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {folders.length === 0 ? (
        <div className="flex justify-center">
          {session ? (
            <p>No folders uploaded</p>
          ) : (
            <Spinner
              label="Loading..."
              color="secondary"
            />
          )}
        </div>
      ) : (
        <>
          {folders.map((folder) => (
            <div key={folder._id}>
              <div className="flex justify-between items-center gap-4 border rounded-lg shadow-md px-3 py-4 bg-white hover:bg-gray-200">
                {/* <Link
                  href={`/dashboard/${folder._id}`}
                  className="flex items-center gap-2">
                  <FaFolder size={20} />
                  <h3 className="ml-0 text-menus text-sm truncate w-20">
                    {folder.name}
                  </h3>
                </Link> */}
                <div className="flex items-center gap-2">
                  <FaFolder size={20} />
                  <h3 className="ml-0 text-menus text-sm sm:truncate ">
                    {folder.name}
                  </h3>
                </div>
                {/* <BiDotsVerticalRounded
              size={20}
              onClick={() => toggleOptions(folder._id)}
            /> */}

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
                        onClick={() => deleteFolder(folder._id)}>
                        Delete
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
                                Folder Name
                              </ModalHeader>
                              <ModalBody>
                                <Input
                                  autoFocus
                                  label="Rename"
                                  placeholder=""
                                  variant="bordered"
                                  onChange={(e) =>
                                    setNewFolderName(e.target.value)
                                  }
                                  value={newFolderName}
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
                                  onClick={(e) => {
                                    handleSubmit(e, folder._id);
                                    onOpenChange();
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
              </div>

              {/* 
          * ? manual
          {showOptions[folder._id] && ( // Display options only if showOptions[id] is true
            <div className="flex justify-between mt-2 md:py-2 md:px-5">
              <Button
                onPress={onOpen}
                size="sm"
                color="primary">
                Rename
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => deleteFolder(folder._id)}>
                Delete
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center">
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Folder Name
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Rename"
                          placeholder=""
                          variant="bordered"
                          onChange={(e) => setNewFolderName(e.target.value)}
                          value={newFolderName}
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
        </>
      )}
    </>
  );
};
