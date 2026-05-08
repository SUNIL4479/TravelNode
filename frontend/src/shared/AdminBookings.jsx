import React from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import { FiCheck } from "react-icons/fi";

const AdminBookingCard = ({ booking, displayMode = "row" }) => {
  const { tourName, fullName, userId, phone, totalPrice, maxGroupSize, startDate, endDate, createdAt, _id, status, paymentStatus } = booking;

  const bookedFor = `${startDate} - ${endDate}`;
  const bookedOn = new Date(createdAt).toDateString();

  const confirmDelete = async () => {
    if (window.confirm("Mark this booking as completed?")) {
      deleteBooking();
    }
  };

  const deleteBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success("Booking marked as completed");
        window.location.reload();
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  if (displayMode === "row") {
    return (
      <tr className="table-row">
        <td className="font-medium">{tourName}</td>
        <td>{fullName}</td>
        <td className="text-text-muted text-caption font-mono">{userId}</td>
        <td>{maxGroupSize}</td>
        <td>{phone}</td>
        <td>{bookedFor}</td>
        <td className="text-caption">{bookedOn}</td>
        <td className="font-semibold text-primary">₹{totalPrice}</td>
        <td>
          <div className="flex flex-col gap-1.5">
            <span className={`badge !text-[10px] ${
              paymentStatus === "paid" ? "bg-success/10 text-success" :
              paymentStatus === "failed" ? "bg-danger/10 text-danger" :
              paymentStatus === "pending_verification" ? "bg-sky-100 text-sky-800" :
              "bg-gray-100 text-gray-600"
            }`}>
              {paymentStatus?.replace("_", " ") || "UNPAID"}
            </span>
            {paymentStatus !== "paid" && (
               <button
                onClick={confirmDelete}
                className="inline-flex items-center justify-center gap-1.5 px-2 py-1 bg-accent text-white text-[10px] font-bold rounded hover:bg-forest-700 transition-all"
              >
                Complete
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="p-5 flex flex-col gap-4 bg-white hover:bg-forest-50/20 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-body-md font-bold text-text-primary">{tourName}</h3>
          <p className="text-xs text-text-muted mt-0.5">Customer: {fullName}</p>
        </div>
        <span className={`badge text-[10px] uppercase font-bold tracking-wider ${
          paymentStatus === "paid" ? "bg-success/10 text-success" :
          paymentStatus === "failed" ? "bg-danger/10 text-danger" :
          paymentStatus === "pending_verification" ? "bg-sky-100 text-sky-800" :
          "bg-gray-100 text-gray-600"
        }`}>
          {paymentStatus?.replace("_", " ") || "UNPAID"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-3 border-y border-forest-50">
        <div>
          <p className="text-[10px] text-text-muted font-bold uppercase mb-1">Schedule</p>
          <p className="text-xs text-text-primary font-medium">{bookedFor}</p>
          <p className="text-[9px] text-text-muted mt-1">Booked: {bookedOn}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-muted font-bold uppercase mb-1">Details</p>
          <p className="text-body-md font-bold text-primary">₹{totalPrice}</p>
          <p className="text-xs text-text-secondary">{maxGroupSize} guests • {phone}</p>
        </div>
      </div>

      <div className="flex justify-end pt-1">
        {paymentStatus !== "paid" && (
          <button
            onClick={confirmDelete}
            className="btn-primary w-full !py-2.5 !text-xs !rounded-xl flex items-center justify-center gap-2"
          >
            <FiCheck className="w-4 h-4" /> Mark as Completed
          </button>
        )}
        {paymentStatus === "paid" && (
          <span className="text-xs text-text-muted font-bold flex items-center gap-1.5 bg-forest-50 px-3 py-1.5 rounded-lg">
            <FiCheck className="text-success w-4 h-4" /> PAID & CONFIRMED
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminBookingCard;