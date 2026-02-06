"use client";
import { Button } from "@/components/ui/button";
import { ISalon_Spa } from "@/interfaces";
import dayjs from "dayjs";
import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Checkout({ salonSpa }: { salonSpa: ISalon_Spa }) {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState("09:00");

  //temprary
  const timeOptions = [
    { label: "9:00 AM", value: "09:00" },
    { label: "10:00 AM", value: "10:00" },
    { label: "11:00 AM", value: "11:00" },
    { label: "12:00 PM", value: "12:00" },
  ];

  return (
    <div className="border border-gray-400 flex flex-col gap-5 p-5">
      <div className="flex flex-col gap-1">
        <span className="text-sm">Select Date</span>
        <DatePicker
          selected={date}
          onChange={(value: any) => setDate(value as Date)}
          className="border border-gray-700 p-2"
          minDate={new Date()}
          filterDate={(date) => {
            const day = dayjs(date).format("dddd").toLowerCase();
            return salonSpa.working_days.includes(day);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm">Select Time</span>

        <select
          name=""
          id=""
          className="border border-gray-700 p-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {timeOptions.map((time) => (
            <option key={time.value} value={time.value}>
              {time.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <Button variant={"outline"}>Cancel</Button>
        <Button className="ml-3">Book Appointment</Button>
      </div>
    </div>
  );
}

export default Checkout;
