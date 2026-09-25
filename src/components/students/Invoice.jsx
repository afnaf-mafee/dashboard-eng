import React from "react";
import {
  ReceiptText,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const Invoice = ({ invoice = [] }) => {

  // Newest payment first
  const invoices = [...invoice].sort(
    (a, b) => new Date(b.paidAt) - new Date(a.paidAt)
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-brand-primary
              to-brand-accent
              text-white
              shadow-[0_0_20px_rgba(168,85,247,0.5)]
            "
          >
            <ReceiptText size={20} />
          </div>

          {/* Title */}
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-text-primary
              "
            >
              Invoice
            </h2>

            <p
              className="
                text-sm
                text-text-secondary
              "
            >
              Payment history
            </p>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {invoices.length > 0 ? (
          invoices.map((item, index) => (
            <div
              key={`${item.transactionId}-${index}`}
              className="
                rounded-2xl
                border
                border-purple-200/40
                bg-white/40
                backdrop-blur-xl
                p-5
                transition
                hover:shadow-[0_0_25px_rgba(168,85,247,0.20)]
              "
            >
              {/* Transaction + Status */}
              <div className="flex justify-between items-center gap-3">
                {/* Transaction ID */}
                <div className="min-w-0">
                  <p
                    className="
                      text-xs
                      text-text-secondary
                    "
                  >
                    Transaction ID
                  </p>

                  <h3
                    className="
                      mt-1
                      font-bold
                      text-text-primary
                      break-all
                    "
                  >
                    {item.transactionId}
                  </h3>
                </div>

                {/* Status */}
                <span
                  className="
                    flex
                    shrink-0
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
              </div>

              {/* Payment Info */}
              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-4
                  gap-4
                "
              >
               

                {/* Paid Date */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-text-secondary
                  "
                >
                  <CalendarDays
                    size={17}
                    className="text-brand-secondary"
                  />

                  <span>
                    {formatDate(item.paidAt)}
                  </span>
                </div>

                {/* Paid Time */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-text-secondary
                  "
                >
                  <Clock3
                    size={17}
                    className="text-brand-secondary"
                  />

                  <span>
                    {formatTime(item.paidAt)}
                  </span>
                </div>

                {/* Amount */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-brand-secondary
                  "
                >
                  <CreditCard size={17} />

                  <span>
                    ৳ {item.amount}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-purple-200
              p-8
              text-center
              text-sm
              text-text-secondary
            "
          >
            No payment history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;