"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Login = () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/");
  //   },
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setLoginError("Invalid email or password"); // Set an error message
        return;
      }

      // local route
      // router.replace("/dashboard");

      // deploy route vercel
      router.replace("https://file-signatory.vercel.app/dashboard");
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
                      <div
                        className="relative mb-4"
                        data-te-input-wrapper-init>
                        <input
                          type="text"
                          className="peer block min-h-auto w-full rounded border-0 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput1"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Email
                        </label>
                      </div>

                      {/* Password input */}
                      <div
                        className="relative mb-4"
                        data-te-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Password
                        </label>
                      </div>

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

                        <div>
                          <p>or</p>
                          <Link
                            href="/signin"
                            className=" text-blue-800">
                            Signin
                          </Link>
                        </div>
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
