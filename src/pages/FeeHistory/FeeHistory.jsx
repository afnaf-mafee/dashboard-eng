import React, { useState } from "react";
import { Input, Select, Table, Tag, Button, Modal, Skeleton } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices";
import { useGetStudentsQuery } from "../../redux/services/studentsApiServices/studentApiServices";

const FeeHistory = () => {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
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

  const { data: studentData, isLoading } = useGetStudentsQuery(searchParams);
  // Replace with API data
  const students = studentData?.data || [];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const MonthCell = ({ student, month }) => {
    const payment = student.feePayments?.find((item) => item.month === month);

    return payment ? (
      <button
        className="
rounded-xl
bg-gradient-to-r
from-green-400
to-green-600
px-3
py-2
text-white
font-urbanist
font-bold
shadow-md
hover:scale-105
transition
"
      >
        ৳ {payment.amount}
      </button>
    ) : (
      <button
        className="
rounded-xl
bg-red-500
px-3
py-2
text-white
font-urbanist
font-bold
shadow-md
animate-pulse
"
      >
        Due
      </button>
    );
  };

  const columns = [
    {
      title: "Student",
      key: "student",

      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className="
h-10 w-10
rounded-full
bg-gradient-to-r
from-purple-500
to-indigo-500
flex items-center
justify-center
text-white
font-bold
"
          >
            {record.name.charAt(0)}
          </div>

          <div>
            <p
              className="
font-urbanist
font-semibold
text-gray-800
"
            >
              {record.name}
            </p>

            <p className="text-xs text-gray-400">{record.studentId}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Class",
      dataIndex: "className",

      render: (value) => (
        <Tag
          className="
rounded-lg
px-3
py-1
font-semibold
"
          color="purple"
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
    },
    {
      title: "Monthly Fee",

      dataIndex: "monthlyFee",

      render: (value) => (
        <span
          className="
font-bold
text-purple-700
"
        >
          ৳ {value}
        </span>
      ),
    },

    ...months.map((month) => ({
      title: month.slice(0, 3),

      key: month,

      render: (_, record) => <MonthCell student={record} month={month} />,
    })),
  ];

  return (
    <div className="w-full">
      {/* Header */}

      <div
        className="
mb-6
flex
justify-between
items-center
"
      >
        <div>
          <h1
            className="
font-urbanist
text-3xl
font-bold
text-gray-800
"
          >
            Fee History
          </h1>

          <p
            className="
text-gray-500
"
          >
            Manage student monthly payments
          </p>
        </div>

        {/* <div
          className="
rounded-2xl
bg-gradient-to-r
from-purple-600
to-indigo-600
px-5
py-3
text-white
font-bold
shadow-lg
"
        >
          <DollarOutlined />
          Total Collection
        </div> */}
      </div>

      {/* Filter */}

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

      {/* Table */}

      <div
        className="
rounded-2xl
border
border-purple-100
bg-white
shadow-[0_10px_40px_rgba(91,33,182,0.08)]
overflow-hidden
"
      >
        {isLoading ? (
          <div className="space-y-4 p-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
flex
items-center
gap-4
rounded-2xl
border
border-purple-100
bg-gradient-to-r
from-purple-50
to-indigo-50
p-4
"
              >
                {/* Avatar Skeleton */}

                <Skeleton.Avatar active size={42} />

                <div className="flex-1">
                  <Skeleton
                    active
                    paragraph={{
                      rows: 1,
                    }}
                    title={{
                      width: "30%",
                    }}
                  />
                </div>

                {/* Fee Skeleton */}

                <div
                  className="
hidden
md:block
"
                >
                  <Skeleton.Button active size="small" />
                </div>

                {/* Month Skeleton */}

                <div
                  className="
hidden
lg:block
"
                >
                  <Skeleton.Button active size="small" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={students}
            rowKey="_id"
            scroll={{
              x: "max-content",
            }}
            pagination={{
              pageSize: 10,
            }}
            bordered
            className="fee-history-table"
            rowClassName={() => "hover:bg-purple-50 transition"}
          />
        )}
      </div>

      {/* History Modal */}

      <Modal
        open={!!selectedStudent}
        onCancel={() => setSelectedStudent(null)}
        footer={null}
        title={
          <div>
            <h2 className="font-urbanist text-xl font-bold">
              {selectedStudent?.name}
            </h2>

            <p className="text-gray-500">Payment History</p>
          </div>
        }
      >
        {selectedStudent?.feePayments?.map((item, index) => (
          <div
            key={index}
            className="
mb-3
flex
justify-between
rounded-xl
bg-gray-50
p-4
"
          >
            <span className="font-semibold">{item.month}</span>

            <span
              className="
font-bold
text-green-600
"
            >
              ৳ {item.amount}
            </span>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default FeeHistory;
