"use client";
import { getAppointmentsByUserId } from "@/actions/appointments";
import PageTitle from "@/components/ui/page-title";
import { IAppointment } from "@/interfaces";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/store/users-global-store";
import React from "react";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/ui/loader";
import ErrorMessage from "@/components/ui/error-message";
import dayjs from "dayjs";

function UserAppointmentsList() {
  const [appointments, setAppointments] = React.useState<IAppointment[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAppointmentsByUserId(user?.id!);
      if (response.success) {
        setAppointments(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const columns = [
    "Id",
    "Salon/Spa Name",
    "Date",
    "Time",
    "Booked On",
    "Status",
  ];

  return (
    <div>
      <PageTitle title="My Appointments" />

      {loading && <Loader parentHeight={200} />}

      {!loading && appointments.length === 0 && (
        <ErrorMessage error="No appointments found" />
      )}

      {!loading && appointments.length > 0 && (
        <div>
          {" "}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                {columns.map((column) => (
                  <TableHead key={column} className="font-bold!">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((item: IAppointment) => (
                <TableRow key={item.id} className="p-2">
                  <TableCell data-label="Id">{item.id}</TableCell>
                  <TableCell data-label="Salon/Spa Name">
                    {item?.salon_spa_data?.name}
                  </TableCell>
                  <TableCell data-label="Date">{item.date}</TableCell>
                  <TableCell data-label="Time">{item.time}</TableCell>
                  <TableCell data-label="Status">{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default UserAppointmentsList;
