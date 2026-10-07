import React, { useState } from "react";
import { Table, Select, Tag } from "antd";
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined } from "@ant-design/icons";

import { useGetTodayCollectionQuery } from "../../redux/services/studentsApiServices/studentApiServices";
import { feeStyle } from "../../hooks/fee";

const TodayCollection = () => {
  const [feeType, setFeeType] = useState("all");

  const { data, isLoading } = useGetTodayCollectionQuery(
    feeType !== "all" ? { feeType } : {},
  );

  const collections = data?.data || [];

  const feeColor = (type) => {
    const colors = {
      "Admission Fee": "purple",
      "Monthly Fee": "green",
      "Exam Fee": "blue",
      "Hand Note Fee": "orange",
      "Scholarship Fee": "cyan",
    };

    return colors[type] || "default";
  };

  const columns = [
    {
      title: "Name",

      dataIndex: "name",

      render: (text) => (
        <div
          className="
flex
items-center
gap-3
font-urbanist"
        >
          <div
            className="
h-9
w-9

rounded-full

bg-gradient-to-br

from-brand-primary

to-brand-secondary

flex

items-center

justify-center

text-white

font-bold"
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

      key: "studentId",

      render: (id) => (
        <div
          className="
    inline-flex
    rounded-xl
    border
    border-purple-200
    bg-gradient-to-r
    from-purple-50
    to-violet-50
    px-3
    py-1
    font-bold
    text-purple-700
    shadow-[0_4px_12px_rgba(124,58,237,0.15)]
    "
        >
          {id}
        </div>
      ),
    },
    {
      title: "Fee Type",

      dataIndex: "feeType",

      key: "feeType",

      render: (type) => (
        <div
          className={`
      inline-flex
      items-center
      rounded-xl
      border
      backdrop-blur-xl
      px-3
      py-1.5
      text-sm
      font-bold
      tracking-wide
      transition-all
      duration-300
      hover:-translate-y-0.5
      ${feeStyle(type).box}
      `}
        >
          {type}
        </div>
      ),
    },

    {
      title: "Amount",

      dataIndex: "amount",

      key: "amount",

      render: (amount) => (
        <div
          className="
      inline-flex
      items-center
      rounded-xl
      border
      border-purple-200
      bg-gradient-to-r
      from-purple-50
      via-violet-50
      to-indigo-50
      px-4
      py-1.5
      font-extrabold
      text-purple-700
      shadow-[0_5px_18px_rgba(124,58,237,0.22)]
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:shadow-[0_8px_25px_rgba(124,58,237,0.35)]
      "
        >
          <span className="mr-1 text-purple-500">৳</span>

          {Number(amount).toLocaleString()}
        </div>
      ),
    },

    {
      title: "Transaction ID",

      dataIndex: "transactionId",

      key: "transactionId",

      render: (id) => (
        <span
          className="
   font-semibold
   text-gray-600
   "
        >
          {id}
        </span>
      ),
    },

    {
      title: "Payment Time",

      dataIndex: "paidAt",

      key: "paidAt",

      render: (time) => (
        <div
          className="
   inline-flex
   items-center
   gap-2
   rounded-xl
   border
   border-purple-200
   bg-gradient-to-r
   from-purple-50
   to-violet-50
   px-3
   py-1.5
   font-semibold
   text-purple-700
   shadow-[0_4px_15px_rgba(124,58,237,0.18)]
   "
        >
          <ClockCircleOutlined className="text-purple-600" />

          {time}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 font-urbanist">
      {/* HEADER TOTAL */}

      <div>
        <div
          className="
absolute
-right-10
-top-10
h-40
w-40
rounded-full
bg-green-400/20
blur-3xl
"
        />

        <div
          className="
relative
flex
justify-between
items-center
"
        >
          <div>
            <h1
              className="
text-3xl
font-extrabold
text-gray-900
"
            >
              Today's Collection
            </h1>

            <div
              className="
              mt-4
  inline-flex
  items-center
  gap-2
  rounded-xl
  border
  border-purple-200
  bg-gradient-to-r
  from-purple-50
  to-violet-50
  px-3
  py-1.5
  text-sm
  font-semibold
  text-purple-700
  shadow-[0_4px_15px_rgba(124,58,237,0.18)]
  backdrop-blur-xl
  transition-all
  duration-300
  hover:-translate-y-0.5
  hover:shadow-[0_8px_22px_rgba(124,58,237,0.3)]
  "
            >
              <CalendarOutlined
                className="
    text-purple-600
    text-base
    "
              />

              <span>{data?.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}

      <div
        className="
  rounded-[28px]
  border
  border-white/40
  bg-white/40
  backdrop-blur-xl
  p-5
  shadow-[0_20px_60px_rgba(91,33,182,0.10)]
  "
      >
        <div
          className="
    flex
    flex-col
    lg:flex-row
    lg:items-center
    lg:justify-between
    gap-4
    "
        >
          {/* Filter */}
          <Select
            size="large"
            value={feeType}
            onChange={setFeeType}
            className="w-full lg:w-60"
            options={[
              {
                value: "all",
                label: "All Fee Type",
              },
              {
                value: "Admission Fee",
                label: "Admission Fee",
              },
              {
                value: "Monthly Fee",
                label: "Monthly Fee",
              },
              {
                value: "Exam Fee",
                label: "Exam Fee",
              },
              {
                value: "Hand Note Fee",
                label: "Hand Note Fee",
              },
              {
                value: "Scholarship Fee",
                label: "Scholarship Fee",
              },
            ]}
          />

          {/* Total Collection */}
          <div
            className="
      relative
      overflow-hidden
      flex
      items-center
      gap-4
      rounded-2xl
      border
      border-purple-200/60
      bg-white/40
      px-5
      py-3
      backdrop-blur-xl
      shadow-[0_10px_35px_rgba(124,58,237,0.18)]
      w-full
      lg:w-auto
      "
          >
            {/* Glow */}
            <div
              className="
        absolute
        -right-6
        -top-6
        h-24
        w-24
        rounded-full
        bg-purple-500/20
        blur-2xl
        "
            />

            {/* Icon */}
            <div
              className="
        relative
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-purple-600
        via-violet-500
        to-indigo-600
        text-white
        shadow-[0_8px_25px_rgba(124,58,237,0.45)]
        "
            >
              <span className="text-2xl font-bold">৳</span>
            </div>

            {/* Amount */}
            <div className="relative">
              <p
                className="
          text-xs
          font-semibold
          text-gray-500
          "
              >
                Total Collection
              </p>

              <h2
                className="
          whitespace-nowrap
          text-2xl
          font-extrabold
          bg-gradient-to-r
          from-purple-600
          via-violet-500
          to-indigo-600
          bg-clip-text
          text-transparent
          "
              >
                ৳ {data?.totalAmount?.toLocaleString() || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div
        className="
rounded-[28px]
border
border-white/40
bg-white/50
backdrop-blur-2xl
p-5
shadow-[0_20px_60px_rgba(91,33,182,0.10)]
overflow-hidden
"
      >
        <Table
          columns={columns}
          dataSource={collections}
          rowKey="transactionId"
          loading={isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
};

export default TodayCollection;
