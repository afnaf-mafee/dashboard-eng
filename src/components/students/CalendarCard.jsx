import React, { useState } from "react";
import { CalendarDays } from "lucide-react";

const CalendarCard = () => {
  const [selected, setSelected] = useState(10);

  const days = [
    null, null, null, null, null, null, 1,
    2,3,4,5,6,7,8,
    9,10,11,12,13,14,15,
    16,17,18,19,20,21,22,
    23,24,25,26,27,28,29,
    30,31
  ];


  return (
    <div
      className="
      w-full max-w-sm
      rounded-[28px]
      border border-border
      bg-surface-soft/80
      backdrop-blur-2xl
      p-6
      shadow-[0_20px_60px_rgba(91,33,182,0.10)]
      "
    >


      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="
        text-lg
        font-bold
        text-text-primary
        ">
         Attendance
        </h2>


        <div className="
        flex items-center
        gap-2
        text-sm
        font-semibold
        text-brand-secondary
        ">
          Dec10, 2019
          <CalendarDays size={16}/>
        </div>

      </div>




      {/* Week */}

      <div
      className="
      mt-5
      grid
      grid-cols-7
      text-center
      text-xs
      font-medium
      text-text-muted
      "
      >

        {
          [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ].map(day=>(
            <span key={day}>
              {day}
            </span>
          ))
        }

      </div>





      {/* Date */}

      <div
      className="
      mt-5
      grid
      grid-cols-7
      gap-y-5
      text-center
      "
      >

        {
          days.map((day,index)=>(
            <button
            key={index}
            disabled={!day}
            onClick={()=>day && setSelected(day)}
            className={`
            mx-auto
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            text-xs
            font-semibold
            transition

            ${
              selected===day
              ?
              "bg-gradient-to-br from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/30"
              :
              "text-text-secondary hover:bg-purple-soft hover:text-brand-secondary"
            }

            ${
              !day &&
              "opacity-0"
            }

            `}
            >

              {day}

            </button>
          ))
        }


      </div>




      {/* Bottom line */}

      <div
      className="
      mt-6
      border-t
      border-border
      "
      />


    </div>
  );
};


export default CalendarCard;