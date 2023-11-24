"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const session = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setLoginError("Invalid email or password");
        return;
      }

      // Wait for the session to be updated
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout as needed

      // Fetch the updated session
      const updatedSession = await getSession();

      // Check if the user has the "ADMIN" role
      if (updatedSession?.user?.role === "ADMIN") {
        // Redirect to the admin page
        router.replace("/admin");
      } else {
        // Redirect to the dashboard page
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
                        src="/images/Meneses.png"
                        alt="logo"
                        width={90}
                        height={90}
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Bulacan State University
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-8">Please login to your account</p>
                      {/* Username input */}
                      <div className="relative">
                        <input
                          type="text"
                          id="email"
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                          for="email"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                          Email
                        </label>
                      </div>

                      <br />

                      {/* Password input */}
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                          for="password"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                          Password
                        </label>
                      </div>
                      <br />

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] lot"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light">
                          Log in
                        </button>
                        {loginError && (
                          <p className="text-red-500 mt-4">{loginError}</p>
                        )}

                        {/* Forgot password link */}
                        {/* <a href="#!">Forgot password?</a> */}

                        {/* uncomment for google provider signin */}
                        {/* <div>
                          <p>or</p>
                          <Link
                            href="/signin"
                            className=" text-blue-800">
                            Signin
                          </Link>
                        </div> */}
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none lot">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold text-center">
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
