import React from "react";
import { Table, Tag, Empty } from "antd";

import { useGetStudentsQuery } from "../../redux/services/studentsApiServices/studentApiServices";

const ResultRanking = () => {
  const { data: studentData, isLoading } = useGetStudentsQuery();

  const rankingData =
    studentData?.data
      ?.map((student) => {
        const latestResult = student.results?.[student.results.length - 1];

        return {
          key: student._id,

          name: student.name,

          studentId: student.studentId,

          className: student.className,

          examType: latestResult?.examType || "N/A",

          examNumber: latestResult?.examNumber || 0,

          obtainedMarks: latestResult?.obtainedMarks || 0,
        };
      })
      ?.sort((a, b) => b.obtainedMarks - a.obtainedMarks)
      ?.map((student, index) => ({
        ...student,

        rank: index + 1,
      })) || [];

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank) => (
        <Tag color={rank === 1 ? "gold" : rank === 2 ? "blue" : "default"}>
          #{rank}
        </Tag>
      ),
    },

    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },

    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },

    {
      title: "Exam",
      dataIndex: "examType",
      key: "examType",
    },

    {
      title: "ExamNumber",
      dataIndex: "examNumber",
      key: "examNumber",
    }, 

    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      key: "obtainedMarks",

      render: (mark) => (
        <span className="font-bold text-purple-600">{mark}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-urbanist">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Result Ranking</h1>

        <p className="text-text-secondary">Highest to lowest marks ranking</p>
      </div>

      <div
        className="
rounded-[28px]
border
border-border
bg-surface-soft
p-5
shadow-lg
"
      >
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={rankingData}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            x: 900,
          }}
          locale={{
            emptyText: <Empty description="No result found" />,
          }}
        />
      </div>
    </div>
  );
};

export default ResultRanking;
