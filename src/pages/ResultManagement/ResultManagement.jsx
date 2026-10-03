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
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices";
import {
  useGetStudentsQuery,
  useAddResultMutation,
  useSendResultsToAllMutation,
} from "../../redux/services/studentsApiServices/studentApiServices";
import { FiCopy } from "react-icons/fi";
const ResultManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data: studentData, isLoading } = useGetStudentsQuery();
  const { data: batchData, isLoading: batchLoading } = useGetBatchesQuery();
  const [addResult, { isLoading: resultLoading }] = useAddResultMutation();
  const [sendResultsToAll, { isLoading: sendLoading }] =
    useSendResultsToAllMutation();
  const [form] = Form.useForm();

  const data = studentData?.data || [];

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
  const handleSubmitResult = async () => {
    try {
      const values = await form.validateFields();

      await addResult({
        id: selectedStudent._id,

        resultData: {
          examType: values.examType,
          examNumber: Number(values.examNumber),
          obtainedMarks: Number(values.obtainedMarks),
        },
      }).unwrap();

      message.success("Result added successfully");

      form.resetFields();

      setOpenModal(false);
    } catch (error) {
      console.log(error);

      message.error(error?.data?.message || "Failed to add result");
    }
  };
  const handleCloseModal = () => {
    form.resetFields();

    setSelectedStudent(null);

    setOpenModal(false);
  };

  const handleSendAllResults = () => {
    Modal.confirm({
      title: "Are you sure?",

      content: "All pending results will be sent to students/guardians.",

      okText: "Yes, Send",

      cancelText: "Cancel",

      async onOk() {
        try {
          await sendResultsToAll().unwrap();

          message.success("All results sent successfully");
        } catch (error) {
          message.error(error?.data?.message || "Failed to send results");
        }
      },
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-sm font-bold text-white">
            {record.name.charAt(0)}
          </div>

          <div>
            <p className="font-urbanist font-semibold text-text-primary">
              {record.name}
            </p>

            <p className="text-xs text-text-muted">{record.id}</p>
          </div>
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
      title: "Time",
      dataIndex: "time",
      key: "section",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "section",
    },

  {
  title: "Action",

  fixed: "right",

  render: (_, record) => (
    <Button
      onClick={() => openResultModal(record)}
      className="
      
        !cursor-pointer
        !rounded-xl
        !border
        !border-white/20
        !bg-gradient-to-r
        !from-brand-primary/80
        !to-brand-secondary/80
        !px-5
        !py-1
        !text-sm
        !font-semibold
        !text-white
        !shadow-lg
        !shadow-brand-primary/0
        !backdrop-blur-md
        !transition-all
        !duration-300
        hover:!scale-105
        hover:!shadow-xl
        hover:!shadow-brand-secondary/40
        hover:!brightness-110
        active:!scale-95
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
            loading={sendLoading}
            disabled={sendLoading}
            onClick={handleSendAllResults}
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
            loading={resultLoading}
            disabled={resultLoading}
            onClick={handleSubmitResult}
            className="!rounded-xl !border-0 !bg-gradient-to-r !from-brand-primary !to-brand-secondary !font-semibold"
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
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="Student Name">
                <Input value={selectedStudent?.name} disabled />
              </Form.Item>

              <Form.Item label="Student ID">
                <Input value={selectedStudent?.studentId} disabled />
              </Form.Item>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Form.Item
                label="Exam Type"
                name="examType"
                rules={[
                  {
                    required: true,
                    message: "Select exam type",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select test"
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
              </Form.Item>

              <Form.Item
                label="Exam Number"
                name="examNumber"
                rules={[
                  {
                    required: true,
                    message: "Enter exam number",
                  },
                ]}
              >
                <Input size="large" type="number" placeholder="Exam Number" />
              </Form.Item>

              <Form.Item
                label="Obtained Marks"
                name="obtainedMarks"
                rules={[
                  {
                    required: true,
                    message: "Enter obtained marks",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="number"
                  placeholder="Obtained Marks"
                />
              </Form.Item>
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
