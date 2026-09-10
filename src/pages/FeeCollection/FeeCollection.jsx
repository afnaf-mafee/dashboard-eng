import { useState } from "react";
import { Table, Button, Input, Select, Tag, Modal, DatePicker } from "antd";
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
  HiOutlineCheckCircle
} from "react-icons/hi2";
import FeeSummaryCards from "../../components/students/FeeSummaryCards";
const FeeCollection = () => {
  const [open, setOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const students = [
    {
      key: "1",
      name: "Sakib Ahmed",
      studentId: "429535",
      className: "One",
      batch: "A",
      monthlyFee: "1,313",
      status: "Paid",
    },

    {
      key: "2",
      name: "Sharif Hossain",
      studentId: "212580",
      className: "Two",
      batch: "A",
      monthlyFee: "1,500",
      status: "Due",
    },

    {
      key: "3",
      name: "Afnaf Rahman",
      studentId: "759546",
      className: "Two",
      batch: "A",
      monthlyFee: "1,500",
      status: "Due",
    },

    {
      key: "4",
      name: "Dihan Islam",
      studentId: "697130",
      className: "Three",
      batch: "B",
      monthlyFee: "1,800",
      status: "Paid",
    },

    {
      key: "5",
      name: "Mehedi Hasan",
      studentId: "886034",
      className: "One",
      batch: "A",
      monthlyFee: "1,500",
      status: "Due",
    },

    {
      key: "6",
      name: "Rafiul Islam",
      studentId: "980903",
      className: "Four",
      batch: "B",
      monthlyFee: "2,000",
      status: "Due",
    },

    {
      key: "7",
      name: "Nusrat Jahan",
      studentId: "855079",
      className: "Three",
      batch: "A",
      monthlyFee: "1,500",
      status: "Paid",
    },

    {
      key: "8",
      name: "Tasmia Akter",
      studentId: "782200",
      className: "Two",
      batch: "A",
      monthlyFee: "1,500",
      status: "Due",
    },
  ];
  const handlePay = (student) => {
    setSelectedStudent(student);

    setOpen(true);
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
     
<FeeSummaryCards/>

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

      <div
        className="

rounded-[28px]

border

border-border

bg-white

overflow-hidden

shadow-[0_20px_60px_rgba(91,33,182,0.10)]

"
      >
        <Table
          columns={columns}
          dataSource={students}
          pagination={{
            pageSize: 8,
          }}
        />
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

          <div
            className="
rounded-2xl

bg-purple-50

p-4

mb-5"
          >
            <div
              className="
flex
items-center
gap-3"
            >
              <div
                className="
h-12
w-12

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
                {selectedStudent?.name?.charAt(0)}
              </div>

              <div>
                <h3
                  className="
font-bold"
                >
                  {selectedStudent?.name}
                </h3>

                <p
                  className="
text-sm
text-gray-500"
                >
                  ID: {selectedStudent?.studentId}
                  &nbsp; | &nbsp; Class: {selectedStudent?.className}
                  &nbsp; | &nbsp; Batch: {selectedStudent?.batch}
                </p>
              </div>
            </div>
          </div>

          <label
            className="
font-semibold"
          >
            Amount *
          </label>

          <Input
            size="large"
            prefix="৳"
            defaultValue={selectedStudent?.monthlyFee}
            className="
my-2
!rounded-xl"
          />

          <label
            className="
font-semibold"
          >
            Payment Date *
          </label>

          <DatePicker
            size="large"
            className="
w-full
my-2
!rounded-xl"
            suffixIcon={<CalendarOutlined />}
          />

          <label
            className="
font-semibold"
          >
            Select Month *
          </label>

          <Select
            size="large"
            className="
w-full
my-2
!rounded-xl"
            placeholder="Choose month"
            options={[
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
            ].map((month) => ({
              label: month,

              value: month,
            }))}
          />

          <label
            className="
font-semibold"
          >
            Note (Optional)
          </label>

          <Input.TextArea
            rows={3}
            className="
mt-2
!rounded-xl"
            placeholder="
Add note..."
          />

          <div
            className="
flex
gap-3
mt-6"
          >
            <Button
              block
              onClick={() => setOpen(false)}
              className="
!rounded-xl
!h-12"
            >
              Cancel
            </Button>

            <Button
              block
              className="
!rounded-xl
!h-12

!bg-gradient-to-r

!from-brand-primary

!to-brand-secondary

!text-white

!border-0

font-semibold"
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default FeeCollection;
