"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/react";

export const Navbar = () => {
  const { data: session } = useSession();

  const [openProfile, setOpenProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Function to handle the search query
  const handleSearch = (e) => {
    e.preventDefault();
    // Perform your search logic here based on the search query
    // Replace the following code with your actual search implementation
    const dummySearchResults = [
      { name: "File 1", path: "/files/file1" },
      { name: "File 2", path: "/files/file2" },
      { name: "File 3", path: "/files/file3" },
    ];
    setSearchResults(dummySearchResults);
    setShowSearchResults(true);
  };

  // Function to clear the search results and query
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };
  return (
    <>
      <nav className="shadow-md bg-transparent rounded-md">
        {/* search */}
        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 border-b space-x-6">
          <form
            onSubmit={handleSearch}
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
            <div>
              <HiOutlineBellAlert className="w-6 h-6" />
            </div>
            <div>
              <div onClick={() => setOpenProfile((prev) => !prev)}>
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
              </div>

              {openProfile && (
                <div className="flex flex-col absolute top-12 -right-1 md:top-30 md:right-24 p-5 w-100 rounded-md bg-white shadow-md">
                  <ul className="flex flex-col gap-2">
                    <Link
                      href="/profile"
                      className="px-5 hover:bg-gray-300 rounded-md ">
                      Profile
                    </Link>
                    <Link
                      href="/setting"
                      className="px-5 hover:bg-gray-300 rounded-md">
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
              )}
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
            <ul>
              {searchResults.map((result) => (
                <li key={result.path}>
                  <Link href={result.path}>{result.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};
