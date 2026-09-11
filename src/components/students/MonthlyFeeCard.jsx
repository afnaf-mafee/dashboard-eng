import React from "react";
import {
  CheckCircle2,
  Clock3,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

const MonthlyFeeCard = ({ amount, feePayments = [] }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Payment কোন কোন মাসে হয়েছে
  const paidMonths = new Map(
    feePayments.map((payment) => [
      payment.month?.toLowerCase(),
      payment,
    ])
  );

  // Total paid
  const totalPaid = feePayments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  // Bangladesh Date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      timeZone: "Asia/Dhaka",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Bangladesh Time - 12 Hour Format
  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="
        rounded-[28px]
        border border-border
        bg-surface-soft/80
        backdrop-blur-2xl
        p-6
        shadow-[0_20px_60px_rgba(91,33,182,0.10)]
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            Monthly Fee
          </h2>

          <p className="text-sm text-text-secondary">
            Student payment history 2026
          </p>
        </div>

        {/* Total Paid */}
        <div
          className="
            rounded-xl
            bg-purple-soft
            px-4
            py-2
            text-sm
            font-semibold
            text-brand-secondary
          "
        >
          Paid ৳{totalPaid}
        </div>
      </div>

      {/* Month Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
      >
        {months.map((month) => {
          const payment = paidMonths.get(month.toLowerCase());

          const isPaid = !!payment;

          return (
            <div
              key={month}
              className={`
                rounded-2xl
                border
                p-5
                transition-all
                hover:-translate-y-1

                ${
                  isPaid
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }
              `}
            >
              {/* Month + Status */}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-text-primary">
                  {month}
                </h3>

                {isPaid ? (
                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-green-700
                    "
                  >
                    <CheckCircle2 size={14} />
                    Paid
                  </span>
                ) : (
                  <span
                    className="
                      rounded-full
                      bg-red-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-red-700
                    "
                  >
                    Due
                  </span>
                )}
              </div>

              {/* Amount */}
              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-text-secondary
                "
              >
                <CircleDollarSign
                  size={18}
                  className="text-brand-secondary"
                />

                Monthly Fee:

                <span className="font-bold text-text-primary">
                  ৳{isPaid ? payment.amount : amount}
                </span>
              </div>

              {/* Payment Information */}
              {isPaid ? (
                <div
                  className="
                    mt-4
                    space-y-2
                    text-xs
                    text-text-secondary
                  "
                >
                  {/* Paid Date */}
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} />

                    <span>
                      Paid: {formatDate(payment.paidAt)}
                    </span>
                  </div>

                  {/* Paid Time */}
                  <div className="flex items-center gap-2">
                    <Clock3 size={14} />

                    <span>
                      Time: {formatTime(payment.paidAt)}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="
                    mt-4
                    text-xs
                    font-medium
                    text-red-600
                  "
                >
                  Payment not received
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyFeeCard;