"use client";
import Link from "next/link";
import { BsRobot } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface NavItemProps {
  name: string;
  path: string;
}

function NavItem({ name, path }: NavItemProps) {
  return (
    <li>
      <Link href={path}>{name}</Link>
    </li>
  );
}

export default function Navbar() {
  const router = useRouter();

  async function logout() {
    localStorage.removeItem("token");

    alert("Sessão encerrada");
    router.push("/login");
  }

  return (
    <div className="navbar bg-base-100 border-b lg:px-6">
      <div className="navbar-start">
        <Link
          href="/"
          className="flex items-center gap-4 px-4 normal-case text-xl font-semibold cursor-pointer"
        >
          <BsRobot className="hidden md:block text-primary hover:scale-110 transition-all duration-200 ease-out text-[2.5rem]" />
          <span>UFC Autobots</span>
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <NavItem path="/change-password" name="Alterar senha" />
          <li>
            <a onClick={() => logout()}>Encerrar sessão</a>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80"
          >
            <NavItem path="/change-password" name="Alterar senha" />
            <li>
              <a onClick={() => logout()}>Encerrar sessão</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
