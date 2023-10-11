"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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

export const NavbarAdmin = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /** 
     * ? Unfinished search feature
    // Function to handle the search query
    const handleSearch = async (e) => {
      e.preventDefault();
  
      if (searchQuery.trim() === "") {
        return;
      }
  
      try {
        const res = await fetch(
          `http://localhost:3000/api/file/search?query=${searchQuery}`
        );
        if (res.ok) {
          const data = await res.json();
  
          // Filter the search results to include only files and folders that match the userId
          const filteredFiles = data.files.filter(
            (file) => file.userId === session.user._id
          );
          const filteredFolders = data.folders.filter(
            (folder) => folder.userId === session.user._id
          );
  
          const results = {
            files: filteredFiles,
            folders: filteredFolders,
          };
  
          if (results.files.length === 0 && results.folders.length === 0) {
            setNoResults(true); // Set noResults to true when no results are found
          } else {
            setNoResults(false); // Reset noResults if there are results
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const clearSearch = () => {
      setSearchQuery("");
      setSearchResults([]);
      setShowSearchResults(false);
      setNoResults(false);
    };
  
    const navigateToResult = (path) => {
      <Link href={`/file/${result._id}`}>
        <h1>{result.name}</h1>
      </Link>;
      clearSearch();
    };
  
    */

  return (
    <>
      <nav className="shadow-md bg-transparent rounded-md w-full">
        {/* search */}
        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 border-b space-x-6">
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
            <div>
              <HiOutlineBellAlert className="w-6 h-6" />
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
                          href="/admin/profile"
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

        {/* 
          /** 
           * ? Unfinished search feature
          Display search results
          {showSearchResults && (
            <div className="bg-gray-50 p-4 mt-2 ml-5 md:w-5/12 rounded-md shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Search Results</h3>
                <IoCloseOutline
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={clearSearch}
                />
              </div>
              {noResults ? ( // Display a message when no results are found
                <p>No files or folders found.</p>
              ) : (
                <ul>
                  {searchResults.files.map((result) => (
                    <li
                      key={result._id}
                      className="cursor-pointer"
                      onClick={() =>
                        navigateToResult(
                          `http://localhost:3000/api/file/${result._id}`
                        )
                      }>
                      {result.filename}
                    </li>
                  ))}
                  {searchResults.folders.map((result) => (
                    <li
                      key={result._id}
                      className="cursor-pointer"
                      onClick={() =>
                        navigateToResult(
                          `http://localhost:3000/api/folder/${result._id}`
                        )
                      }>
                      {result.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )} */}
      </nav>
    </>
  );
};
