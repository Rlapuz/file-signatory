"use client";

export const Notif = () => {
  return (
    <div>
      <h1>Notifications</h1>
    </div>
  );
};

export default Notif;
/**
 * ? unfinished notification component
 */
// "use client";

// import { useEffect, useState } from "react";

// export const Notif = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     // Fetch notifications and files here, e.g., using a fetch request to your API.

//     // Update the `notifications` and `files` states with the fetched data.

//     // local route
//     fetch("/api/notification")
//       .then((res) => res.json())
//       .then((data) => setNotifications(data));
//   }, []);

//   return (
//     <div>
//       <h1>Notifications</h1>
//       {/* Display notifications here */}
//       <ul>
//         {notifications.map((notification) => (
//           <li key={notification.id}>{notification.message}</li>
//         ))}
//       </ul>

//       <h2>Files</h2>
//       {/* Display files here */}
//       <ul>
//         {files.map((file) => (
//           <li key={file.id}>{file.filename}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notif;
