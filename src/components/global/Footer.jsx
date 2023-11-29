import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <h1 className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <Image
            src="/images/Meneses.png"
            alt={"Meneses logo"}
            width={50}
            height={50}
          />
          <span className="ml-3 text-xl">Meneses Campus</span>
        </h1>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2023 Raymund Lapuz —
          <Link
            href="https://github.com/Rlapuz"
            className="text-gray-500 ml-1"
            target="_blank"
            rel="noopener noreferrer">
            @raymund
          </Link>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link
            className="text-gray-400"
            href="https://www.facebook.com/raymund.lapuz.p/">
            <span>
              <FaFacebook size={20} />
            </span>
          </Link>
          <Link
            className="ml-3 text-gray-400"
            href="https://twitter.com/lapuz_raymund">
            <FaXTwitter size={20} />
          </Link>
          <Link
            className="ml-3 text-gray-400"
            href="https://www.instagram.com/lapuzraymund/">
            <FaInstagram size={20} />
          </Link>
          <Link
            className="ml-3 text-gray-400"
            href="https://www.linkedin.com/in/raymund-lapuz-b7290b242/">
            <BsLinkedin size={20} />
          </Link>
        </span>
      </div>
    </footer>
  );
};
