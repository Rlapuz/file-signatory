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
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const { message } = await res.json();

          Swal.fire("Deleted!", message, "success");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/folder?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newFolderName }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const { message } = await res.json();

      Swal.fire("Renamed!", message, "success");

      // After successful delete, update the folders list by filtering out the deleted folder
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder._id !== id)
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <>
      {folders.map((folder) => (
        <div key={folder._id}>
          <div className="flex justify-between items-center gap-4 border rounded-lg shadow-md px-3 py-4 bg-white hover:bg-gray-200">
            <Link
              href={`/dashboard/${folder._id}`}
              className="flex items-center gap-2">
              <FaFolder size={20} />
              <h3 className="ml-0">{folder.name}</h3>
            </Link>
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
                              onSubmit={() => handleSubmit(folder._id)}>
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
  );
};
