"use client";

import { Image } from "@nextui-org/react";
import React from "react";
import { FaUserTie } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

export const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-5 mb-10">
      {/*  */}
      <div className="flex flex-col justify-center items-center md:flex-row gap-10">
        {/* Profile content */}
        <div className="h-80 w-3/4 md:h-80 md:w-2/5 lg:w-1/4 rounded-md shadow-md p-5  bg-gray-50">
          <div className="flex justify-center items-center">
            <div className="h-20 w-20 flex justify-center items-center rounded-full border-2 ">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="profile image"
                  height={80}
                  width={80}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src="/images/cat.jpg"
                  alt="profile image"
                  height={80}
                  width={80}
                  className="rounded-full "
                />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mt-2">
            {/* name */}
            <h1 className="font-semibold text-md">{session?.user?.name}</h1>
            {/* campus */}
            <h1 className="font-semibold text-sm opacity-75 mb-5">
              Meneses Campus
            </h1>
            {/* role */}
            <h3 className="font-semibold opacity-50 mt-3 mb-6">
              {session?.user?.role}
            </h3>
            {/* username */}
            <hr className="text-black w-full flex justify-center my-3" />
            <div className="flex items-center gap-2 text-md">
              <FaUserTie />
              <h1 className="font-bold text-sm">Username</h1>
              <h1 className="text-blue-500 opacity-75 text-sm">
                {session?.user?.name}.{session?.user?.role}
              </h1>
            </div>
            <hr className="text-black w-full flex justify-center my-3" />
          </div>
        </div>

        {/* profile end */}
        {/* Program */}
        <div className=" hidden md:block md:h-80 md:w-3/4 md:basis-3/4 p-2 rounded-md shadow-md  bg-gray-50"></div>
      </div>
      {/* about */}
      <div className=" flex justify-center items-center md:justify-start font-semibold">
        <div className="h-96 w-3/4 md:h-96 md:w-2/5 lg:w-1/4 rounded-md shadow-md bg-gray-50">
          <div className=" bg-[#6A64F1] py-1 px-2 w-full border-b-2 border-black">
            <h1 className="text-white">About</h1>
          </div>
          {/* ID */}
          <div className="flex flex-col p-2 mt-1">
            <div className="flex justify-center gap-2">
              <HiIdentification size={25} />
              <div className="flex flex-col justify-end">
                <h1>Employee ID</h1>
                <p className="opacity-50 text-sm  mt-1">
                  {" "}
                  {session?.user?.employeeID}
                </p>
              </div>
            </div>
            <hr className="text-black w-full flex justify-center my-3" />
          </div>
          {/* Email */}
          <div className="flex flex-col p-2">
            <div className="flex justify-center gap-2">
              <IoIosMail size={25} />
              <h1>Email</h1>
            </div>
            <div className="whitespace-normal">
              <p className="opacity-50 text-sm  mt-1 text-center">
                {session?.user?.email}
              </p>
            </div>
            <hr className="text-black w-full flex justify-center my-3" />
          </div>
          {/* Contact */}
          <div className="flex flex-col p-2 mt-1">
            <div className="flex justify-center gap-2">
              <BsFillTelephoneFill size={20} />
              <div className="flex flex-col justify-end">
                <h1>Contact</h1>
                <p className="opacity-50 text-sm  mt-1">
                  {session?.user?.contacts}
                </p>
              </div>
            </div>
            <hr className="text-black w-full flex justify-center my-3" />
          </div>
          {/* update button */}
          <div className="flex justify-center items-center">
            <button className="bg-[#6A64F1] hover:bg-blue-700 text-white px-5 py-1 rounded-md">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
