"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export const Retrieve = () => {
  const [deletedFiles, setDeletedFiles] = useState([]);
  const { data: session } = useSession(); // Get the session data

  useEffect(() => {
    // Fetch deleted files for the logged-in user
    const fetchDeletedFiles = async () => {
      try {
        if (session) {
          const userId = session.user._id; // Use the user's ID from the session

          // Replace the URL with your API endpoint to fetch deleted files for the specific user
          const res = await fetch(
            // deploy route vercel
            `https://file-signatory.vercel.app/api/file/deleted?userId=${userId}`
            // local route
            // `http://localhost:3000/api/file/deleted?userId=${userId}`
          );

          const deletedFile = await res.json();

          // Filter files that match the user's ID
          const filteredDeletedFile = deletedFile.filter(
            (file) => file.userId === userId
          );

          setDeletedFiles(filteredDeletedFile);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeletedFiles();
  }, [session]);

  const restoreDeletedFile = async (id) => {
    try {
      // Your code to send a PUT request to restore the file here
      // deploy route vercel
      const res = await fetch(
        `https://file-signatory.vercel.app/api/file/restore/${id}`,
        {
          method: "PUT",
        }
      );
      // local route
      // const res = await fetch(`http://localhost:3000/api/file/restore/${id}`, {
      //   method: "PUT",
      // });

      if (res.ok) {
        console.log("File restored successfully!");
        setDeletedFiles((prevDeletedFiles) =>
          prevDeletedFiles.filter((file) => file._id !== id)
        );
        // You can add additional logic here, such as updating UI or showing notifications.
      } else {
        console.error("Failed to restore file.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Deleted Files</h1>
      {deletedFiles.length === 0 ? (
        <p>No deleted files found.</p>
      ) : (
        <ul>
          {deletedFiles.map((file) => (
            <li key={file._id}>
              {file.filename}
              <button onClick={() => restoreDeletedFile(file._id)}>
                Restore
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
