"use client";

import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoIosMail } from "react-icons/io";
import { HiIdentification } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import { BsPeopleFill } from "react-icons/bs";

export const DashboardAdmin = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="max-w-4xl flex items-center h-auto  flex-wrap mx-auto my-32 lg:mt-auto">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 mt-auto">
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://cdn.filestackcontent.com/44rSNfeQeeJn0eBQNU7g')",
              }}></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-center">
              {session?.user?.name}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 lg:w-full pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-medium flex items-center justify-center lg:justify-start text-center">
              <span className="h-4 fill-current text-green-700 pr-4">
                <IoIosMail
                  size={22}
                  className="text-center"
                />
              </span>
              {""}
              {session?.user?.email}
            </p>
            <p className="pt-4 text-base font-medium flex items-center justify-center lg:justify-start text-center">
              <span className="h-4 fill-current text-green-700 pr-4">
                <HiIdentification
                  size={20}
                  className="text-center"
                />
              </span>
              {""}

              {session?.user?.employeeId}
            </p>
            <p className="pt-4 text-base font-medium flex items-center justify-center lg:justify-start text-center">
              <span className="h-4 fill-current text-green-700 pr-4">
                <BsFillTelephoneFill
                  size={22}
                  className="text-center"
                />
              </span>
              {""}

              {session?.user?.contact}
            </p>
            <p className="pt-4 text-base font-medium flex items-center justify-center lg:justify-start text-center ">
              <span className="h-4 fill-current text-green-700 pr-4">
                <CgOrganisation
                  size={20}
                  className="text-center"
                />
              </span>
              {""}
              Meneses Campus
            </p>
            <p className="pt-4 text-base font-medium flex items-center justify-center lg:justify-start text-center ">
              <span className="h-4 fill-current text-green-700 pr-4">
                <BsPeopleFill
                  size={20}
                  className="text-center"
                />
              </span>
              {""}
              {session?.user?.role}
            </p>
            <h1 className="pt-8 font-medium">
              Welcome back{" "}
              <span className="text-blue-500 text-xl font-bold">
                {session?.user.name}!
              </span>
            </h1>

            <div className="pt-12 pb-8 mx-auto">
              <Link
                href="/dashboard/profile"
                color="secondary"
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md">
                Update
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.image ? (
          <div className="w-full lg:w-2/5">
            <Image
              src={session?.user?.image}
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              width={400}
              height={750}
              alt="..."
            />
          </div>
        ) : (
          <div className="w-full lg:w-2/5">
            <Image
              src="/images/avatar.jpg"
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              width={400}
              height={750}
              alt="..."
            />
          </div>
        )}
      </div>
    </>
  );
};
