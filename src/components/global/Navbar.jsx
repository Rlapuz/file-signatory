"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { FaFileSignature } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { NavbarSkeleton } from "../skeleton/NavbarSkeleton";
import { formatDistanceToNow } from "date-fns";
import { BsEmojiWinkFill } from "react-icons/bs";

export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  // State to manage notifications
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts or when the user changes
    const fetchNotifications = async () => {
      try {
        if (session) {
          const res = await fetch(`/api/notification`);

          if (res.ok) {
            const notificationsData = await res.json();
            setNotifications(notificationsData);
            // console.log("Notifications:", notificationsData);
          }
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    // Refresh the notification list every 1 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      fetchNotifications();
    }, 1000);
  }, [session]);

  const deleteNotification = async (notification) => {
    try {
      // Send a request to the API to delete the notification
      const res = await fetch(`/api/notification`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });

      if (res.ok) {
        // Update the local state to reflect the deleted notification
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notification.id
          )
        );
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Function to handle the search query
  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   if (searchQuery.trim() === "") {
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `/api/search?query=${searchQuery}&userId=${session.user._id}`
  //     );

  //     if (res.ok) {
  //       const files = await res.json(); // No need to access 'files' property here
  //       console.log(data);

  //       // Handle the response data directly
  //       if (files.length === 0) {
  //         setNoResults(true);
  //       } else {
  //         setNoResults(false);
  //       }

  //       setSearchResults(files); // Store the array of files in searchResults
  //       setShowSearchResults(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    setNoResults(false);
  };

  const navigateToResult = (result) => {
    // Check if result and result.message are defined
    if (result && result.message) {
      // Assuming result.message is relevant for navigation
      // You might need to implement a specific logic based on the message
      console.log("Navigating based on message:", result.message);
      // Example: router.push(`/some-path/${result.message}`);
      clearSearch();
    } else {
      console.error("Invalid result or result.message:", result);
      // Handle the error or provide a default behavior
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      const res = await fetch("/api/notification/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId: notification._id }),
      });

      // Navigate to the /dashboard/notification route
      router.push(`/dashboard/notifications`);

      if (res.ok) {
        // Update the local state or trigger a refetch of notifications if needed
        // fetchNotifications();
        console.log("Notification status updated to 'read'");

        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n._id === notification._id ? { ...n, status: "read" } : n
          )
        );
      } else {
        console.error("Failed to update notification status");
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <nav className="shadow-md bg-transparent rounded-md w-full">
          {/* search */}
          <div className="flex items-center justify-between py-3 px-6 bg-white">
            <form
              // onSubmit={handleSearch}
              className="w-full max-w-md">
              <div className="relative flex items-center text-gray-400 focus-within:text-gray-600  ">
                <BiSearch className="w-5 h-5 absolute ml-7 md:ml-3 pointer-events-none" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  autoComplete="off"
                  className="w-full pr-3 pl-9 py-1 ml-5 md:ml-0 font-medium placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            {/* profile and notifications*/}
            <div className="relative flex-shrink-0 flex items-center gap-7">
              {/* ThemeSwitcher */}
              {/* <ThemeSwitcher /> */}
              {/* Notifications */}
              <div className="relative">
                <div className="flex items-center justify-center">
                  <Popover
                    placement="bottom"
                    showArrow={true}
                    isOpen={isOpen2}
                    onOpenChange={(open) => setIsOpen2(open)}>
                    <PopoverTrigger>
                      <div>
                        <HiOutlineBellAlert className="w-6 h-6 text-gray-500 cursor-pointer" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                          {
                            notifications.filter(
                              (notification) => notification.status === "unread"
                            ).length
                          }
                        </span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <ScrollShadow className="w-full h-[400px]">
                        <div className=" bg-white  p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-semibold leading-6 text-gray-800">
                              Notifications
                            </p>
                            <div className="cursor-pointer">
                              <RxCross2
                                size={20}
                                // close the popover
                                onClick={() => setIsOpen2(false)}
                              />
                            </div>
                          </div>
                          {/* Notifications */}
                          {notifications.length === 0 ? (
                            <p>No notifications</p>
                          ) : (
                            notifications.map((notification) => (
                              <div
                                key={notification._id}
                                className="w-full p-3 mt-4 bg-violet-100 rounded shadow flex flex-shrink-0">
                                <div className="w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
                                  <FaFileSignature
                                    size={20}
                                    className="text-indigo-700"
                                  />
                                </div>
                                <div className="pl-3 w-full">
                                  <div className="flex items-center justify-between w-full">
                                    <p
                                      className={`text-sm leading-none cursor-pointer ${
                                        notification.status === "unread"
                                          ? "font-bold"
                                          : "font-thin"
                                      }`}
                                      onClick={() =>
                                        handleNotificationClick(notification)
                                      }>
                                      {notification.message}
                                    </p>
                                    <div className="cursor-pointer">
                                      <RxCross2
                                        size={17}
                                        onClick={() =>
                                          deleteNotification(notification)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <p className="text-xs leading-3 pt-1 text-gray-500">
                                    {formatDistanceToNow(
                                      new Date(notification.timestamps),
                                      { addSuffix: true }
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                          {/* Additional content or separators if needed */}
                          <div className="flex items-center justiyf-between">
                            <hr className="w-full" />
                            <p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
                              Thats it for now{" "}
                              <span className="text-center ml-1">
                                <BsEmojiWinkFill
                                  size={17}
                                  className=" text-pink-600"
                                />
                              </span>
                            </p>
                            <hr className="w-full" />
                          </div>
                        </div>
                      </ScrollShadow>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2">
                  <Popover
                    placement="bottom"
                    showArrow={true}
                    isOpen={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}>
                    <PopoverTrigger>
                      <div>
                        {session?.user?.image ? (
                          <div className="rounded-full w-10 h-10 flex justify-center items-center">
                            <Avatar
                              isBordered
                              color="success"
                              src={session?.user?.image}
                            />
                          </div>
                        ) : (
                          <div className="rounded-full w-10 h-10 flex justify-center items-center">
                            <Avatar
                              isBordered
                              color="success"
                              src="/images/cat.jpg"
                            />
                          </div>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <ul className="flex flex-col gap-2">
                          <Link
                            href="/dashboard/profile"
                            className="px-5 hover:bg-violet-300 rounded-md text-center">
                            Profile
                          </Link>
                          <Link
                            href="/setting"
                            className="px-5 hover:bg-violet-300 rounded-md text-center">
                            Settings
                          </Link>

                          <hr />
                          <button
                            onClick={signOut}
                            className="px-5 hover:bg-red-500 rounded-md">
                            Logout
                          </button>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className=" flex-col hidden md:block">
                <h1 className="font-medium">{session?.user?.name}</h1>
                <p className="text-center opacity-50">{session?.user?.role}</p>
              </div>
            </div>
          </div>

          {/* Display search results */}
          {showSearchResults && (
            <div className="bg-gray-50 p-4 mt-2 ml-5 md:w-5/12 rounded-md shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Search Results</h3>
                <IoCloseOutline
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={clearSearch}
                />
              </div>
              {noResults ? (
                <p>No files or folders found.</p>
              ) : (
                <ul>
                  {searchResults.map((result) => (
                    <li
                      key={result._id}
                      className="cursor-pointer"
                      onClick={() => navigateToResult(result)}>
                      {result.filename}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </nav>
      </Suspense>
    </>
  );
};
