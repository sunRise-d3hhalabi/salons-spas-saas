"use client";
import {
  bookNewAppointment,
  getSalonSpaAvailability,
} from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { ISalon_Spa } from "@/interfaces";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/store/users-global-store";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

function Checkout({ salonSpa }: { salonSpa: ISalon_Spa }) {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState("09:00");
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [availableSlots, setAvailableSlots] = React.useState(0);
  const [availabilityError, setAvailabilityError] = React.useState("");

  const router = useRouter();

  const timeOptions = [];

  const sampleDate = dayjs(date).format("YYYY-MM-DD");

  let currentSlot = dayjs(`${sampleDate} ${salonSpa.start_time}`);
  const endTime = dayjs(`${sampleDate} ${salonSpa.end_time}`);

  while (dayjs(currentSlot).isBefore(endTime)) {
    timeOptions.push({
      label: dayjs(currentSlot).format("HH:mm"),
      value: dayjs(currentSlot).format("HH:mm"),
    } as any);

    currentSlot = dayjs(currentSlot).add(salonSpa.slot_duration, "minute");
  }

  // filter the slots which are in the break time (Assigment 1)

  const bookAppointmentHandler = async () => {
    try {
      setLoading(true);
      const payload = {
        user_id: user?.id!,
        salon_spa_id: salonSpa.id,
        owner_id: salonSpa.owner_id,
        date: dayjs(date).format("YYYY-MM-DD"),
        time,
        status: "booked",
      };

      const response = await bookNewAppointment(payload);
      if (response.success) {
        toast.success("Appointment booked successfully");
        router.push("/user/appointments");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response: any = await getSalonSpaAvailability({
        date: dayjs(date).format("YYYY-MM-DD"),
        salonSpaData: salonSpa,
        time,
      });

      if (response.success) {
        setAvailableSlots(response.data?.availableSlots);
      } else {
        setAvailableSlots(0);
        setAvailabilityError(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    if (date && time) {
      setAvailableSlots(0);
      setAvailabilityError("");
      fetchAvailableSlots();
    }
  }, [date, time]);

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

      {availabilityError && (
        <span className="text-red-700 text-sm">{availabilityError}</span>
      )}

      {availableSlots > 0 && (
        <span className="text-green-700 text-sm">
          {availableSlots} slots available
        </span>
      )}

      <div className="flex justify-end">
        <Button
          variant={"outline"}
          disabled={loading}
          onClick={() => router.push("/user/schedule-appointment")}
        >
          Cancel
        </Button>
        <Button
          className="ml-3"
          disabled={loading || availableSlots === 0}
          onClick={bookAppointmentHandler}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}

export default Checkout;
