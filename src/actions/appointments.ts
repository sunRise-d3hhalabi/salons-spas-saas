"use server";

import supabase from "@/config/supabase-config";

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
