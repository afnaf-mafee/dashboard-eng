import React from "react";
import {
  ReceiptText,
  CalendarDays,
  CreditCard,
  CheckCircle2,
} from "lucide-react";


const Invoice = () => {


  const invoices = [
    {
      id: "TXN-9845321",
      date: "09 Sep 2026",
      amount: 1313,
      status: "Paid",
    },
    {
      id: "TXN-9845322",
      date: "09 Aug 2026",
      amount: 1313,
      status: "Paid",
    },
  ];



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
            <ReceiptText size={20}/>
          </div>


          <div>

            <h2 className="
            text-xl
            font-bold
            text-text-primary
            ">
              Invoice
            </h2>


            <p className="
            text-sm
            text-text-secondary
            ">
              Payment history
            </p>

          </div>


        </div>


      </div>





      {/* Invoice List */}

      <div className="space-y-4">


      {
        invoices.map((item)=>(


          <div
          key={item.id}
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



            <div className="flex justify-between items-center">


              <div>

                <p className="
                text-xs
                text-text-secondary
                ">
                  Transaction ID
                </p>


                <h3 className="
                mt-1
                font-bold
                text-text-primary
                ">
                  {item.id}
                </h3>


              </div>



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
                {item.status}

              </span>



            </div>






            <div
            className="
            mt-5
            grid
            grid-cols-2
            gap-4
            "
            >



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

                {item.date}

              </div>





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

                <CreditCard
                size={17}
                />

                ৳ {item.amount}

              </div>




            </div>



          </div>


        ))
      }


      </div>


    </div>
  );
};


export default Invoice;