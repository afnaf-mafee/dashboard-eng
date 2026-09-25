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
} from "@ant-design/icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
import { GrGroup } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import {
  useGetStudentsQuery,
  useBulkMarkAttendanceMutation,
} from "../../redux/services/studentsApiServices/studentApiServices.js";
import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices.js";

const Attendance = () => {
  // =========================
  // DATE
  // =========================
  const [selectedDate, setSelectedDate] = useState(dayjs().tz("Asia/Dhaka"));
  const { data: batchData, isLoading: batchLoading } = useGetBatchesQuery();
  // =========================
  // SEARCH
  // =========================
  const [searchText, setSearchText] = useState("");

  // =========================
  // CLASS
  // =========================
  const [selectedClass, setSelectedClass] = useState("all");

  // =========================
  // SELECTED STUDENTS
  // =========================
  const [selectedStudents, setSelectedStudents] = useState([]);

  // =========================
  // MESSAGE
  // =========================
  const [smsMessage, setSmsMessage] = useState(
    "Your child was absent today. Please contact the school if needed.",
  );

  // =========================
  // GET STUDENTS
  // =========================
  const { data, isLoading, isFetching } = useGetStudentsQuery();

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
  // MARK ATTENDANCE
  // =========================

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

    // =========================
    // STUDENT ID
    // =========================
    {
      title: "Student ID",
      dataIndex: "studentId",
    },

    // =========================
    // CLASS
    // =========================
    {
      title: "Class",

      dataIndex: "className",

      render: (value) => (
        <Tag
          className="
            !border-0
            !bg-purple-100
            !text-purple-700
            !rounded-lg
            !font-semibold
          "
        >
          {value}
        </Tag>
      ),
    },

    // =========================
    // SECTION
    // =========================
    {
      title: "Section",
      dataIndex: "section",
    },

    // =========================
    // PHONE
    // =========================
    {
      title: "Phone",
      dataIndex: "phone",
    },
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
            flex-col
            md:flex-row
            gap-3
          "
        >
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="Search student..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="
              !rounded-xl
              max-w-md
            "
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
            loading={batchLoading}
            options={
              batchData?.data?.map((batch) => ({
                value: "d",
                label: batch.days,
              })) || []
            }
          />
          <Select
            size="large"
            placeholder="Select time"
            options={[
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
            ]}
          />

          <Button
            size="large"
            onClick={handleSelectAllAbsent}
            className="
              !rounded-xl
              !border-purple-300
              !bg-purple-50
              !text-purple-700
              !font-semibold
            "
          >
            ✓ Select All Absent
          </Button>

          <Button
            size="large"
            onClick={handleClearSelection}
            disabled={selectedStudents.length === 0}
            className="
              !rounded-xl
            "
          >
            Clear Selection
          </Button>
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
            <label
              className="
                block
                text-sm
                font-semibold
                mb-2
              "
            >
              Message
            </label>

            <textarea
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
            />

            <div
              className="
                text-right
                text-xs
                text-gray-400
                mt-1
              "
            >
              {smsMessage.length}/200
            </div>
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
