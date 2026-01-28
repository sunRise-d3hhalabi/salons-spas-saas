"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner"
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

import { loginUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const roles = [
  {
    id: "r1",
    title: "user",
    text: "User",
  },
  {
    id: "r2",
    title: "salon-spa-owner",
    text: "Salon/Spa Owner",
  },
] as const;

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["user", "salon-spa-owner"]),
});

function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      setLoading(true);
      const response: any = await loginUser(data);
      if (response.success) {
        toast.success("Logged in successfully!");
        Cookies.set("token", response.message);
        Cookies.set("role", data.role);
        router.push(`/${data.role}/dashboard`);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="bg-white p-5 rounded-sm w-[500px]">
        <h1 className="text-xl font-bold! text-gray-600">
          Login to your account
        </h1>
        <hr className="my-7 border-t border-gray-300" />
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email" className="font-bold!">
                    email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password" className="font-bold!">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend className="font-bold!">Role</FieldLegend>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="flex space-x-10"
                  >
                    {roles.map((role) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                        key={role.id}
                      >
                        <RadioGroupItem
                          value={role.title}
                          id={`form-rhf-radiogroup-${role.id}`}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel
                          key={role.id}
                          htmlFor={`form-rhf-radiogroup-${role.id}`}
                        >
                          {role.text}
                        </FieldLabel>
                      </Field>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
          </FieldGroup>
          <div className="flex justify-between items-center">
            <div className="flex gap-5 text-sm">
              Don't hava an account?
              <Link href="/register" className="underline font-bold!">
                Register
              </Link>
            </div>
            <Button type="submit" form="form-rhf-demo" disabled={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
