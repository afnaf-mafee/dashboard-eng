import { CheckCircle, Clock3, Download, Eye, Send, Users } from "lucide-react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Modal,
  Form,
  InputNumber,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices";
const ResultManagement = () => {
  const [openModal, setOpenModal] = useState(false);
     const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
 const { data: batchData, isLoading: batchLoading } = useGetBatchesQuery();

  const [form] = Form.useForm();
  const handleCloseModal = () => {
    form.resetFields();

    setEditingStudent(null);

    setOpenModal(false);
  };
  const data = [
    {
      key: 1,
      name: "Sakib Ahmed",
      id: "429535",
      class: "One",
      exam: "Half Yearly",
      marks: "450 / 500",
      grade: "A+",
      status: "Completed",
    },
    {
      key: 2,
      name: "Sharif Hasan",
      id: "212580",
      class: "One",
      exam: "Half Yearly",
      marks: "390 / 500",
      grade: "A",
      status: "Completed",
    },
    {
      key: 3,
      name: "Afnat Rahman",
      id: "759546",
      class: "Two",
      exam: "Half Yearly",
      marks: "285 / 500",
      grade: "B",
      status: "Completed",
    },
    {
      key: 4,
      name: "Daud Khan",
      id: "697130",
      class: "Two",
      exam: "Half Yearly",
      marks: "-",
      grade: "-",
      status: "Pending",
    },
  ];

  const openResultModal = (record) => {
    setSelectedStudent(record);

    setOpenModal(true);

    form.setFieldsValue({
      studentName: record.name,
      studentId: record.id,
      class: record.class,
      exam: record.exam,
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      width: 60,
    },

    {
      title: "Name",
      dataIndex: "name",

      render: (name) => (
        <div className="flex items-center gap-3">
          <div
            className="
 w-10
 h-10
 rounded-full
 bg-gradient-to-r
 from-brand-primary
 to-brand-accent
 flex
 items-center
 justify-center
 text-white
 font-bold
 "
          >
            {name.charAt(0)}
          </div>

          <span className="font-semibold">{name}</span>
        </div>
      ),
    },

    {
      title: "Student ID",
      dataIndex: "id",
    },

    {
      title: "Class",
      dataIndex: "class",

      render: (value) => (
        <span
          className="
 bg-purple-soft
 text-brand-secondary
 px-3
 py-1
 rounded-lg
 "
        >
          {value}
        </span>
      ),
    },

    {
      title: "Exam",
      dataIndex: "exam",
    },

    {
      title: "Marks",
      dataIndex: "marks",

      render: (value) => <span className="font-semibold">{value}</span>,
    },

    {
      title: "Grade",
      dataIndex: "grade",

      render: (value) => (
        <Tag color="green" className="rounded-full px-3">
          {value}
        </Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",

      render: (value) =>
        value === "Completed" ? (
          <Tag color="green">● Completed</Tag>
        ) : (
          <Tag color="orange">● Pending</Tag>
        ),
    },

    {
      title: "Action",

      fixed: "right",

      render: (_, record) => (
        <Button
          onClick={() => openResultModal(record)}
          className="
 border-purple-400
 text-brand-secondary
 rounded-xl
 "
        >
          {record.status === "Completed" ? "Edit" : "Add"}
        </Button>
      ),
    },
  ];

  return (
    <div
      className="
space-y-6
font-urbanest
[&_*]:font-urbanest
"
    >
      <div
        className="
flex
flex-col
lg:flex-row
justify-between
gap-4
"
      >
        <div>
          <h1
            className="
text-3xl
font-bold
text-text-primary
"
          >
            Result Management
          </h1>

          <p className="text-text-secondary">
            Set individual student results and send to all with one click
          </p>
        </div>

        <div className="flex gap-3">
          <Button icon={<Eye size={18} />} className="rounded-xl h-11">
            Preview
          </Button>

          <Button
            icon={<Send size={18} />}
            className="
rounded-xl
h-11
text-white
bg-gradient-to-r
from-brand-primary
to-brand-accent
border-none
"
          >
            Send Results To All
          </Button>
        </div>
      </div>

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"
      >
        <Stat icon={<Users />} title="120" text="Total Students" />

        <Stat icon={<CheckCircle />} title="108" text="Results Added" />

        <Stat icon={<Clock3 />} title="12" text="Pending Results" />

        <Stat icon={<Send />} title="-" text="Last Sent" />
      </div>

      <div
        className="
rounded-[28px]
border
border-border
bg-surface-soft/80
backdrop-blur-xl
p-4
md:p-6
shadow-[0_20px_60px_rgba(91,33,182,0.10)]
"
      >
        <div
          className="
flex
flex-col
md:flex-row
gap-3
mb-5
"
        >
          <Input
            placeholder="Search by name, ID or phone"
            prefix={<SearchOutlined />}
            className="h-11 rounded-xl"
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
            icon={<Download />}
            className="
rounded-xl
bg-gradient-to-r
from-brand-primary
to-brand-accent
text-white
"
          >
            Export
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            x: 1100,
          }}
          className="
font-urbanest
[&_*]:font-urbanest
"
        />
      </div>

      {/* RESULT MODAL */}

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
      footer={[
          <Button
            key="cancel"
            onClick={handleCloseModal}
            className="!rounded-xl !font-urbanist"
          >
            Cancel
          </Button>,

          <Button
            key="submit"
            type="primary"
            // loading={isCreating}
            // disabled={isCreating}
            // onClick={handleSubmitStudent}
            className="!rounded-xl !border-0 !bg-gradient-to-r !from-brand-primary !to-brand-secondary !font-urbanist !font-semibold"
          >
           Save
          </Button>,
        ]}
        width={750}
        centered
        className="
font-urbanest
[&_*]:font-urbanest
"
      >
        <div>
          <h2
            className="
text-2xl
font-bold
text-text-primary
"
          >
            {selectedStudent?.status === "Completed"
              ? "Edit Result"
              : "Add Result"}
          </h2>

          <p
            className="
text-text-secondary
mb-6
"
          >
            Enter student subject wise marks
          </p>

          <Form form={form} layout="vertical">
            <div
              className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"
            >
              <Form.Item label="Student Name" name="studentName">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Student ID" name="studentId">
                <Input disabled />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Test Type */}
              <Select
                size="large"
                placeholder="Select test"
                className="w-full"
                options={[
                  {
                    value: "Item Test",
                    label: "Item Test",
                  },
                  {
                    value: "Weekly Test",
                    label: "Weekly Test",
                  },
                  {
                    value: "Monthly Test",
                    label: "Monthly Test",
                  },
                  {
                    value: "Model Test",
                    label: "Model Test",
                  },
                  {
                    value: "Grammar Test",
                    label: "Grammar Test",
                  },
                  {
                    value: "Quiz",
                    label: "Quiz",
                  },
                ]}
              />

              {/* Obtained Marks */}
              <Input
                size="large"
                type="number"
                placeholder="Obtained Marks"
                min={0}
                className="w-full"
              />
            </div>

            <div
              className="
flex
justify-end
gap-3
mt-6
"
            >
       

           
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

const Stat = ({ icon, title, text }) => (
  <div
    className="
font-urbanest
[&_*]:font-urbanest
rounded-[24px]
border
border-border
bg-surface-soft/80
p-5
shadow-[0_15px_40px_rgba(91,33,182,0.08)]
"
  >
    <div className="text-brand-secondary">{icon}</div>

    <h2
      className="
text-2xl
font-bold
mt-3
"
    >
      {title}
    </h2>

    <p
      className="
text-text-secondary
text-sm
"
    >
      {text}
    </p>
  </div>
);

export default ResultManagement;
