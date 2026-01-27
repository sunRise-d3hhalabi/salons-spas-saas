"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-gray-200 py-5 px-20">
        <h1 className="text-2xl font-bold! text-black">S . H . E . Y .</h1>
        <Button>Login</Button>
      </div>
      <div className="bg-white mt-20 lg:grid-cols-2 grid-cols-1 px-20 min-h-[70vh] items-center grid gap-10">
        <div className="col-span-1 flex flex-col gap-5">
          {/* <div className=""> */}
          <h1 className="text-2xl font-bold!">Welcome to SHEY-SALON-SPA</h1>
          <p className="text-sm text-gray-600">
            SHEY-SALON-SPA is a platform that connects barbers with customers.
            It helps customers find barbers near them and book appointments with
            them.
          </p>
          <Button className="w-max">Find a Salon</Button>
          {/* </div> */}
        </div>
        <div className="col-span-1 flex justify-end items-center">
          {/* <img
            src="https://img.freepik.com/premium-vector/man-hair-salon-logo-vector-illustration-white-background_1023984-42155.jpg"
            className="h-96"
          /> */}
          <div className="h-60 w-60 lg:h-80 lg:w-80 relative">
            <Image
              src="https://img.freepik.com/premium-vector/man-hair-salon-logo-vector-illustration-white-background_1023984-42155.jpg"
              fill
              alt="Salon Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
