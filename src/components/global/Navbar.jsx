"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { NavbarSkeleton } from "../skeleton/NavbarSkeleton";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle the search query
  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   if (searchQuery.trim() === "") {
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/search?query=${searchQuery}&userId=${session.user._id}`
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
    // Use router.push to navigate to the selected result
    router.push(result);
    clearSearch();
  };

  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <nav className="shadow-md bg-transparent rounded-md w-full">
          {/* search */}
          <div className="flex items-center justify-between py-3 px-6 bg-gray-50 ">
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
              {/* novu notification */}
              <div className="">
                <NovuProvider
                  subscriberId={"6524074072a8166dd082c055"}
                  applicationIdentifier={"mgMhy5mSP-w6"}>
                  <PopoverNotificationCenter colorScheme={"light"}>
                    {({ unseenCount }) => (
                      <NotificationBell unseenCount={unseenCount} />
                    )}
                  </PopoverNotificationCenter>
                </NovuProvider>
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
