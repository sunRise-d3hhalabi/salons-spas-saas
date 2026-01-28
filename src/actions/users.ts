"use server";

import supabase from "@/config/supabase-config";
import { success } from "zod";
import bcrypt from "bcryptjs";

export const registerNewUser = async ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    //check if the user already exists using email
    const { data, error } = await supabase
      .from("user-profiles")
      .select("email")
      .eq("email", email);
    if (data && data.length > 0) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    //hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUserObj = {
      name,
      email,
      password: hashedPassword,
      role,
      is_active: true,
    };

    const { data: userData, error: userError } = await supabase
      .from("user-profiles")
      .insert([newUserObj]);

    if (userError) {
      return {
        success: false,
        message: userError.message ,
      };
    }

    return {
      success: true,
      message: "User registered successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
