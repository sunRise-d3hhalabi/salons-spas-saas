"use client";
import React from "react";

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

interface SalonFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}

const offerStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

function SalonSpaForm({ initialValues, formType }: SalonFormProps) {
  const formSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    zip: z.string().nonempty(),
    working_days: z.array(z.string().nonempty()),
    start_time: z.string().nonempty(),
    end_time: z.string().nonempty(),
    break_start_time: z.string().nonempty(),
    break_end_time: z.string().nonempty(),
    minimum_service_price: z.number(),
    maximum_service_price: z.number(),
    offer_status: z.string().nonempty(),
    slot_duration: z.number(),
    max_bookings_per_slot: z.number(),
    location_name: z.string().nonempty(),
    latitue: z.string(),
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
      zip: "",
      working_days: [],
      start_time: "",
      end_time: "",
      break_start_time: "",
      break_end_time: "",
      minimum_service_price: 0,
      maximum_service_price: 0,
      offer_status: "inactive",
      slot_duration: 0,
      max_bookings_per_slot: 0,
      location_name: "",
      latitue: "",
      longitude: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="mt-7">
      {" "}
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* <FieldGroup> */}
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
              <FieldLabel htmlFor="description" className="font-bold!">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                  Zip
                </FieldLabel>
                <Input
                  {...field}
                  id="zip"
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
            name="minimum_service_price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="minimum_service_price"
                  className="font-bold!"
                >
                  Minimum Service Price
                </FieldLabel>
                <Input
                  {...field}
                  id="minimum_service_price"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  type="number"
                  onChange={(e) => {
                    form.setValue(
                      "minimum_service_price",
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
            name="maximum_service_price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="maximum_service_price"
                  className="font-bold!"
                >
                  Maximum Service Price
                </FieldLabel>
                <Input
                  {...field}
                  id="maximum_service_price"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  type="number"
                  onChange={(e) => {
                    form.setValue(
                      "maximum_service_price",
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
                {/* <Input
                  {...field}
                  id="maximum_service_price"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  type="number"
                  onChange={(e) => {
                    form.setValue(
                      "maximum_service_price",
                      parseInt(e.target.value),
                    );
                  }}
                /> */}
                <Select>
                  <SelectTrigger className="w-full">
                    {/* <SelectTrigger className="w-full max-w-48"> */}
                    <SelectValue placeholder="Select offer status" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectGroup> */}
                    {offerStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                    {/* </SelectGroup> */}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select> */}
        </div>
        {/* </FieldGroup> */}
      </form>
    </div>
  );
}

export default SalonSpaForm;
