import React, { useEffect, useState } from "react";
import Workspaceicon from "../assets/Logo";
import Notification from "../assets/icons/Notify";
import WalletIcon from "../assets/icons/WalletIcon";
import Link from "next/link";

function Header() {
  const [note, setNote] = useState(true);
  const [prof, setProf] = useState(true);
  const [pic, setPic] = useState();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");

  const fetc = async () => {
    const p = await sessionStorage.getItem("pic");
    const n = await sessionStorage.getItem("fullname");
    setPic(p);
    setName(n);
    setLoad(true);
  };

  useEffect(() => {
    fetc();
  }, []);

  return (
    <div className="flex items-center sm:pt-2 py-2 vs:max-sm:bg-white justify-between px-6 w-full vs:max-sm:px-2">
      <div className="sm:hidden">
        <Workspaceicon />
      </div>
      <div className="text-[25px] font-semibold vs:max-sm:hidden">
        Hi, {name}
      </div>

      <div className="flex justify-center items-center space-x-2">
        <Link
          href="/main/wallet"
          className="h-10 w-10 cursor-pointer bg-white flex justify-center items-center rounded-[18px] shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
        >
          <WalletIcon />
        </Link>

        <div className="">
          {pic !== null ? (
            <img
              src={pic}
              alt="dp"
              height={100}
              width={100}
              className="h-10 w-10 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
            />
          ) : (
            <div
              onClick={() => setProf(!prof)}
              className="h-10 w-10 bg-red-600 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
