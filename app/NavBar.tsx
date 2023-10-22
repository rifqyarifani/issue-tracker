"use client";
import { Avatar, Box, Container, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  return (
    <>
      <Container>
        <nav className=" flex border-b mb-5 px-5 h-14 items-center justify-between">
          <div className=" flex items-center space-x-6">
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
                    currentPath === "/issues"
                      ? "text-zinc-900"
                      : "text-zinc-500"
                  }`}
                  href="/issues"
                >
                  Issues
                </Link>
              </li>
            </ul>
          </div>

          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback={"?"}
                    size={"3"}
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={"2"}>{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </nav>
      </Container>
    </>
  );
};

export default NavBar;
