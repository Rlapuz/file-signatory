"use client";

import { useState } from "react";

export const Modal = ({ isVisible, onClose, onFolderNameChange, onSubmit }) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateAndClose = async () => {
    onSubmit(); // Call the folder creation logic
    onClose(); // Close the modal
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-gray-50 box-border border rounded-md shadow-md h-1/4 w-2/4 md:h-1/4 md:w-1/4 px-3 py-4">
            <h1 className="text-center">New Folder</h1>
            <div className="mt-5 text-sm">
              <div>
                <input
                  type="text"
                  placeholder="Untitled folder"
                  value={newFolderName}
                  onChange={(e) => {
                    setNewFolderName(e.target.value);
                    onFolderNameChange(e.target.value); // Update the folder name in parent component
                  }}
                  className="border rounded-md p-2 w-full mb-5"
                />
                <div className="flex justify-end gap-4 text-blue-500 md:mt-5">
                  <button
                    className="hover:bg-blue-50 rounded-lg p-2"
                    onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="hover:bg-blue-50 rounded-lg p-2"
                    onClick={handleCreateAndClose}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
