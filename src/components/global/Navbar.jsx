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
import { GoDotFill } from "react-icons/go";

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
                    <PopoverContent className="bg-gray-100">
                      <ScrollShadow className="w-full h-[400px]">
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-5">
                            <p className="text-2xl font-semibold leading-6 text-gray-800 ">
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
                                className="w-full max-w-xs p-4 text-gray-900 bg-white hover:bg-blue-200 rounded-lg shadow dark:bg-gray-800 dark:text-gray-300 mb-3 "
                                role="alert">
                                <div className="flex items-center">
                                  <div className="relative inline-block shrink-0">
                                    {notification.sender &&
                                    notification.sender.image ? (
                                      <Image
                                        className="w-12 h-12 rounded-full"
                                        src={notification.sender.image}
                                        alt={`${notification.sender.name}'s image`}
                                        width={12}
                                        height={12}
                                      />
                                    ) : (
                                      <Image
                                        className="w-12 h-12 rounded-full"
                                        src="/images/avatar.jpg" // Default image source when no image is available
                                        alt="Default image"
                                        width={12}
                                        height={12}
                                      />
                                    )}
                                    {notification.sender &&
                                      notification.sender.name && (
                                        <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                                          <svg
                                            className="w-3 h-3 text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 18"
                                            fill="currentColor">
                                            <path
                                              d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                                              fill="currentColor"
                                            />
                                            <path
                                              d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                                              fill="currentColor"
                                            />
                                          </svg>
                                          <span className="sr-only">
                                            Message icon
                                          </span>
                                        </span>
                                      )}
                                  </div>
                                  {/* notification */}
                                  <div
                                    className={`text-sm leading-none cursor-pointer ms-3  ${
                                      notification.status === "unread"
                                        ? " font-extrabold"
                                        : "font-medium"
                                    } `}
                                    onClick={() =>
                                      handleNotificationClick(notification)
                                    }>
                                    {notification.sender &&
                                      notification.sender.name && (
                                        <div className="text-sm  text-gray-900 dark:text-white">
                                          {notification.sender.name}
                                        </div>
                                      )}
                                    <div className="text-sm">
                                      {notification.message}
                                    </div>
                                    <span className="text-xs  text-blue-600 dark:text-blue-500">
                                      {formatDistanceToNow(
                                        new Date(notification.timestamps),
                                        { addSuffix: true }
                                      )}
                                    </span>
                                  </div>

                                  {notification.status === "read" ? (
                                    <div className="cursor-pointer ml-auto">
                                      <RxCross2
                                        size={17}
                                        onClick={() =>
                                          deleteNotification(notification)
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className="cursor-pointer ml-auto">
                                      <GoDotFill
                                        size={20}
                                        className="text-blue-500 mr-2"
                                      />
                                    </div>
                                  )}
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
                              src="/images/avatar.jpg"
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
                <h1 className="font-medium text-center">
                  {session?.user?.name}
                </h1>
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
