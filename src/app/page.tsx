import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col gap-5 p-10">
      <h1>HomePage</h1>
      <Button className="w-max">Shadcn Button</Button>
      <Input placeholder="Enter your name" className="w-max" />
    </div>
  );
}

export default HomePage;
