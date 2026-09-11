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
} from "@ant-design/icons";
import {
  HiOutlineWallet,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import FeeSummaryCards from "../../components/students/FeeSummaryCards";
import { useGetStudentsQuery,useAddFeePaymentMutation,} from "../../redux/services/studentsApiServices/studentApiServices";
const FeeCollection = () => {
  const [open, setOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const { data: studentData, isLoading } = useGetStudentsQuery();
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
      error?.data?.message || "Payment failed. Please try again."
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
      title: "Student ID",

      dataIndex: "studentId",
    },

    {
      title: "Class",

      dataIndex: "className",

      render: (value) => (
        <span
          className="
rounded-lg
bg-purple-100
px-3
py-1
text-xs
font-semibold
text-purple-700"
        >
          {value}
        </span>
      ),
    },

    {
      title: "Batch",

      dataIndex: "batch",
    },

    {
      title: "Monthly Fee",

      dataIndex: "monthlyFee",

      render: (value) => (
        <span
          className="
font-bold
text-purple-600"
        >
          ৳ {value}
        </span>
      ),
    },

    {
      title: "Status",

      dataIndex: "status",

      render: (value) =>
        value === "Paid" ? (
          <span
            className="
rounded-full
bg-green-100
px-3
py-1
text-xs
font-semibold
text-green-600"
          >
            🟢 Paid
          </span>
        ) : (
          <span
            className="
rounded-full
bg-red-100
px-3
py-1
text-xs
font-semibold
text-red-600"
          >
            🔴 Due
          </span>
        ),
    },

    {
      title: "Action",

      render: (_, record) => (
        <button
          onClick={() => handlePay(record)}
          className="

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

      <FeeSummaryCards total={studentData?.count} />

      <div
        className="
rounded-[28px]

border
border-border

bg-surface-soft

backdrop-blur-2xl

p-5

mb-5"
      >
        <div
          className="
flex
gap-3
items-center"
        >
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="
Search by name, ID or phone..."
            className="
max-w-md
!rounded-xl"
          />

          <Select
            size="large"
            placeholder="
All Classes"
            className="
w-44"
          />

          <Select
            size="large"
            placeholder="
All Status"
            className="
w-44"
          />

          <Button
            icon={<DownloadOutlined />}
            className="
ml-auto

!rounded-xl

!bg-gradient-to-r

!from-brand-primary

!to-brand-secondary

!text-white

!border-0

"
          >
            Export
          </Button>
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
  className="!h-12 !rounded-xl"
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
    font-semibold
    !text-white
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
