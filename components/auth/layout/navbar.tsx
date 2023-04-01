"use client";

import { useState } from "react";
import Link from "next/link";

// components

export default function Navbar(props: any) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="navbar-expand-lg absolute top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-white"
            >
              Rather School
            </Link>
          </div>
          <div
            className={
              "flex-grow items-center bg-white lg:flex lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="flex items-center">{/*  <PagesDropdown /> */}</li>
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-blueGray-700 lg:py-2 lg:text-white lg:hover:text-blueGray-200"
                  href="#"
                  target="_blank"
                >
                  <i className="fab fa-facebook leading-lg text-lg text-blueGray-400 lg:text-blueGray-200 " />
                  <span className="ml-2 inline-block lg:hidden">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-blueGray-700 lg:py-2 lg:text-white lg:hover:text-blueGray-200"
                  href="#"
                  target="_blank"
                >
                  <i className="fab fa-twitter leading-lg text-lg text-blueGray-400 lg:text-blueGray-200 " />
                  <span className="ml-2 inline-block lg:hidden">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-blueGray-700 lg:py-2 lg:text-white lg:hover:text-blueGray-200"
                  href="#"
                  target="_blank"
                >
                  <i className="fab fa-github leading-lg text-lg text-blueGray-400 lg:text-blueGray-200 " />
                  <span className="ml-2 inline-block lg:hidden">Star</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
