import React, { useMemo, useState } from "react";

import { Table, Button, Input, Select, Tag, Spin, message } from "antd";

import { SearchOutlined, TeamOutlined } from "@ant-design/icons";

import { FiCopy, FiSend } from "react-icons/fi";

import { GrGroup } from "react-icons/gr";

import {
  useGetStudentsQuery,
  useSendMessageToStudentsMutation,
} from "../../redux/services/studentsApiServices/studentApiServices.js";

const SendMessage = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");

  const [messageText, setMessageText] = useState("");

  const searchParams = {
    search: search || undefined,

    className: selectedClass !== "all" ? selectedClass : undefined,

    batch: selectedBatch !== "all" ? selectedBatch : undefined,
  };

  const { data, isLoading, isFetching } = useGetStudentsQuery(searchParams);
  const [sendMessageToStudents, { isLoading: messageLoading }] =
    useSendMessageToStudentsMutation();

  const students = data?.data || [];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const text = search.toLowerCase();

      return (
        !text ||
        student.name?.toLowerCase().includes(text) ||
        String(student.studentId).includes(text) ||
        student.phone?.includes(text)
      );
    });
  }, [students, search]);

  const rowSelection = {
    selectedRowKeys: selectedStudents.map((item) => item._id),

    onChange: (_, rows) => {
      setSelectedStudents(rows);
    },
  };

  const columns = [
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
  ];

  const handleSendMessage = async () => {
    if (!selectedStudents.length) {
      message.warning("Please select at least one student.");
      return;
    }

    if (!messageText.trim()) {
      message.warning("Please write a message first.");
      return;
    }

    const finalMessage = `
Dear Guardian,

${messageText.trim()}

Thank you,
ELC Office.
`;

    try {
      const result = await sendMessageToStudents({
        students: selectedStudents.map((student) =>
          typeof student === "string" ? student : student._id,
        ),

        messageText: finalMessage,
      }).unwrap();

      message.success({
        content:
          result.message ||
          `${selectedStudents.length} messages sent successfully.`,
        duration: 3,
      });

      setSelectedStudents([]);

      setMessageText("");
    } catch (error) {
      message.error({
        content: error?.data?.message || "Failed to send messages.",
        duration: 3,
      });
    }
  };

  if (isLoading) {
    return (
      <div
        className="
flex justify-center py-20
"
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* HEADER */}

      <div
        className="
flex
justify-between
items-center
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
            Send Message
          </h1>

          <p
            className="
text-gray-500 mt-1
"
          >
            Send bulk message to guardians
          </p>
        </div>
      </div>

      {/* SEARCH PANEL */}
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
    px-3
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
                {data?.count}
              </span>

             
            </div>
          </div>
        </div>
      </div>

      <div
        className="
grid
xl:grid-cols-4
gap-5
"
      >
        {/* TABLE */}

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

        {/* MESSAGE PANEL */}

        <div
          className="
rounded-[28px]
border
border-white/40
bg-white/40
backdrop-blur-2xl
p-5
shadow-[0_20px_60px_rgba(91,33,182,0.15)]
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
              <FiSend />
            </div>

            <div>
              <h2
                className="
text-xl
font-bold
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

                  <Tag
                    style={{
                      border: "1px solid #bbf7d0",
                      borderRadius: "999px",
                      padding: "2px 12px",
                      background: "#f0fdf4",
                      color: "#15803d",
                      fontWeight: 700,
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(22,163,74,0.15)",
                    }}
                  >
                    Selected
                  </Tag>
                </div>
              ))}
            </div>
          )}
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="
Write your message...
"
            className="
mt-5
w-full
h-36
rounded-xl
border
border-gray-300
bg-white/70
p-3
resize-none
outline-none
focus:border-purple-500
"
          />

          <Button
            type="primary"
            block
            size="large"
            icon={<FiSend />}
            onClick={handleSendMessage}
            className="
!mt-4
!h-11
!
rounded-xl
!bg-purple-600
!border-purple-600
!font-semibold
shadow-lg
"
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
