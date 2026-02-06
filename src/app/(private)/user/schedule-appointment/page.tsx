"use client";
import { getAllSalonSpas } from "@/actions/salon-spas";
import Loader from "@/components/ui/loader";
import PageTitle from "@/components/ui/page-title";
import { ISalon_Spa } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ScheduleAppointment() {
  const [salonsSpas, setSalonsSpas] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAllSalonSpas();
      if (!response.success) {
        throw new Error(response.message);
      }
      setSalonsSpas(response.data);
    } catch (error) {
      toast.error("Failed to fetch salon spas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Schedule Appointment" />
      </div>

      {loading && <Loader parentHeight={200} />}

      {!loading && salonsSpas.length > 0 && (
        <div className="flex flex-col gap-3 mt-7">
          {salonsSpas.map((salonSpa: ISalon_Spa) => (
            <div
              key={salonSpa.id}
              className="border border-gray-300 p-2 rounded cursor-pointer hover:border-gray-600"
              onClick={() =>
                router.push(`/user/schedule-appointment/${salonSpa.id}`)
              }
            >
              <h1 className="text-sm font-bold! text-gray-800">
                {salonSpa.name}
              </h1>
              <p className="text-xs text-gray-600">
                {salonSpa.address}, {salonSpa.city}, {salonSpa.state}
              </p>

              <div className="mt-2">
                <span className="text-xs font-semibold!">
                  Minimum Price: $ {salonSpa.min_service_price}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduleAppointment;
