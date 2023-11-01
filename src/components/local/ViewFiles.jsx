"use client";

import { useState } from "react";
// import { Modal } from "@/components/local/Modal";
import { Folder } from "@/components/local/Folder";
import { File } from "@/components/local/File";
import { HiFolderPlus } from "react-icons/hi2";
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

export const ViewFiles = ({ updateFolders }) => {
  const [newFolderName, setNewFolderName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /** 
  * ? manual modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewFolderName("");
  };
  */

  const handleCreate = async () => {
    try {
      // Show SweetAlert after the folder is created
      Swal.fire({
        icon: "success",
        title: "Folder Created",
        text: "The new folder has been successfully created.",
        confirmButtonColor: "#6A64F1", // Customize the confirm button color
      });

      const response = await fetch("/api/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newFolderName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create folder");
      }

      // Fetch the updated list of folders from the component (implement this)
      const updatedFolders = await fetchFolders(); // You should implement this function
      updateFolders(updatedFolders);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      // Handle the error, show a notification, etc.
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row-reverse mr-5">
          {/*  manual modal */}
          {/* <button
            onClick={handleShowModal}
            className="flex justify-between items-center gap-2 border rounded-md shadow-md px-4 py-2 bg-gray-50 hover:bg-gray-200">
            <HiFolderPlus size={20} />
            <h1 className="text-sm font-semibold">New</h1>
          </button>
          {showModal && (
            <Modal
              isVisible={showModal}
              onClose={handleCloseModal}
            />
          )} */}

          <Button
            onPress={onOpen}
            color="secondary">
            <span>
              <HiFolderPlus size={20} />
            </span>
            New
          </Button>
          <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            onSubmit={handleCreate}
            placement="center">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    New Folder
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="New Folder"
                      placeholder="Untitled folder"
                      value={newFolderName}
                      onChange={(e) => {
                        setNewFolderName(e.target.value);
                      }}
                      variant="bordered"
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
                      onClick={handleCreate}>
                      Create
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="p-2">
          <h1 className="text-md font-semibold mb-8">Folders</h1>
          <div className="flex flex-col gap-5">
            <section className="ml-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 text-sm">
              <Folder />
            </section>
            <section>
              <File />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
