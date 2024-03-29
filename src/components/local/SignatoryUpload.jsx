"use client";

import { useState, useEffect } from "react";
import { PickerOverlay } from "filestack-react-18";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { SignatoryFile } from "./SignatoryFile";
import { getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuUpload } from "react-icons/lu";

export const SignatoryUpload = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileHandle, setUploadedFileHandle] = useState("");
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const handleClearInput = () => {
    setInputValue("");
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setUploadedFileHandle("");
    setHasUploadedFile(false);
  };

  const handleClick = () => {
    setShowPicker((prevState) => !prevState);
  };

  useEffect(() => {
    setShowPicker(false);
  }, [uploadedFile, inputValue]);

  const handleUploadDone = async (res) => {
    try {
      if (res?.filesUploaded && res.filesUploaded.length > 0) {
        const { filename, size, url, mimetype } = res.filesUploaded[0];

        const filenameWithoutExtension = filename
          .split(".")
          .slice(0, -1)
          .join(".");

        const session = await getSession();
        const userRole = session.user.role;

        if (!userRole) {
          console.error("User role not found.");
          return;
        }

        const response = await fetch("/api/signatory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: filenameWithoutExtension,
            size,
            url,
            mimetype,
            currentSignatory: userRole, // Set currentSignatory based on user's role
          }),
        });

        if (response.ok) {
          console.log("File uploaded successfully!");
          setUploadedFile({
            filename: filenameWithoutExtension,
            size,
            url,
            mimetype,
            currentSignatory: userRole, // Set currentSignatory in the local state
            status: "Pending",
          });
          setHasUploadedFile(true);

          showUploadSuccessAlert();
        } else {
          console.error("Failed to upload file to MongoDB.");
        }
      } else {
        console.warn("No files uploaded.");
      }
    } catch (error) {
      console.error("Error while uploading file:", error);
    }
  };

  const showUploadSuccessAlert = () => {
    toast.success("File uploaded successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center border p-5 w-full md:w-1/2 md:mx-auto bg-white">
        <h1 className="text-md font-semibold mb-8 text-center">
          Upload File for Signatory
        </h1>

        <div className="mb-3">
          <span
            className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] mb-3 "
            onClick={handleClick}>
            <LuUpload size={23} />
          </span>
        </div>

        {uploadedFile && (
          <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8 w-full md:w-1/2">
            <div className="flex items-center justify-between">
              <span
                onClick={() =>
                  window.open(
                    `https://cdn.filestackcontent.com/${uploadedFileHandle}`
                  )
                }
                className="truncate pr-3 text-base font-medium text-[#07074D]">
                {uploadedFile.filename.split(".")[0]}
              </span>
              <button
                className="text-[#07074D]"
                onClick={removeUploadedFile}>
                <RxCross2 size={23} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showPicker && !hasUploadedFile && (
        <PickerOverlay
          apikey="An8nlW83SqzxGpQvDZeywz"
          onUploadDone={handleUploadDone}
        />
      )}
    </>
  );
};
