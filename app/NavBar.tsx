"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  return (
    <>
      <nav className=" flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className=" flex space-x-6">
          <li>
            <Link
              className={` hover:text-zinc-800 transition-colors ${
                currentPath === "/" ? "text-zinc-900" : "text-zinc-500"
              }`}
              href="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-zinc-800 transition-colors ${
                currentPath === "/issues" ? "text-zinc-900" : "text-zinc-500"
              }`}
              href="/issues"
            >
              Issues
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
