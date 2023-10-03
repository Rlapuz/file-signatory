"use client";

import { signOut } from "next-auth/react";
import { RiLogoutBoxLine } from "react-icons/ri";

export const Logout = () => {
  return (
    <>
      <div className="whitespace-pre px-3 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden">
        <button
          onClick={() => signOut()}
          className="link hover:bg-red-500">
          <RiLogoutBoxLine
            size={23}
            className="min-w-max"
          />
          Logout
        </button>
      </div>
    </>
  );
};
