"use client";

import { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useSupabase } from "@/components/common/supabase-provider";
import { notify } from "@/components/common/notify";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const { supabase } = useSupabase();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const SignOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      notify("error", "")
    } else {
      notify("success", "Successful logout")
    }

  };
  return (
    <>
      <a
        className="block text-blueGray-500"
        href="#pablo"
        ref={ btnDropdownRef }
        onClick={ (e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        } }
      >
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 text-sm text-white rounded-full bg-blueGray-200">
            <img
              alt="..."
              className="w-full align-middle border-none rounded-full shadow-lg"
              src="/img/team-1-800x800.jpg"
            />
          </span>
        </div>
      </a>
      <div
        ref={ popoverDropdownRef }
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "z-50 float-left min-w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <a
          href="SignOut"
          className={
            "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-blueGray-700"
          }
          onClick={ (e) => {
            e.preventDefault();
            SignOutUser();
          } }
        >
          Sign out
        </a>
        <a
          href="profile"
          className={
            "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-blueGray-700"
          }
          onClick={ (e) => e.preventDefault() }
        >
          View profile
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
