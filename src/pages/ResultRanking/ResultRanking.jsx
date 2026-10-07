import { Table, Select, DatePicker, Tag, Card, Empty } from "antd";

import { useState } from "react";

import dayjs from "dayjs";

import { useGetResultRankingQuery } from "../../redux/services/studentsApiServices/studentApiServices";
import { FiCopy } from "react-icons/fi";
import { CalendarDays, ClipboardList, Trophy } from "lucide-react";

const ResultRanking = () => {
  const [date, setDate] = useState(dayjs());

  const [selectedClass, setSelectedClass] = useState("all");

  const [selectedBatch, setSelectedBatch] = useState("all");

  const [selectedTime, setSelectedTime] = useState("all");

  const params = {
    date: date ? date.format("YYYY-MM-DD") : undefined,

    className: selectedClass !== "all" ? selectedClass : undefined,

    batch: selectedBatch !== "all" ? selectedBatch : undefined,

    time: selectedTime !== "all" ? selectedTime : undefined,
  };

  const { data, isLoading, isFetching } = useGetResultRankingQuery(params);

  const rankingData = data?.data || [];

  const columns = [
    {
      title: "#",

      dataIndex: "rank",

      width: 70,
    },
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
  title: "Exam",

  dataIndex: "examType",

  render: (value) => (
    <span
      className="
        inline-flex
        items-center
        rounded-xl
        border
        border-indigo-200
        bg-gradient-to-r
        from-indigo-50
        to-purple-50
        px-3
        py-1
        text-sm
        font-bold
        text-indigo-700
        shadow-sm
      "
    >
      {value}
    </span>
  ),
}
,

    {
  title: "Exam Number",

  dataIndex: "examNumber",

  render: (value) => (
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
        to-indigo-50
        px-3
        py-1.5
        text-sm
        font-bold
        text-purple-700
        shadow-[0_4px_15px_rgba(124,58,237,0.15)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_8px_20px_rgba(124,58,237,0.25)]
      "
    >
      <ClipboardList
        size={17}
        className="text-purple-600"
      />

      <span>
        {value}
      </span>

    </div>
  ),
}
,
 {
  title: "Obtained Marks",

  dataIndex: "obtainedMarks",

  render: (value) => (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-emerald-200
        bg-gradient-to-r
        from-emerald-50
        to-green-50
        px-3
        py-1.5
        text-sm
        font-bold
        text-emerald-700
        shadow-[0_4px_15px_rgba(16,185,129,0.18)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_8px_20px_rgba(16,185,129,0.28)]
      "
    >
      <Trophy
        size={17}
        className="text-emerald-600"
      />

      <span>
        {value}
      </span>

    </div>
  ),
}
,
 {
  title: "Published Date",

  dataIndex: "publishedDate",

  render: (date) => (
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
        to-indigo-50
        px-3
        py-1.5
        text-sm
        font-semibold
        text-purple-700
        shadow-[0_4px_15px_rgba(124,58,237,0.15)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_8px_20px_rgba(124,58,237,0.25)]
      "
    >
      <CalendarDays
        size={17}
        className="text-purple-600"
      />

      <span>
        {date}
      </span>

    </div>
  ),
}

  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Result Ranking</h1>

      <Card>
        <div
          className="
          flex
          flex-wrap
          gap-3
          mb-5
        "
        >
          <DatePicker
            size="large"
            value={date}
            allowClear
            onChange={(value) => setDate(value)}
          />

          <Select
            size="large"
            className="w-44"
            value={selectedClass}
            onChange={setSelectedClass}
            options={[
              {
                value: "all",
                label: "All Class",
              },

              {
                value: "One",
                label: "One",
              },

              {
                value: "Two",
                label: "Two",
              },

              {
                value: "Three",
                label: "Three",
              },

              {
                value: "Four",
                label: "Four",
              },

              {
                value: "Five",
                label: "Five",
              },

              {
                value: "Six",
                label: "Six",
              },
            ]}
          />

          <Select
            size="large"
            className="w-60"
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
            className="w-40"
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
            ]}
          />
        </div>

        <Table
          rowKey={(record) =>
            `${record.studentId}-${record.examType}-${record.rank}`
          }
          columns={columns}
          dataSource={rankingData}
          loading={isLoading || isFetching}
          locale={{
            emptyText: <Empty description="No Result Found" />,
          }}
          pagination={{
            pageSize: 20,
          }}
          scroll={{
            x: "max-content",
          }}
        />
      </Card>
    </div>
  );
};

export default ResultRanking;
