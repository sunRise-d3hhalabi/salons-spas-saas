import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IUser } from "@/interfaces";
import {
  Calendar,
  LayoutDashboard,
  List,
  MessageCircle,
  User2,
} from "lucide-react";

interface MenuItemsProps {
  openMenuItems: boolean;
  setOpenMenuItems: (openMenuItems: boolean) => void;
  user: IUser;
}

function MenuItems({ openMenuItems, setOpenMenuItems, user }: MenuItemsProps) {
  let userMenuItems = [
    {
      title: "Dashboard",
      route: "/user/dashboard",
      icon: <LayoutDashboard size={13} />,
    },
    {
      title: "Schedule Appointment",
      route: "/user/schedule-appointment",
      icon: <Calendar size={13} />,
    },
    {
      title: "My Appointments",
      route: "/user/my-appointments",
      icon: <List size={13} />,
    },
    {
      title: "Profile",
      route: "/user/profile",
      icon: <User2 size={13} />,
    },
  ];

  let salonSpaOwnerMenuItems = [
    {
      title: "Dashboard",
      route: "/salon-spa-owner/dashboard",
      icon: <LayoutDashboard size={13} />,
    },
    {
      title: "Register/View Salon/Spa",
      route: "/salon-spa-owner/salons-spas",
      icon: <List size={13} />,
    },
    {
      title: "Appointments",
      route: "/salon-spa-owner/appointments",
      icon: <Calendar size={13} />,
    },
    {
      title: "Feedback / Reviews",
      route: "/salon-spa-owner/feedback-reviews",
      icon: <MessageCircle size={13} />,
    },
    {
      title: "Profile",
      route: "/salon-spa-owner/profile",
      icon: <User2 size={13} />,
    },
  ];

  const menuItemsToRender =
    user.role === "user" ? userMenuItems : salonSpaOwnerMenuItems;

  return (
    // <Sheet open={openMenuItems} onOpenChange={() => setOpenMenuItems(false)}>
    <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
      <SheetContent className="lg:min-w-[350px]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default MenuItems;
