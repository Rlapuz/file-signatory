"use client";

import { useState, useEffect } from "react";
import { PickerOverlay } from "filestack-react-18";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { SignatoryFile } from "./SignatoryFile";

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
          }),
        });

        if (response.ok) {
          console.log("File uploaded successfully!");
          setUploadedFile({
            filename: filenameWithoutExtension,
            size,
            url,
            mimetype,
            currentSignatory: "ProgChair", // Initial signatory
            status: "Pending", // Initial status
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
    Swal.fire({
      title: "File Upload Success",
      text: "Your file has been uploaded successfully!",
      icon: "success",
    });
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[450px] bg-white">
          <form className="py-6 px-9">
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D] text-center">
                Upload File for Signatory
              </label>

              <div className="mb-8">
                <label
                  for="file"
                  className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-8 text-center">
                  <div>
                    {/* filestack */}
                    {/* <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span> */}
                    {/* <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span> */}
                    <span
                      className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                      onClick={handleClick}>
                      Choose File
                    </span>
                  </div>
                </label>
              </div>

              {uploadedFile && (
                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
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
          </form>
        </div>
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
