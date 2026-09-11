import React, { useMemo, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Select,
  message,
} from "antd";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";



const StudentAttendance = ({ student }) => {

  const [currentMonth, setCurrentMonth] = useState(
    dayjs()
  );

  const [selectedDate, setSelectedDate] = useState(
    dayjs()
  );

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
    const dateString = dayjs(date).format(
      "YYYY-MM-DD"
    );

    return attendance.find((item) => {
      return (
        dayjs(item.date).format(
          "YYYY-MM-DD"
        ) === dateString
      );
    });
  };


  // =====================================
  // MONTH ATTENDANCE
  // =====================================

  const monthAttendance = useMemo(() => {

    return attendance.filter((item) => {

      return dayjs(item.date).isSame(
        currentMonth,
        "month"
      );

    });

  }, [attendance, currentMonth]);


  // =====================================
  // SUMMARY
  // =====================================

  const presentDays =
    monthAttendance.filter(
      (item) =>
        item.status === "Present"
    ).length;

  const absentDays =
    monthAttendance.filter(
      (item) =>
        item.status === "Absent"
    ).length;

  const totalMarked =
    presentDays + absentDays;

  const attendanceRate =
    totalMarked > 0
      ? Math.round(
          (presentDays / totalMarked) *
            100
        )
      : 0;


  // =====================================
  // CALENDAR DAYS
  // =====================================

  const startOfMonth =
    currentMonth.startOf("month");

  const endOfMonth =
    currentMonth.endOf("month");

  const startDay =
    startOfMonth.day();

  const daysInMonth =
    currentMonth.daysInMonth();


  const calendarDays = [];

  // Previous month empty dates
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  // Current month dates
  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarDays.push(
      currentMonth.date(day)
    );
  }


  // =====================================
  // DATE CLICK
  // =====================================

  const handleDateClick = (date) => {

    if (!date) return;

    setSelectedDate(date);

    const existing =
      getAttendanceByDate(date);

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

    setCurrentMonth(
      currentMonth.subtract(1, "month")
    );

  };


  // =====================================
  // NEXT MONTH
  // =====================================

  const handleNextMonth = () => {

    setCurrentMonth(
      currentMonth.add(1, "month")
    );

  };


  // =====================================
  // SAVE ATTENDANCE
  // =====================================

  const handleSaveAttendance = async () => {

    if (!student?._id) {

      message.error(
        "Student information not found"
      );

      return;

    }


    try {

      await markAttendance({

        id: student._id,

        attendanceData: {

          date: selectedDate.format(
            "YYYY-MM-DD"
          ),

          status,

          note,

        },

      }).unwrap();


      message.success(
        `${selectedDate.format(
          "DD MMM YYYY"
        )} attendance saved successfully`
      );

    } catch (error) {

      message.error(
        error?.data?.message ||
          "Failed to save attendance"
      );

    }

  };


  // =====================================
  // SELECTED DATE ATTENDANCE
  // =====================================

  const selectedAttendance =
    getAttendanceByDate(
      selectedDate
    );


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

                <CalendarOutlined
                  className="text-xl"
                />

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
                onClick={
                  handlePreviousMonth
                }
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

                {currentMonth.format(
                  "MMMM YYYY"
                )}

              </div>


              <button
                onClick={
                  handleNextMonth
                }
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

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (

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

            {calendarDays.map(
              (date, index) => {

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


                const attendanceData =
                  getAttendanceByDate(
                    date
                  );

                const isSelected =
                  selectedDate.isSame(
                    date,
                    "day"
                  );

                const isPresent =
                  attendanceData?.status ===
                  "Present";

                const isAbsent =
                  attendanceData?.status ===
                  "Absent";


                return (

                  <button
                    key={date.format(
                      "YYYY-MM-DD"
                    )}
                    onClick={() =>
                      handleDateClick(
                        date
                      )
                    }
                    className={`
                      relative
                      min-h-[78px]
                      border-b
                      border-r
                      border-gray-100
                      p-2
                      transition-all
                      text-left

                      ${
                        isSelected
                          ? "bg-purple-50 ring-2 ring-purple-500 ring-inset"
                          : ""
                      }

                      ${
                        isAbsent
                          ? "bg-red-50"
                          : ""
                      }

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

                      {isPresent && (

                        <span
                          className="
                            w-7
                            h-7
                            rounded-full
                            bg-green-100
                            text-green-600
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <CheckOutlined />

                        </span>

                      )}


                      {isAbsent && (

                        <span
                          className="
                            w-7
                            h-7
                            rounded-full
                            bg-red-100
                            text-red-500
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <CloseOutlined />

                        </span>

                      )}


                      {!attendanceData && (

                        <span
                          className="
                            w-2
                            h-2
                            rounded-full
                            bg-gray-300
                            mt-3
                          "
                        />

                      )}

                    </div>

                  </button>

                );

              }
            )}

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

                  <span className="text-xl">
                    ▥
                  </span>

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

                {currentMonth.format(
                  "MMMM YYYY"
                )}

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


          {/* =====================================
              MARK ATTENDANCE
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
                gap-3
                mb-5
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

                <CalendarOutlined />

              </div>


              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-[#17153B]
                  "
                >
                  Mark Attendance
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Select a date and set the attendance status
                </p>

              </div>

            </div>


            {/* Date + Status */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              {/* Date */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-[#292747]
                    mb-2
                  "
                >
                  Date
                </label>


                <DatePicker
                  value={selectedDate}
                  onChange={(date) => {

                    if (!date) return;

                    handleDateClick(
                      date
                    );

                  }}
                  format="ddd, MMM DD, YYYY"
                  className="
                    !w-full
                    !h-11
                    !rounded-xl
                  "
                  suffixIcon={
                    <CalendarOutlined />
                  }
                />

              </div>


              {/* Status */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-[#292747]
                    mb-2
                  "
                >
                  Status
                </label>


                <Select
                  value={status}
                  onChange={setStatus}
                  className="w-full"
                  size="large"
                  options={[
                    {
                      value: "Present",
                      label: (
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <span
                            className="
                              w-2.5
                              h-2.5
                              rounded-full
                              bg-green-500
                            "
                          />

                          Present

                        </div>
                      ),
                    },

                    {
                      value: "Absent",
                      label: (
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <span
                            className="
                              w-2.5
                              h-2.5
                              rounded-full
                              bg-red-500
                            "
                          />

                          Absent

                        </div>
                      ),
                    },
                  ]}
                />

              </div>

            </div>


            {/* Note */}

            <div className="mt-4">

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-[#292747]
                  mb-2
                "
              >
                Note{" "}
                <span
                  className="
                    text-gray-400
                    font-normal
                  "
                >
                  (Optional)
                </span>
              </label>


              <Input.TextArea
                value={note}
                onChange={(e) =>
                  setNote(
                    e.target.value
                  )
                }
                maxLength={200}
                showCount
                rows={3}
                placeholder="Add a note (e.g. sick, leave, etc.)"
                className="
                  !rounded-xl
                "
              />

            </div>


            {/* Save */}

            <Button
              type="primary"
              block
              size="large"
           
              icon={<SendOutlined />}
              onClick={
                handleSaveAttendance
              }
              className="
                !mt-4
                !h-12
                !rounded-xl
                !border-0
                !bg-gradient-to-r
                !from-purple-600
                !to-purple-500
                !font-semibold
                !text-white
                shadow-lg
                shadow-purple-200
              "
            >
              {selectedAttendance
                ? "Update Attendance"
                : "Save Attendance"}
            </Button>

          </div>

        </div>
        

      </div>

    </section>

  );
};

export default StudentAttendance;