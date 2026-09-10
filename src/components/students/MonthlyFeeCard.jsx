import React from "react";
import {
  CheckCircle2,
  Clock3,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";


const MonthlyFeeCard = () => {


  const months = [
    {
      month: "January",
      status: "paid",
      amount: 2000,
      date: "05 Jan 2026",
      time: "10:30 AM",
    },
    {
      month: "February",
      status: "paid",
      amount: 2000,
      date: "06 Feb 2026",
      time: "11:20 AM",
    },
    {
      month: "March",
      status: "due",
      amount: 2000,
    },
    {
      month: "April",
      status: "paid",
      amount: 2000,
      date: "03 Apr 2026",
      time: "09:45 AM",
    },
    {
      month: "May",
      status: "due",
      amount: 2000,
    },
    {
      month: "June",
      status: "due",
      amount: 2000,
    },
    {
      month: "July",
      status: "paid",
      amount: 2000,
      date: "02 July 2026",
      time: "12:15 PM",
    },
    {
      month: "August",
      status: "due",
      amount: 2000,
    },
    {
      month: "September",
      status: "paid",
      amount: 2000,
      date: "08 Sep 2026",
      time: "02:10 PM",
    },
    {
      month: "October",
      status: "due",
      amount: 2000,
    },
    {
      month: "November",
      status: "due",
      amount: 2000,
    },
    {
      month: "December",
      status: "due",
      amount: 2000,
    },
  ];


  const totalPaid = months
    .filter(item => item.status === "paid")
    .reduce((sum,item)=>sum + item.amount,0);



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
          <h2 className="
          text-xl
          font-bold
          text-text-primary
          ">
            Monthly Fee
          </h2>


          <p className="
          text-sm
          text-text-secondary
          ">
            Student payment history 2026
          </p>
        </div>



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
        md:grid-cols-2
        xl:grid-cols-3
        gap-4
        "
      >


        {
          months.map((item)=>(

            <div
              key={item.month}
              className={`
              rounded-2xl
              border
              p-5
              transition-all
              hover:-translate-y-1

              ${
                item.status === "paid"
                ?
                "bg-green-50 border-green-200"
                :
                "bg-red-50 border-red-200"
              }

              `}
            >


              {/* Month + Status */}

              <div className="flex justify-between items-center">


                <h3
                  className="
                  font-bold
                  text-text-primary
                  "
                >
                  {item.month}
                </h3>



                {
                  item.status === "paid"
                  ?

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
                    <CheckCircle2 size={14}/>
                    Paid
                  </span>

                  :

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

                }


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

                <span
                className="
                font-bold
                text-text-primary
                "
                >
                  ৳{item.amount}
                </span>

              </div>





              {
                item.status === "paid"

                ?

                <div
                className="
                mt-4
                space-y-2
                text-xs
                text-text-secondary
                "
                >


                  <div className="flex items-center gap-2">
                    <CalendarDays size={14}/>
                    Paid: {item.date}
                  </div>


                  <div className="flex items-center gap-2">
                    <Clock3 size={14}/>
                    Time: {item.time}
                  </div>


                </div>


                :

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

              }



            </div>

          ))
        }


      </div>


    </div>
  );
};


export default MonthlyFeeCard;