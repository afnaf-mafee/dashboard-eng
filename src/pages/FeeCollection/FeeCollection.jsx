import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Modal,
  DatePicker,
  Skeleton,
  Form,
  message,
} from "antd";
import {
  SearchOutlined,
  WalletOutlined,
  CalendarOutlined,
  DownloadOutlined,
  CloseOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import {
  useGetStudentsQuery,
  useAddFeePaymentMutation,
} from "../../redux/services/studentsApiServices/studentApiServices";
import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices";
const FeeCollection = () => {
  const [open, setOpen] = useState(false);
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

  const [addFeePayment, { isLoading: isPaymentLoading }] =
    useAddFeePaymentMutation();
  const students = studentData?.data;
  const handlePay = (student) => {
    setSelectedStudent(student);

    setOpen(true);
  };
  const [form] = Form.useForm();
  const handleConfirmPayment = async () => {
    try {
      const values = await form.validateFields();

      const paymentData = {
        amount: Number(values.amount),
        month: values.month,
      };

      await addFeePayment({
        id: selectedStudent?._id,
        paymentData,
      }).unwrap();

      message.success("Payment completed successfully!");

      form.resetFields();
      setOpen(false);
    } catch (error) {
      console.log("Payment Failed:", error);

      message.error(
        error?.data?.message || "Payment failed. Please try again.",
      );
    }
  };

  const columns = [
    {
      title: "#",

      render: (_, __, index) => <span>{index + 1}</span>,
    },

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

    {
      title: "Action",

      render: (_, record) => (
        <button
          onClick={() => handlePay(record)}
          className="
cursor-pointer
flex
items-center
gap-2

rounded-xl

bg-gradient-to-r

from-brand-primary

to-brand-secondary


px-5

py-2

text-sm

font-semibold

text-white


shadow-lg

shadow-brand-primary/30


transition-all

duration-300


hover:scale-105

active:scale-95

"
        >
          <WalletOutlined />
          Pay Fee
        </button>
      ),
    },
  ];

  return (
    <div
      className="
w-full
font-urbanist
"
    >
      {/* Header */}

      <div
        className="
flex
justify-between
items-center
mb-6"
      >
        <div>
          <h1
            className="
text-3xl
font-bold
text-text-primary"
          >
            Fee Collection
          </h1>

          <p
            className="
text-text-muted"
          >
            Collect and manage student fees easily
          </p>
        </div>
      </div>

      {/* FILTERING */}
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
                {studentData?.count || studentData?.data?.length || 0}
              </span>

             
            </div>
          </div>
        </div>
      </div>
      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-soft shadow-[0_10px_40px_rgba(91,33,182,0.06)] backdrop-blur-xl">
        {isLoading ? (
          <div className="space-y-4 p-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl border border-border bg-white/50 p-4"
              >
                <Skeleton.Avatar active size={40} />

                <div className="flex-1">
                  <Skeleton
                    active
                    paragraph={{
                      rows: 1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-xl">
            <Table
              columns={columns}
              dataSource={studentData?.data || []}
              rowKey="_id"
              scroll={{
                x: "max-content",
              }}
              pagination={{
                pageSize: 8,
                showSizeChanger: false,
                showTotal: (total) => `Total ${total} students`,
              }}
            />
          </div>
        )}
      </div>
      {/* Payment Modal */}

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={500}
        centered
        closeIcon={<CloseOutlined />}
      >
        <div
          className="
font-urbanist"
        >
          <div
            className="
mb-5"
          >
            <h2
              className="
text-2xl
font-bold"
            >
              Pay Student Fee
            </h2>

            <p
              className="
text-gray-500"
            >
              Fill in the payment details below
            </p>
          </div>

          {/* Student Card */}
          <Form form={form} layout="vertical" className="mt-6">
            {/* Student Information */}

            <div className="mb-5 rounded-2xl bg-purple-50 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="
          flex h-12 w-12
          items-center justify-center
          rounded-full
          bg-gradient-to-br
          from-brand-primary
          to-brand-secondary
          font-bold
          text-white
        "
                >
                  {selectedStudent?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold">{selectedStudent?.name}</h3>

                  <p className="text-sm text-gray-500">
                    ID: {selectedStudent?.studentId}
                    &nbsp; | &nbsp; Class: {selectedStudent?.className}
                    &nbsp; | &nbsp; Batch: {selectedStudent?.batch}
                  </p>
                </div>
              </div>
            </div>

            {/* Amount */}

            <Form.Item
              label="Amount"
              name="amount"
              initialValue={selectedStudent?.monthlyFee}
              rules={[
                {
                  required: true,
                  message: "Please enter payment amount",
                },
              ]}
            >
              <Input
                size="large"
                type="number"
                prefix="৳"
                placeholder="Enter payment amount"
                className="!rounded-xl"
              />
            </Form.Item>

            {/* Month */}

            <Form.Item
              label="Select Month"
              name="month"
              rules={[
                {
                  required: true,
                  message: "Please select month",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Choose month"
                className="w-full"
                options={[
                  {
                    value: "January",
                    label: "January",
                  },
                  {
                    value: "February",
                    label: "February",
                  },
                  {
                    value: "March",
                    label: "March",
                  },
                  {
                    value: "April",
                    label: "April",
                  },
                  {
                    value: "May",
                    label: "May",
                  },
                  {
                    value: "June",
                    label: "June",
                  },
                  {
                    value: "July",
                    label: "July",
                  },
                  {
                    value: "August",
                    label: "August",
                  },
                  {
                    value: "September",
                    label: "September",
                  },
                  {
                    value: "October",
                    label: "October",
                  },
                  {
                    value: "November",
                    label: "November",
                  },
                  {
                    value: "December",
                    label: "December",
                  },
                ]}
              />
            </Form.Item>

            {/* Buttons */}

            <div className="mt-6 flex gap-3">
              <Button
                block
                disabled={isPaymentLoading}
                onClick={() => {
                  form.resetFields();
                  setOpen(false);
                }}
                className="!h-12 !rounded-xl !font-semibold"
              >
                Cancel
              </Button>

              <Button
                block
                loading={isPaymentLoading}
                disabled={isPaymentLoading}
                onClick={handleConfirmPayment}
                className="
    !h-12
    !rounded-xl
    !border-0
    !bg-gradient-to-r
    !from-brand-primary
    !to-brand-secondary
    
    !text-white
    !font-bold
  "
              >
                Confirm Payment
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default FeeCollection;
