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
  const { data: batchData, isLoading: batchLoading } = useGetBatchesQuery();
  const { data: studentData, isLoading } = useGetStudentsQuery();
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
    },
    {
      title: "Phone",
      dataIndex: "phone",

      render: (phone) => (
        <div
          className="
      flex
      items-center
      gap-2
      "
        >
          <div
            className="
        inline-flex
        items-center
        rounded-xl
        bg-gradient-to-r
        from-blue-50
        to-indigo-50
        border
        border-purple-200
        px-3
        py-2
        "
          >
            <span
              className="
          font-urbanist
          font-bold
          text-purple-700
          tracking-wide
          "
            >
              {phone}
            </span>
          </div>
        </div>
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

    {
      title: "History",

      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => setSelectedStudent(record)}
          className="
rounded-xl
bg-gradient-to-r
from-purple-600
to-indigo-600
border-none
font-semibold
"
        >
          View
        </Button>
      ),
    },
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

        <div
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
        </div>
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
          {/* Total Students */}
          <div className="flex h-11 items-center gap-3 rounded-xl border border-border bg-surface px-4 lg:ml-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TeamOutlined className="text-primary" />
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xl font-bold text-text">22</span>
              <span className="text-sm font-medium text-text-muted">
                Total Students
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
