"use client";
import UserDropdown from "@/components/dashboard/layout/userDropdown";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-10 flex w-full items-center bg-transparent px-4 py-6 md:flex-row md:flex-nowrap md:justify-start">
        <div className="mx-autp flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10">
          {/* Brand */}
          <a
            className="hidden text-sm font-semibold uppercase text-white lg:inline-block"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          {/* User */}
          <ul className="hidden list-none flex-col items-center md:flex md:flex-row">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
