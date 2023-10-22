"use client";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
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
        <Box>
          {status === "authenticated" && (
            <Link href={"/api/auth/signout"}>Logout</Link>
          )}
          {status === "unauthenticated" && (
            <Link href={"/api/auth/signin"}>Login</Link>
          )}
        </Box>
      </nav>
    </>
  );
};

export default NavBar;
