"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export const page = () => {
  return (
    <section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="pt-6 md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <Image
                        className="mx-auto"
                        src="/bsu_logo.png"
                        alt="logo"
                        width={90}
                        height={90}
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Bulacan State University
                      </h4>
                    </div>

                    {/* Sign in form */}
                    <div className=" max-h-fit flex justify-center mb-16">
                      <button
                        className="py-3 px-4 border border-bg-white rounded-md hover:bg-slate-400 font-medium"
                        // onClick={handleSignIn}
                        onClick={() =>
                          signIn("google", { callbackUrl: "/dashboard" })
                        }>
                        Sign in with google
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none lot">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Meneses Campus
                    </h4>
                    <p className="text-sm text-justify">
                      Welcome to Meneses Campus, your school and a satellite of
                      Bulacan State University. We take pride in providing
                      quality education, fostering a supportive learning
                      environment, and nurturing the growth of our students.
                      With a focus on academic excellence and a wide range of
                      extracurricular activities, Meneses Campus aims to prepare
                      you for a successful future. Join our vibrant community
                      and embark on a journey of knowledge and personal
                      development. Discover your potential at Meneses Campus,
                      where possibilities are endless.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
