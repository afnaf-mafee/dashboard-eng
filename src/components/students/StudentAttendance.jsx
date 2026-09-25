import React, { useMemo, useState } from "react";
import { Button, DatePicker, Input, Select, message } from "antd";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const StudentAttendance = ({ student }) => {
  const bdDate = () => dayjs().tz("Asia/Dhaka");

  const [currentMonth, setCurrentMonth] = useState(bdDate());

  const [selectedDate, setSelectedDate] = useState(bdDate());

  const [status, setStatus] = useState("Present");

  const [note, setNote] = useState("");

  // =====================================
  // ATTENDANCE DATA
  // =====================================

  const attendance = student?.attendance || [];

  // =====================================
  // FIND ATTENDANCE BY DATE
  // =====================================
  const getAttendanceByDate = (date) => {
    const dateString = dayjs(date).tz("Asia/Dhaka").format("YYYY-MM-DD");

    return attendance.find((item) => {
      return (
        dayjs(item.date).tz("Asia/Dhaka").format("YYYY-MM-DD") === dateString
      );
    });
  };

  // =====================================
  // MONTH ATTENDANCE
  // =====================================

  const monthAttendance = useMemo(() => {
    return attendance.filter((item) => {
      return dayjs(item.date).isSame(currentMonth, "month");
    });
  }, [attendance, currentMonth]);

  // =====================================
  // SUMMARY
  // =====================================

  const absentDays = attendance.filter(
    (item) =>
      item.status === "Absent" &&
      dayjs(item.date)
        .tz("Asia/Dhaka")
        .isSame(currentMonth, "month")
  ).length;


  const holidayDays = Array.from(
    {
      length: currentMonth.daysInMonth(),
    },
    (_, i) => currentMonth.date(i + 1)
  ).filter(
    (date) => date.day() === 5
  ).length;


  const presentDays =
    currentMonth.daysInMonth() -
    holidayDays -
    absentDays;


  const totalDays =
    presentDays + absentDays;


  const attendanceRate =
    totalDays > 0
      ? Math.round((presentDays / totalDays) * 100)
      : 0;


  const chartData = [
    {
      name: "Present",
      value: presentDays,
    },
    {
      name: "Absent",
      value: absentDays,
    },
    {
      name: "Holiday",
      value: holidayDays,
    },
  ];


  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#a855f7",
  ];

  // =====================================
  // CALENDAR DAYS
  // =====================================

  const startOfMonth = currentMonth.startOf("month");

  const endOfMonth = currentMonth.endOf("month");

  const startDay = startOfMonth.day();

  const daysInMonth = currentMonth.daysInMonth();

  const calendarDays = [];

  // Previous month empty dates
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  // Current month dates
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(currentMonth.date(day));
  }

  // =====================================
  // DATE CLICK
  // =====================================

  const handleDateClick = (date) => {
    if (!date) return;

    setSelectedDate(date);

    const existing = getAttendanceByDate(date);

    if (existing) {
      setStatus(existing.status);

      setNote(existing.note || "");
    } else {
      setStatus("Present");

      setNote("");
    }
  };

  // =====================================
  // PREVIOUS MONTH
  // =====================================

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  // =====================================
  // NEXT MONTH
  // =====================================

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // =====================================
  // SAVE ATTENDANCE
  // =====================================

  const handleSaveAttendance = async () => {
    if (!student?._id) {
      message.error("Student information not found");

      return;
    }

    try {
      await markAttendance({
        id: student._id,

        attendanceData: {
          date: selectedDate.tz("Asia/Dhaka").format("YYYY-MM-DD"),

          status,

          note,
        },
      }).unwrap();

      message.success(
        `${selectedDate.format("DD MMM YYYY")} attendance saved successfully`,
      );
    } catch (error) {
      message.error(error?.data?.message || "Failed to save attendance");
    }
  };

  // =====================================
  // SELECTED DATE ATTENDANCE
  // =====================================

  const selectedAttendance = getAttendanceByDate(selectedDate);

  return (
    <section className="w-full mt-6">
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-5
          gap-5
        "
      >
        {/* =====================================
            LEFT - ATTENDANCE CALENDAR
        ===================================== */}

        <div
          className="
            xl:col-span-3
            rounded-[24px]
            border
            border-purple-100
            bg-white
            shadow-[0_12px_40px_rgba(91,33,182,0.08)]
            overflow-hidden
          "
        >
          {/* Header */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-4
              px-5
              py-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-purple-100
                  text-purple-600
                  flex
                  items-center
                  justify-center
                "
              >
                <CalendarOutlined className="text-xl" />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-[#17153B]
                  "
                >
                  Attendance Calendar
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Click on a date to view or update attendance
                </p>
              </div>
            </div>

            {/* Month Navigation */}

            <div
              className="
                flex
                items-center
                border
                border-gray-200
                rounded-xl
                overflow-hidden
              "
            >
              <button
                onClick={handlePreviousMonth}
                className="
                  w-11
                  h-11
                  flex
                  items-center
                  justify-center
                  hover:bg-purple-50
                  text-gray-600
                  transition
                "
              >
                <LeftOutlined />
              </button>

              <div
                className="
                  min-w-[145px]
                  text-center
                  font-semibold
                  text-[#17153B]
                  border-x
                  border-gray-200
                  h-11
                  flex
                  items-center
                  justify-center
                "
              >
                {currentMonth.format("MMMM YYYY")}
              </div>

              <button
                onClick={handleNextMonth}
                className="
                  w-11
                  h-11
                  flex
                  items-center
                  justify-center
                  hover:bg-purple-50
                  text-gray-600
                  transition
                "
              >
                <RightOutlined />
              </button>
            </div>
          </div>

          {/* Week Header */}

          <div
            className="
              grid
              grid-cols-7
              border-y
              border-gray-100
              bg-gray-50/70
            "
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-[#41405F]
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar */}

          <div
            className="
              grid
              grid-cols-7
            "
          >
            {calendarDays.map((date, index) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="
          min-h-[78px]
          border-b
          border-r
          border-gray-100
        "
                  />
                );
              }

              const attendanceData = getAttendanceByDate(date);

              const isSelected = selectedDate.isSame(date, "day");

              const isFriday = date.day() === 5;

              const isAbsent = attendanceData?.status === "Absent";

              // Friday বাদে সব দিন Present
              const isPresent = !isAbsent && !isFriday;

              return (
                <button
                  key={date.format("YYYY-MM-DD")}
                  onClick={() => handleDateClick(date)}
                  className={`
        relative
        min-h-[78px]
        border-b
        border-r
        border-gray-100
        p-2
        transition-all
        text-left

        ${isSelected ? "bg-purple-50 ring-2 ring-purple-500 ring-inset" : ""}

        ${isAbsent ? "bg-red-50" : ""}

        ${isFriday ? "bg-gray-50" : ""}

        hover:bg-purple-50
      `}
                >
                  <div
                    className="
          flex
          justify-center
          text-sm
          font-semibold
          text-[#17153B]
        "
                  >
                    {date.date()}
                  </div>

                  <div
                    className="
          flex
          justify-center
          mt-3
        "
                  >
                    {/* Friday Holiday */}
                    {isFriday && (
                      <span
                        className="
              text-[10px]
              font-semibold
              text-gray-400
            "
                      >
                        Holiday
                      </span>
                    )}

                    {/* Present Green Dot */}
                    {isPresent && (
                      <span
                        className="
              w-3
              h-3
              rounded-full
              bg-green-500
              shadow-md
              shadow-green-200
            "
                      />
                    )}

                    {/* Absent Red Dot */}
                    {isAbsent && (
                      <span
                        className="
              w-3
              h-3
              rounded-full
              bg-red-500
              shadow-md
              shadow-red-200
            "
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-6
              px-5
              py-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >
              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-400
                "
              />
              Present
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >
              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-red-400
                "
              />
              Absent
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >
              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-gray-300
                "
              />
              No entry
            </div>
          </div>
        </div>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div
          className="
            xl:col-span-2
            space-y-5
          "
        >
          {/* =====================================
              SUMMARY
          ===================================== */}

          <div
            className="
              rounded-[24px]
              border
              border-purple-100
              bg-white
              p-5
              shadow-[0_12px_40px_rgba(91,33,182,0.08)]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                mb-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-purple-100
                    text-purple-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-xl">▥</span>
                </div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-[#17153B]
                  "
                >
                  Attendance Summary
                </h2>
              </div>

              <span
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-purple-50
                  text-purple-600
                  text-sm
                  font-semibold
                "
              >
                {currentMonth.format("MMMM YYYY")}
              </span>
            </div>

            <div
              className="
                grid
                grid-cols-3
                gap-3
              "
            >
              {/* Present */}

              <div
                className="
                  rounded-xl
                  bg-green-50
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-green-500
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <CheckOutlined />
                  </span>

                  <span
                    className="
                      text-2xl
                      font-bold
                      text-green-700
                    "
                  >
                    {presentDays}
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-500
                  "
                >
                  Present Days
                </p>
              </div>

              {/* Absent */}

              <div
                className="
                  rounded-xl
                  bg-red-50
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-red-500
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <CloseOutlined />
                  </span>

                  <span
                    className="
                      text-2xl
                      font-bold
                      text-red-600
                    "
                  >
                    {absentDays}
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-500
                  "
                >
                  Absent Days
                </p>
              </div>

              {/* Rate */}

              <div
                className="
                  rounded-xl
                  bg-purple-50
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      w-8
                      h-8
                      rounded-full
                      border-[4px]
                      border-purple-600
                      flex
                      items-center
                      justify-center
                    "
                  />

                  <span
                    className="
                      text-2xl
                      font-bold
                      text-purple-700
                    "
                  >
                    {attendanceRate}%
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-500
                  "
                >
                  Attendance Rate
                </p>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default StudentAttendance;
