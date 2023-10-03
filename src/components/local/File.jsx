"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const File = () => {
  // State for storing files and handling errors
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState({});
  // const [userId, setUserId] = useState();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // setUserId(session.user._id);
        if (session) {
          const userId = session.user._id; // Get the user's ID from the session
          // console.log("Check userId", userId);
          // console.log("Session", session);

          const res = await fetch(
            `http://localhost:3000/api/file?userId=${userId}`,
            {
              cache: "no-store",
            }
          );
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const filesData = await res.json();

          // Filter files that match the user's ID
          const filteredFiles = filesData.filter(
            (file) => file.userId === userId
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
    try {
      const res = await fetch(`http://localhost:3000/api/file?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const { message } = await res.json();
      alert(message);
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Function to toggle file options (like delete and download)
  const toggleOptions = (id) => {
    setShowOptions((prevShowOptions) => ({
      ...prevShowOptions,
      [id]: !prevShowOptions[id],
    }));
  };

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  return (
    <>
      <h1 className="text-md font-semibold mb-8">Files</h1>
      <div>
        <section className="ml-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 text-sm">
          {files.map((file) => (
            <div key={file._id}>
              <div className="flex flex-col gap-2 border rounded-lg p-2 bg-gray-50 hover:bg-gray-200 box-border h-52 w-52 shadow-md  overflow-hidden">
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BsImage
                      size={20}
                      className=" text-red-900"
                    />
                    <h3 className="ml-0">{file.filename}</h3>
                  </div>
                  <BiDotsVerticalRounded
                    size={20}
                    onClick={() => toggleOptions(file._id)}
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src={file.url}
                    alt="file-preview"
                    height={150}
                    width={200}
                  />
                </div>
              </div>
              {showOptions[file._id] && (
                <div className="flex gap-4 mt-2">
                  <button onClick={() => deleteFile(file._id)}>Delete</button>
                  <Link href={file.url}>
                    <div
                      className="cursor-pointer"
                      target="_blank"
                      download>
                      Download
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
};
