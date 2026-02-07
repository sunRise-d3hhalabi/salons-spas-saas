"use server";

import supabase from "@/config/supabase-config";
import { ISalon_Spa } from "@/interfaces";

export const bookNewAppointment = async (data: any) => {
  try {
    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert([data]);
    if (error) {
      throw new Error(error.message);
    }
    return {
      success: true,
      data: appointment,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAppointmentsByUserId = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAppointmentsByOwnerId = async (ownerId: number) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("owner_id", ownerId);
    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getSalonSpaAvailability = async ({
  date,
  time,
  salonSpaData,
}: {
  date: string;
  time: string;
  salonSpaData: ISalon_Spa;
}) => {
  try {
    // fetch all the appointments for the salon/spa based on the date and time

    const { data: bookedAppointments, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("salon_spa_id", salonSpaData.id)
      .eq("date", date)
      .eq("time", time);

    if (error) {
      throw new Error(error.message);
    }

    if (salonSpaData.max_bookings_per_slot < bookedAppointments.length) {
      return {
        success: false,
        message: "No slots available for the selected date and time",
      };
    }

    return {
      success: true,
      data: {
        availableSlots:
          salonSpaData.max_bookings_per_slot - bookedAppointments.length,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
