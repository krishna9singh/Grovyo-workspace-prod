"use client";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { memo } from "react";

export default function MainLayout({ children }) {
  const MemorizedNav = memo(NavBar);
  const MemorizedHeader = memo(Header);
  return (
    <div>
      <div className=" bg-[#f1f1f1] vs:max-sm:h-[95.5vh] duration-75 h-screen w-screen flex overflow-auto scrollbar-hide ">
        <div className="bg-red-400 h-full z-10">
          <MemorizedNav />
        </div>
        <div className="w-full bg-[#f9f9f9] h-full sm:p-4 ">
          <div className="sm:hidden fixed w-full shadow-sm z-10">
            <MemorizedHeader />
          </div>
          <div className="w-full h-full rounded-2xl sm:bg-white z-0 pn:max-sm:py-16 overflow-auto scrollbar-hide">
            <div className="pn:max-sm:hidden">
              <MemorizedHeader />
            </div>
            <div className="w-full px-10 pt-2 pn:max-sm:hidden">
              <div className="h-[2px] w-full bg-[#ebebeb] rounded-md"></div>
            </div>
            <div className="z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
