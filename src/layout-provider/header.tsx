import { IUser } from "@/interfaces";
import { Menu } from "lucide-react";
import React from "react";
import MenuItems from "./menu-items";

function Header({ user }: { user: IUser }) {
  const [openMenuItems, setOpenMenuItems] = React.useState(false);
  return (
    <div className="flex justify-between items-center bg-black! text-white py-5 px-5">
      <h1 className="text-2xl font-bold!">S . H . E . Y</h1>

      <div className="flex gap-5 items-center">
        <h1 className="text-sm! text-white">{user?.name}</h1>
        <Menu
          className="text-orange-500 cursor-pointer"
          size={15}
          onClick={() => setOpenMenuItems(true)}
        />
      </div>

      {openMenuItems && (
        <MenuItems
          openMenuItems={openMenuItems}
          setOpenMenuItems={setOpenMenuItems}
          user={user}
        />
      )}
    </div>
  );
}

export default Header;
