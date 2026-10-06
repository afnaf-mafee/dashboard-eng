import React, { useMemo, useState } from "react";

import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  DatePicker,
  message,
  Spin,
} from "antd";

import {
  SearchOutlined,
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
import { GrGroup } from "react-icons/gr";
import { FiCopy, FiSend } from "react-icons/fi";
import {
  useGetStudentsQuery,
  useBulkMarkAttendanceMutation,
} from "../../redux/services/studentsApiServices/studentApiServices.js";
import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices.js";

const Attendance = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().tz("Asia/Dhaka"));
    const [smsMessage, setSmsMessage] = useState(
    "Your child was absent today. Please contact the school if needed.",
  );
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");

  const searchParams = {
    search: search || undefined,

    className: selectedClass !== "all" ? selectedClass : undefined,

    batch: selectedBatch !== "all" ? selectedBatch : undefined,

    time: selectedTime !== "all" ? selectedTime : undefined,
  };
  if (search) {
    if (/^\d{6}$/.test(search)) {
      // 6 digit হলে student ID
      searchParams.studentId = search;
    } else if (/^01[3-9]\d{8}$/.test(search)) {
      // BD phone হলে phone
      searchParams.phone = search;
    } else {
      // অন্য কিছু হলে name
      searchParams.name = search;
    }
  }

  // =========================
  // SEARCH
  // =========================
  const [searchText, setSearchText] = useState("");

  // =========================
  // GET STUDENTS
  // =========================
  const { data, isLoading, isFetching } = useGetStudentsQuery(searchParams);
  const studentData = data?.data || [];

  // =========================
  // ATTENDANCE MUTATION
  // =========================
  const [bulkMarkAttendance, { isLoading: attendanceLoading }] =
    useBulkMarkAttendanceMutation();

  // =========================
  // STUDENT DATA
  // =========================
  const students = data?.data || [];

  // =========================
  // SELECTED DATE
  // =========================

  const dateString = selectedDate.tz("Asia/Dhaka").format("YYYY-MM-DD");
  // =========================
  // GET STUDENT ATTENDANCE
  // FOR SELECTED DATE
  // =========================
  const getAttendance = (student) => {
    if (!student?.attendance?.length) {
      return null;
    }

    return student.attendance.find((item) => {
      return dayjs(item.date).format("YYYY-MM-DD") === dateString;
    });
  };

  // =========================
  // FILTER STUDENTS
  // =========================
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const search = searchText.trim().toLowerCase();

      const matchesSearch =
        !search ||
        student.name?.toLowerCase().includes(search) ||
        String(student.studentId).toLowerCase().includes(search) ||
        student.phone?.includes(search);

      const matchesClass =
        selectedClass === "all" || student.className === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, searchText, selectedClass]);

 

  // =========================
  // TABLE ROW SELECTION
  // =========================
  const rowSelection = {
    selectedRowKeys: selectedStudents.map((student) => student._id),

    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedStudents(selectedRows);
    },
  };

  // =========================
  // SELECT ALL ABSENT
  // =========================
  const handleSelectAllAbsent = () => {
    const absentStudents = filteredStudents.filter((student) => {
      const attendance = getAttendance(student);

      return attendance?.status === "Absent";
    });

    setSelectedStudents(absentStudents);

    if (absentStudents.length === 0) {
      message.info("No absent students found for this date");

      return;
    }

    message.success(`${absentStudents.length} absent students selected`);
  };

  // =========================
  // CLEAR SELECTION
  // =========================
  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSendMessage = async () => {
    try {
      if (selectedStudents.length === 0) {
        message.warning("Please select students first");

        return;
      }

      if (!smsMessage.trim()) {
        message.warning("Please write a message");

        return;
      }

      // =========================
      // SAVE ATTENDANCE
      // =========================

      const studentIds = selectedStudents.map((student) => student._id);

      await bulkMarkAttendance({
        students: studentIds,

        date: dateString,

        status: "Absent",

        note: "",
      }).unwrap();

      // =========================
      // SMS DATA
      // =========================

      const recipients = selectedStudents.map((student) => ({
        studentId: student.studentId,

        studentName: student.name,

        guardian: student.guardian,

        phone: student.phone,
      }));

      console.log("SMS DATA:", {
        date: dateString,

        message: smsMessage,

        recipients,
      });

      message.success(`${selectedStudents.length} students attendance saved`);

      setSelectedStudents([]);
    } catch (error) {
      message.error(error?.data?.message || "Attendance save failed");
    }
  };

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns = [
    // =========================
    // NAME
    // =========================
    {
      title: "Student",

      dataIndex: "name",

      render: (text) => (
        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-purple-600
              to-purple-400
              text-white
              font-bold
            "
          >
            {text?.charAt(0)?.toUpperCase()}
          </div>

          <span className="font-semibold">{text}</span>
        </div>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",

      render: (studentId) => (
        <div className="flex items-center gap-2">
          <div
            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-100"
            onClick={() => {
              navigator.clipboard.writeText(String(studentId));
              message.success("Student ID copied!");
            }}
          >
            <span className="font-semibold">{studentId}</span>

            <FiCopy size={15} className="text-gray-400 hover:text-purple-600" />
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",

      render: (phone) => (
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-100"
          onClick={() => {
            navigator.clipboard.writeText(String(phone));
            message.success("Phone number copied!");
          }}
        >
          <span className="font-medium">{phone}</span>

          <FiCopy size={15} className="text-gray-400 hover:text-purple-600" />
        </div>
      ),
    },

    {
      title: "Class",
      dataIndex: "className",
      key: "className",

      render: (value) => (
        <Tag
          style={{
            border: "none",
            borderRadius: "8px",
            padding: "3px 10px",
            background: "#f3e8ff",
            color: "#7e22ce",
            fontWeight: 600,
          }}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",

      render: (batch) => {
        const batchSchedule = {
          1: "Saturday + Monday + Wednesday",
          2: "Sunday + Tuesday + Thursday",
        };

        return (
          <div
            className="
            w-fit
            rounded-xl
            border
            border-purple-200
            bg-gradient-to-r
            from-purple-50
            to-indigo-50
            px-3
            py-1
            
           
            font-semibold
            text-purple-700
            shadow-[0_5px_20px_rgba(124,58,237,0.15)]
            "
          >
            {batchSchedule[String(batch)] || "No Batch"}
          </div>
        );
      },
    },
   {
  title: "Time",
  dataIndex: "time",
  key: "time",

  render: (time) => (
    <span
      className="
      inline-flex
      items-center
      rounded-lg
      border
      border-blue-200
      bg-gradient-to-r
      from-blue-50
      to-cyan-50
      px-3
      py-1
      text-xs
      font-bold
      text-blue-700
      shadow-[0_3px_12px_rgba(59,130,246,0.2)]
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:shadow-[0_6px_18px_rgba(59,130,246,0.3)]
      "
    >
      {time}
    </span>
  ),
}

  ];

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div
        className="
          flex
          justify-center
          py-20
        "
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          md:items-center
          gap-4
          mb-6
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
            "
          >
            Attendance
          </h1>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Mark attendance and notify selected guardians
          </p>
        </div>

        {/* DATE */}

        <DatePicker
          size="large"
          value={selectedDate}
          onChange={(date) => {
            if (!date) {
              return;
            }

            setSelectedDate(date.tz("Asia/Dhaka"));

            // Date change হলে
            // selection clear
            setSelectedStudents([]);
          }}
          format="DD MMM YYYY"
          suffixIcon={<CalendarOutlined />}
          className="!rounded-xl"
        />
      </div>

      {/* =========================
          SEARCH + FILTER
      ========================= */}
      <div className="mb-5 rounded-2xl border border-border bg-surface-soft p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Input
            size="large"
            allowClear
            prefix={<SearchOutlined className="text-text-muted" />}
            placeholder="Search by name, ID or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="!h-11 !rounded-xl lg:max-w-md"
          />

          <Select
            size="large"
            value={selectedClass}
            onChange={setSelectedClass}
            className="w-full lg:w-44"
            options={[
              { value: "all", label: "All Classes" },
              { value: "One", label: "One" },
              { value: "Two", label: "Two" },
              { value: "Three", label: "Three" },
              { value: "Four", label: "Four" },
              { value: "Five", label: "Five" },
              { value: "Six", label: "Six" },
            ]}
          />
          <Select
            size="large"
            placeholder="Select Batch"
            value={selectedBatch}
            onChange={setSelectedBatch}
            options={[
              {
                value: "all",
                label: "All Batch",
              },
              {
                value: "1",
                label: "Saturday + Monday + Wednesday",
              },
              {
                value: "2",
                label: "Sunday + Tuesday + Thursday",
              },
            ]}
          />
          <Select
            size="large"
            placeholder="Select time"
            value={selectedTime}
            onChange={setSelectedTime}
            options={[
              {
                value: "all",
                label: "All Time",
              },
              {
                value: "A1",
                label: "A1",
              },
              {
                value: "A2",
                label: "A2",
              },
              {
                value: "A3",
                label: "A3",
              },
              {
                value: "A4",
                label: "A4",
              },
              {
                value: "A5",
                label: "A5",
              },
              {
                value: "A6",
                label: "A6",
              },
              {
                value: "A7",
                label: "A7",
              },
              {
                value: "A8",
                label: "A8",
              },
            ]}
          />
          {/* Total Students */}
          {/* Total Students */}
          <div
            className="
    group
    relative
    flex
    h-14
    items-center
    gap-3
    overflow-hidden
    rounded-2xl
    border
    border-white/40
    bg-white/40
    px-4
    shadow-[0_8px_30px_rgba(124,58,237,0.15)]
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-purple-300/60
    hover:shadow-[0_15px_40px_rgba(124,58,237,0.25)]
  "
          >
            {/* Glow Background */}
            <div
              className="
      absolute
      -right-6
      -top-6
      h-20
      w-20
      rounded-full
      bg-purple-500/20
      blur-2xl
      transition-all
      duration-500
      group-hover:bg-indigo-500/30
    "
            />

            {/* Icon */}
            <div
              className="
    relative
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-gradient-to-br
    from-purple-600
    via-violet-500
    to-indigo-600
    text-white
    shadow-[0_8px_20px_rgba(124,58,237,0.35)]
    transition-transform
    duration-300
    group-hover:scale-110
  "
            >
              <TeamOutlined className="text-lg" />
            </div>

            {/* Text */}
            <div className="relative flex items-center gap-2 whitespace-nowrap">
              <span
                className="
        bg-gradient-to-r
        from-purple-600
        via-violet-500
        to-indigo-600
        bg-clip-text
        text-3xl
        font-extrabold
        text-transparent
      "
              >
                {studentData?.count || studentData?.data?.length || 0}
              </span>

              <span
                className="
        text-sm
        font-semiboldF
        text-gray-600
      "
              >
                Students
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div
        className="
          mt-5
          grid
          grid-cols-1
          xl:grid-cols-4
          gap-5
        "
      >
        {/* =========================
            TABLE
        ========================= */}

        <div
          className="
            xl:col-span-3
            rounded-[28px]
            border
            border-border
            bg-surface-soft/80
            backdrop-blur-2xl
            p-5
            shadow-[0_20px_60px_rgba(91,33,182,0.10)]
            overflow-hidden
          "
        >
          <Table
            columns={columns}
            dataSource={filteredStudents}
            rowKey="_id"
            rowSelection={rowSelection}
            loading={isFetching}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
            }}
            scroll={{
              x: 1100,
            }}
          />
        </div>

        {/* =========================
            MESSAGE PANEL
        ========================= */}

        <div
          className="
            rounded-[28px]
            border
            border-border
            bg-surface-soft/80
            backdrop-blur-2xl
            p-5
            shadow-[0_20px_60px_rgba(91,33,182,0.10)]
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
                flex
                items-center
                justify-center
                bg-purple-100
                text-purple-700
              "
            >
              <FiSend size={19} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                Send Message
              </h2>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Selected guardians
              </p>
            </div>
          </div>

          {/* =========================
              SELECTED COUNT
          ========================= */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-purple-200
              bg-purple-50
              p-4
            "
          >
            <GrGroup size={24} className="text-purple-600" />

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-purple-800
                "
              >
                {selectedStudents.length} Students Selected
              </p>

              <p
                className="
                  text-xs
                  text-purple-500
                  mt-1
                "
              >
                Only selected students will receive the message
              </p>
            </div>
          </div>

          {/* =========================
              SELECTED STUDENT LIST
          ========================= */}

          {selectedStudents.length > 0 && (
            <div
              className="
                mt-4
                max-h-40
                overflow-y-auto
                space-y-2
              "
            >
              {selectedStudents.map((student) => (
                <div
                  key={student._id}
                  className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      bg-white/60
                      border
                      border-gray-200
                      px-3
                      py-2
                    "
                >
                  <div>
                    <p
                      className="
                          text-sm
                          font-semibold
                        "
                    >
                      {student.name}
                    </p>

                    <p
                      className="
                          text-xs
                          text-gray-500
                        "
                    >
                      {student.phone}
                    </p>
                  </div>

                  <Tag color="error">Absent</Tag>
                </div>
              ))}
            </div>
          )}

          {/* =========================
              MESSAGE
          ========================= */}

          <div className="mt-5">
            {/* <textarea
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              maxLength={200}
              placeholder="Write your message..."
              className="
                w-full
                h-32
                rounded-xl
                border
                border-gray-300
                bg-white/70
                p-3
                text-sm
                outline-none
                resize-none
                focus:border-purple-500
                focus:ring-2
                focus:ring-purple-100
              "
            /> */}
          </div>

          {/* =========================
              SEND BUTTON
          ========================= */}

          <Button
            type="primary"
            block
            size="large"
            icon={<FiSend />}
            disabled={selectedStudents.length === 0 || !smsMessage.trim()}
            onClick={handleSendMessage}
            className="
              !mt-3
              !h-11
              !rounded-xl
              !bg-purple-600
              !border-purple-600
              !font-semibold
            "
          >
            Send Message
          </Button>

          {/* =========================
              INFO
          ========================= */}

          <div
            className="
              mt-4
              rounded-xl
              bg-purple-50
              p-3
              text-xs
              text-gray-600
            "
          >
            ⓘ Attendance is saved directly to each student's profile.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
