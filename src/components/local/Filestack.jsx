"use client";

import { RxCross2 } from "react-icons/rx";
import { PickerOverlay } from "filestack-react-18";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const Filestack = () => {
  const [inputValue, setInputValue] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileHandle, setUploadedFileHandle] = useState("");
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setUploadedFileHandle("");
    setHasUploadedFile(false);
  };

  function handleClick() {
    setShowPicker((prevState) => !prevState);
  }

  // Use useEffect hook to reset showPicker when uploadedFile or inputValue changes
  useEffect(() => {
    setShowPicker(false);
  }, [uploadedFile, inputValue]);

  // Function to handle the file upload completion
  const handleUploadDone = async (res) => {
    try {
      if (res?.filesUploaded && res.filesUploaded.length > 0) {
        const { filename, size, url, mimetype } = res.filesUploaded[0];

        // Extract the filename without the extension
        const filenameWithoutExtension = filename
          .split(".")
          .slice(0, -1)
          .join(".");

        const response = await fetch("/api/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Save the filename without extension to the database
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
          });
          setHasUploadedFile(true); // Set the hasUploadedFile state to true

          // Show the SweetAlert for upload success
          showUploadSuccessAlert();

          // After successful upload, send the document to the appropriate signatory
          // sendDocumentToSignatory();
          // Set the destination signatory based on the hierarchy
          // setDestinationSignatory(nextSignatory);
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

  // for sweet alert
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
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <div className="py-6 px-9">
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>

              <div className="mb-8">
                <label
                  for="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                  <div>
                    {/* filestack */}
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span
                      onClick={handleClick}
                      className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
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
          </div>
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
