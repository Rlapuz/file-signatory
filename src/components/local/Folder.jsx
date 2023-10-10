"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFolder } from "react-icons/fa";
import { useSession } from "next-auth/react";

export const Folder = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState({});

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        if (session) {
          const userId = session.user._id; // Get the user's ID from the session
          const res = await fetch(
            // local route
            `http://localhost:3000/api/folder?userId=${userId}`,
            // deploy route vercel
            // `https://file-signatory.vercel.app/api/folder?userId=${userId}`,
            {
              cache: "no-store",
            }
          );
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
    try {
      const res = await fetch(
        // local route
        `http://localhost:3000/api/folder?id=${id}`,

        // deploy route vercel
        // `https://file-signatory.vercel.app/api/folder?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const { message } = await res.json();
      alert(message);
      // After successful delete, update the folders list by filtering out the deleted folder
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const toggleOptions = (id) => {
    setShowOptions((prevShowOptions) => ({
      ...prevShowOptions,
      [id]: !prevShowOptions[id], // Toggle the options display for the clicked folder
    }));
  };

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  return (
    <>
      {folders.map((folder) => (
        <div key={folder._id}>
          <div className="flex justify-between items-center gap-4 border rounded-lg shadow-md px-3 py-4 bg-gray-50 hover:bg-gray-200">
            <Link
              href={`/view-files/${folder._id}`}
              className="flex items-center gap-2">
              <FaFolder size={20} />
              <h3 className="ml-0">{folder.name}</h3>
            </Link>
            <BiDotsVerticalRounded
              size={20}
              onClick={() => toggleOptions(folder._id)}
            />
          </div>

          {showOptions[folder._id] && ( // Display options only if showOptions[id] is true
            <div className="flex gap-4 mt-2">
              <button onClick={() => deleteFolder(folder._id)}>Delete</button>
              <button>Download</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
