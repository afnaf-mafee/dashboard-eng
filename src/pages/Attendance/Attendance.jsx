import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  DatePicker,
  Card,
  message,
} from "antd";

import {
  SearchOutlined,
  SendOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdNat } from "react-icons/md";
import { GrGroup } from "react-icons/gr";

const Attendance = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  console.log(selectedStudents);

  const students = [
    {
      key: "1",
      name: "Sakib",
      studentId: "429535",
      className: "One",
      batch: "A",
      guardian: "Kar3im2 Ahmed",
      phone: "01373242373",
      status: "Present",
    },

    {
      key: "2",
      name: "sharif",
      studentId: "212580",
      className: "Two",
      batch: "A",
      guardian: "Kar3im2 Ahmed",
      phone: "01373242372",
      status: "Absent",
    },

    {
      key: "3",
      name: "afnaf",
      studentId: "759546",
      className: "two",
      batch: "A",
      guardian: "Kar3im2 Ahmed",
      phone: "01372242277",
      status: "Present",
    },

    {
      key: "4",
      name: "da332344ef",
      studentId: "697130",
      className: "two",
      batch: "A",
      guardian: "Kar3im2 Ahmed",
      phone: "01372242777",
      status: "Absent",
    },
  ];

  // Select checkbox handler

  const rowSelection = {
    selectedRowKeys: selectedStudents.map((student) => student.key),

    onChange: (selectedKeys, selectedRows) => {
      setSelectedStudents(selectedRows);
    },
  };

  // Select all absent

  const handleSelectAllAbsent = () => {
    const absentStudents = students.filter(
      (student) => student.status === "Absent",
    );

    setSelectedStudents(absentStudents);
  };

  // Send message

  const handleSendMessage = () => {
    if (selectedStudents.length === 0) {
      message.warning("Please select students first");

      return;
    }

    const receivers = selectedStudents.map((student) => student.phone);

    console.log("Message sending to:", receivers);

    message.success(`Message sent to ${selectedStudents.length} students`);
  };

  const columns = [
    {
      title: "",
      width: 50,
    },

    {
      title: "Name",
      dataIndex: "name",

      render: (text) => (
        <div
          className="
flex items-center gap-3"
        >
          <div
            className="
           
w-10 h-10 rounded-full
bg-gradient-to-br
from-purple-600
to-purple-400
text-white
font-bold
flex items-center
justify-center"
          >
            {text.charAt(0)}
          </div>

          <span
            className="
font-semibold"
          >
            {text}
          </span>
        </div>
      ),
    },

    {
      title: "Student ID",
      dataIndex: "studentId",
    },

    {
      title: "Class",
      dataIndex: "className",

      render: (value) => (
        <Tag
          className="
!border-0
!rounded-lg
!bg-purple-100
!text-purple-700
!font-semibold"
        >
          {value}
        </Tag>
      ),
    },

    {
      title: "Batch",
      dataIndex: "batch",
    },

    {
      title: "Guardian",
      dataIndex: "guardian",
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },

    //     {
    //       title: "Status",

    //       render: (_, record) =>
    //         record.status === "Absent" ? (
    //           <Tag
    //             className="
    // !rounded-full
    // !border-0
    // !bg-red-100
    // !text-red-600
    // !font-semibold"
    //           >
    //             ● Absent
    //           </Tag>
    //         ) : (
    //           <Tag
    //             className="
    // !rounded-full
    // !border-0
    // !bg-green-100
    // !text-green-600
    // !font-semibold"
    //           >
    //             ● Present
    //           </Tag>
    //         ),
    //     },

    //     {
    //       title: "Action",

    //       render: () => (
    //         <span
    //           className="
    // text-xl"
    //         >
    //           ⋮
    //         </span>
    //       ),
    //     },
  ];
  return (
    <div className="w-full">
      {/* Header */}

      <div
        className="
flex justify-between
items-center
mb-6"
      >
        <div>
          <h1
            className="
text-3xl
font-bold
text-gray-900"
          >
            Attendance
          </h1>

          <p
            className="
text-gray-500"
          >
            Track daily attendance and notify absent students
          </p>
        </div>

        <DatePicker
          size="large"
          suffixIcon={<CalendarOutlined />}
          className="
rounded-xl"
        />
      </div>

      {/* Toolbar */}

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
        <div
          className="
flex gap-3
items-center "
        >
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="
Search by name, ID or phone..."
            className="
!rounded-xl
max-w-md"
          />

          <Select
            size="large"
            placeholder="
All Classes"
            className="
w-44"
          />

          <Button
            onClick={handleSelectAllAbsent}
            className="
    group
    relative
    overflow-hidden
    
    !h-11
    !rounded-xl
    
    !border
    !border-purple-300
    
    !bg-purple-50
    
    !px-5
    
    !font-urbanist
    !font-semibold
    
    !text-purple-700
    
    transition-all
    duration-300
    
    hover:!scale-105
    
    hover:!border-purple-500
    
    hover:!bg-purple-100
    
    hover:!shadow-lg
    
    hover:!shadow-purple-200
    
    active:!scale-95
  "
          >
            <span
              className="
relative
z-10
flex
items-center
gap-2
"
            >
              ✓ Select All
            </span>
          </Button>
        </div>
      </div>

      {/* Selected Count */}

      <div
        className=" mt-5
          rounded-[28px]
            border border-border
            bg-surface-soft/80
            backdrop-blur-2xl
            p-6
            shadow-[0_20px_60px_rgba(91,33,182,0.10)]
grid
grid-cols-1
xl:grid-cols-4
gap-5"
      >
        {/* Table */}

        <div
          className=" p-4
xl:col-span-3


 rounded-2xl border border-border bg-surface-soft shadow-[0_10px_40px_rgba(91,33,182,0.06)] backdrop-blur-xl
overflow-hidden



"
        >
          <Table
            columns={columns}
            dataSource={students}
            rowSelection={rowSelection}
            pagination={{
              pageSize: 8,
            }}
            rowKey="key"
          />
        </div>

        {/* Message Panel */}

        <div
          className="
bg-white
rounded-2xl
 rounded-2xl border border-border bg-surface-soft shadow-[0_10px_40px_rgba(91,33,182,0.06)] backdrop-blur-xl
p-5"
        >
          <h2
            className="
text-xl
font-bold
mb-2"
          >
            ✉ Bulk SMS Preview
          </h2>

          <div
            className="
    flex
    items-center
    gap-3
    
    rounded-[18px]
    
    border
    border-purple-200/60
    
    bg-gradient-to-r
    from-purple-50
    to-purple-100/60
    
    backdrop-blur-2xl
    
    px-5
    py-2
    
    text-purple-700
    
    shadow-[0_20px_60px_rgba(91,33,182,0.10)]
    
    transition-all
    duration-300
    
    hover:shadow-[0_25px_70px_rgba(91,33,182,0.15)]
  "
          >
            <div
              className="
    flex
    
  "
            >
              <GrGroup size={24} className="shrink-0 block" />
            </div>

            <div>
              <p
                className="
        font-urbanist
        text-sm
        font-bold
        text-purple-800
      "
              >
                {selectedStudents.length} Students Selected
              </p>

              <p
                className="
        mt-1
        text-xs
        font-medium
        text-purple-500
      "
              >
                Ready to send message to selected guardians
              </p>
            </div>
          </div>

          <label
            className="
font-semibold"
          >
            Message
          </label>

          <textarea
            className="

w-full

mt-2

h-32

rounded-xl

border

p-3

resize-none"
            defaultValue={`
Your child was absent today.
Please contact the school if needed.
`}
          />

          <button
            onClick={() => {
              navigate(`/students-profile/${record._id}`);
            }}
            className="
    group
    cursor-pointer
    
    flex
    items-center
    justify-center
    gap-2
    
    rounded-xl
    
    border
    border-white/20
    
    bg-gradient-to-r
    from-brand-primary/80
    to-brand-secondary/80
    
    px-5
    py-2
    
    font-urbanist
    font-semibold
    text-white
    
    shadow-lg
    text-[14px]
    
    shadow-brand-primary/30
    
    backdrop-blur-md
    
    transition-all
    duration-300
    
    hover:scale-105
    
    hover:shadow-xl
    hover:shadow-brand-secondary/40
    
    hover:brightness-110
    
    active:scale-95
     mt-3
  "
            title="Send Message"
          >
            <FiSend
              size={16}
              className="
      transition-transform
      duration-300
      group-hover:translate-x-1
      group-hover:-translate-y-1
    "
            />
            Send Message
          </button>
          <div
            className="

mt-5

bg-purple-50

rounded-xl

p-4

text-sm

text-gray-600"
          >
            ⓘ This message will be sent to the guardians of all selected
            students.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
