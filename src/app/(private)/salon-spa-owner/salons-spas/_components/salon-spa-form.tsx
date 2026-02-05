"use client";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { workingDays } from "@/constants";
import { useRouter } from "next/navigation";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/store/users-global-store";
import { addNewSalonSpa, editSalonSpaById } from "@/actions/salon-spas";

interface SalonFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}

const offerStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

function SalonSpaForm({ initialValues, formType }: SalonFormProps) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    zip: z.number(),
    working_days: z.array(z.string().nonempty()),
    start_time: z.string().nonempty(),
    end_time: z.string().nonempty(),
    break_start_time: z.string().nonempty(),
    break_end_time: z.string().nonempty(),
    min_service_price: z.number(),
    max_service_price: z.number(),
    offer_status: z.string().nonempty(),
    slot_duration: z.number(),
    max_bookings_per_slot: z.number(),
    location_name: z.string(),
    latitude: z.string(),
    longitude: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: 0,
      working_days: [],
      start_time: "",
      end_time: "",
      break_start_time: "",
      break_end_time: "",
      min_service_price: 0,
      max_service_price: 0,
      offer_status: "inactive",
      slot_duration: 0,
      max_bookings_per_slot: 0,
      location_name: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      let response = null;

      if (formType === "add") {
        response = await addNewSalonSpa({
          ...values,
          owner_id: user?.id,
        });
      } else {
        response = await editSalonSpaById({
          id: initialValues.id,
          payload: values,
        }); // Will be implemented in future
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/salon-spa-owner/salons-spas");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onWorkingDayChange = (day: string) => {
    try {
      const prevValues = form.getValues("working_days");
      if (prevValues.includes(day)) {
        form.setValue(
          "working_days",
          prevValues.filter((d) => d !== day),
        );
      } else {
        form.setValue("working_days", [...prevValues, day]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key: any) => {
        form.setValue(key, initialValues[key]);
      });
    }

    // form.setValue("zip", initialValues.zip.toString());
  }, [initialValues]);

  return (
    <div className="mt-7">
      {" "}
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name" className="font-bold!">
                Name
              </FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder=""
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="description"
                className="font-bold!"
                id="description"
              >
                Description
              </FieldLabel>
              <Textarea placeholder="" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address" className="font-bold!">
                Address
              </FieldLabel>
              <Input
                {...field}
                id="address"
                aria-invalid={fieldState.invalid}
                placeholder=""
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="city" className="font-bold!">
                  City
                </FieldLabel>
                <Input
                  {...field}
                  id="city"
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
            name="state"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="state" className="font-bold!">
                  State
                </FieldLabel>
                <Input
                  {...field}
                  id="state"
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
            name="zip"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="zip" className="font-bold!">
                  Minimum Service Price
                </FieldLabel>
                <Input
                  {...field}
                  id="zip"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  type="number"
                  onChange={(e) => {
                    form.setValue("zip", parseInt(e.target.value));
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="min_service_price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="min_service_price" className="font-bold!">
                  Minimum Service Price
                </FieldLabel>
                <Input
                  {...field}
                  id="min_service_price"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  type="number"
                  onChange={(e) => {
                    form.setValue(
                      "min_service_price",
                      parseInt(e.target.value),
                    );
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="max_service_price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="max_service_price" className="font-bold!">
                  Maximum Service Price
                </FieldLabel>
                <Input
                  {...field}
                  id="max_service_price"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  type="number"
                  onChange={(e) => {
                    form.setValue(
                      "max_service_price",
                      parseInt(e.target.value),
                    );
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="offer_status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="offer_status" className="font-bold!">
                  Offer Status
                </FieldLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    {/* <SelectTrigger className="w-full max-w-48"> */}
                    <SelectValue placeholder="Select offer status" />
                  </SelectTrigger>
                  <SelectContent>
                    {offerStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="p-5 border border-gray-300 rounded-md flex flex-col gap-5">
          <h1 className="text-sm! font-semibold! text-gray-600">
            Working Days
          </h1>

          <div className="flex flex-wrap gap-10">
            {workingDays.map((day) => {
              const prevValues = form.watch("working_days");
              const isChecked = prevValues.includes(day.value);

              return (
                <div className="flex gap-2 items-center" key={day.value}>
                  <h1 className="text-sm">{day.label}</h1>
                  <Checkbox
                    onCheckedChange={() => onWorkingDayChange(day.value)}
                    checked={isChecked}
                  />
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Controller
              name="start_time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="start_time" className="font-bold!">
                    Start Time
                  </FieldLabel>
                  <Input
                    {...field}
                    id="start_time"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="time"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="end_time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="end_time" className="font-bold!">
                    End Time
                  </FieldLabel>
                  <Input
                    {...field}
                    id="end_time"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="time"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="break_start_time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="break_start_time" className="font-bold!">
                    Break Start Time
                  </FieldLabel>
                  <Input
                    {...field}
                    id="break_start_time"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="time"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="break_end_time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="break_end_time" className="font-bold!">
                    Break End Time
                  </FieldLabel>
                  <Input
                    {...field}
                    id="break_end_time"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="time"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="slot_duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="slot_duration" className="font-bold!">
                    Slot Duration
                  </FieldLabel>
                  <Input
                    {...field}
                    id="slot_duration"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="number"
                    onChange={(e) => {
                      form.setValue("slot_duration", parseInt(e.target.value));
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="max_bookings_per_slot"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="max_bookings_per_slot"
                    className="font-bold!"
                  >
                    Maximum Bookings Per Slot
                  </FieldLabel>
                  <Input
                    {...field}
                    id="max_bookings_per_slot"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="number"
                    onChange={(e) => {
                      form.setValue(
                        "max_bookings_per_slot",
                        parseInt(e.target.value),
                      );
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        {/*
        (Will be implemented in future)
        <div className="p-5 border border-gray-300 rounded-md flex flex-col gap-5">
          <h1>Location</h1>
        </div> */}
        <div className="flex justify-end gap-5">
          <Button
            type="button"
            variant={"outline"}
            disabled={loading}
            onClick={() => router.push("/salon-spa-owner/salons-spas")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading} className="cursor-pointer">
            {formType === "add" ? "Add" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SalonSpaForm;
