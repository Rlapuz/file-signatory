"use client";

import { RxCross2 } from "react-icons/rx";
import { PickerOverlay } from "filestack-react-18";
import { useState, useEffect } from "react";

export const Filestack = () => {
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
        const { handle } = res.filesUploaded[0];
        setUploadedFileHandle(handle);
        const { filename, size, url, mimetype } = res.filesUploaded[0];

        const response = await fetch(
          // local route
          // "http://localhost:3000/api/file",
          // deploy route vercel
          "https://file-signatory.vercel.app/api/file",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filename, size, url, mimetype }),
          }
        );
        // console.log("Response", response);
        if (response.ok) {
          console.log("File uploaded successfully!");
          setUploadedFile({ filename, size, url, mimetype });
          setHasUploadedFile(true); // Set the hasUploadedFile state to true
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
  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form
            className="py-6 px-9"
            method="POST">
            <div className="mb-5">
              <label
                for="signatory"
                className="mb-3 block text-base font-medium text-[#07074D]">
                Send files to this Signatory:
              </label>
              <input
                type="text"
                name="text"
                id="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="message"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

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
                      {uploadedFile.filename}
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

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Send File
              </button>
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
