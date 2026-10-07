import {
  Plus,
  Trophy,
  ArrowLeft,
  CalendarCheck,
  UserRound,
  WalletCards,
  Pencil,
  Copy,
  Phone,
  BarChart3,
  UsersRound,
  NotebookText,
  FileText,
  CreditCard,
  School,
} from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MonthlyFeeCard from "../../components/students/MonthlyFeeCard";
import StudentProfileImage from "../../components/students/StudentProfileImage";
import {
  useGetStudentByIdQuery,
  useAddInvoiceMutation,
  useMakeStudentActiveMutation,
  useUpdateStudentMutation
} from "../../redux/services/studentsApiServices/studentApiServices";
import StudentProfileSkeleton from "../../components/students/StudentProfileSkeleton";
import Invoice from "../../components/students/Invoice";
import StudentAttendance from "../../components/students/StudentAttendance";
import { Modal, Input, InputNumber, message, Select, Form, Button } from "antd";
import ResultCard from "../../components/students/ResultCard";
const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("Attendance");
  const [open, setOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const navigate = useNavigate()
  const [editOpen, setEditOpen] = useState(false);
  
  const [form] = Form.useForm();
  const [feeType, setFeeType] = useState("Select Type");
  const { id } = useParams();
  const { data, isLoading } = useGetStudentByIdQuery(id);
  const [addInvoice, { isLoading: invoiceLoading }] = useAddInvoiceMutation();
  const [makeStudentActive] = useMakeStudentActiveMutation();
  const [updateStudent, { isLoading: updateLoading }] =
  useUpdateStudentMutation();
  const student = data?.data || {};

  const handlePayment = async () => {
    if (!paymentAmount) {
      message.error("Please enter amount");
      return;
    }

    try {
      // Admission Fee দিলে Due student Active হবে
      if (student?.status === "Due" && feeType === "Admission Fee") {
        await makeStudentActive(student._id).unwrap();
      }

      const invoiceData = {
        studentId: student._id,
        amount: Number(paymentAmount),
        feeType: feeType,
      };

      // Invoice create
      await addInvoice(invoiceData).unwrap();

      message.success("Payment added successfully");

      setOpen(false);
      setPaymentAmount("");
      setFeeType("Monthly Fee");
    } catch (error) {
      message.error(error?.data?.message || "Payment failed");
    }
  };
  if (isLoading) {
    return <StudentProfileSkeleton />;
  }
const handleUpdateStudent = async () => {

  try {

    const values = await form.validateFields();


    const updateData = {

      name: values.name,

      className: values.className,

      batch: values.section,

      time: values.time,

      school: values.school,

      phone: values.phone,

      monthlyFee: Number(values.monthlyFee),

      admissionFee: Number(values.admissionFee),

    };


    await updateStudent({

      id: student._id,

      data: updateData,

    }).unwrap();


    message.success("Student updated successfully");


    setEditOpen(false);


  } catch(error){

    message.error(
      error?.data?.message || "Update failed"
    );

  }

};
  return (
    <div className="space-y-6">
      {/* Main Grid */}
      <div className="">
        {/* LEFT CONTENT */}
        <div className="xl:col-span-2 space-y-6">
          {/* =========================================
    STUDENT PROFILE TOP HEADER
========================================= */}

          <div className="space-y-6">
            {/* =========================================
      PAGE TITLE + ACTION BUTTONS
  ========================================= */}

            <div
              className="
      flex
      flex-col
      sm:flex-row
      sm:items-center
      justify-between
      gap-4
      px-1
    "
            >
              {/* LEFT */}

              <div>
                <h1
                  className="
          text-3xl
          md:text-[32px]
          leading-tight
          font-bold
          tracking-tight
          text-text-primary
        "
                >
                  Student Profile
                </h1>

                <p
                  className="
          mt-1
          text-sm
          md:text-[15px]
          text-text-secondary
        "
                >
                  View student details, track attendance and manage information
                </p>
              </div>

              {/* RIGHT BUTTONS */}

              <div
                className="
        flex
        items-center
        gap-3
      "
              >
                {/* Back Button */}

                <button
                  onClick={() => navigate(-1)}
                  className="
          group
          flex
          items-center
          justify-center
          gap-2
          h-12
          px-5
          rounded-xl
          border
          border-purple-200
          bg-white
          text-[#343254]
          text-sm
          font-semibold
          shadow-sm
          transition-all
          duration-300
          hover:border-purple-400
          hover:text-purple-600
          hover:shadow-md
          cursor-pointer
        "
                >
                  <ArrowLeft
                    size={19}
                    className="
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
                  />

                  <span className="hidden sm:block">Back to Students</span>
                </button>

                {/* Edit Profile */}

                <button
                  onClick={() => {
                    form.setFieldsValue({
                      name: student?.name,
                      className: student?.className,

                      section: String(student?.batch || student?.section || ""),
                      time: student?.time,
                      school: student?.school,
                      phone: student?.phone,
                      monthlyFee: student?.monthlyFee,
                      admissionFee: student?.admissionFee,
                    });

                    setEditOpen(true);
                  }}
                  className="
          group
          relative
          flex
          items-center
          justify-center
          gap-2
          h-12
          px-6
          rounded-xl
          bg-gradient-to-r
          from-brand-primary
          to-brand-accent
          text-white
          text-sm
          font-semibold
          shadow-[0_8px_25px_rgba(124,58,237,0.35)]
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-[0_10px_35px_rgba(124,58,237,0.45)]
          active:scale-95
          cursor-pointer
          overflow-hidden
        "
                >
                  <span
                    className="
            absolute
            inset-0
            bg-white/10
            -translate-x-full
            group-hover:translate-x-full
            transition-transform
            duration-700
          "
                  />

                  <Pencil size={18} className="relative z-10" />

                  <span className="relative z-10">Edit Profile</span>
                </button>
              </div>
            </div>

            {/* =========================================
      PROFILE INFORMATION CARD
  ========================================= */}

            <div
              className="
      rounded-[24px]
      border
      border-border
      bg-surface-soft/80
      backdrop-blur-2xl
      px-6
      py-6
      shadow-[0_20px_60px_rgba(91,33,182,0.08)]
    "
            >
              <div
                className="
        flex
        flex-col
        xl:flex-row
        xl:items-center
        gap-7
      "
              >
                {/* =====================================
          STUDENT BASIC INFO
      ===================================== */}

                <div
                  className="
          flex
          items-center
          gap-5
          flex-1
          min-w-0
        "
                >
                  {/* Avatar */}

                  <div className="shrink-0">
                    <StudentProfileImage id={student?.studentId} />
                  </div>

                  {/* Name + Details */}

                  <div className="min-w-0 ">
                    <h2
                      className="
              text-2xl
              md:text-[27px]
              font-bold
              text-text-primary
              truncate
            "
                    >
                      {student?.name || "Student"}
                    </h2>

                    {/* Tags */}

                    <div
                      className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-2
            "
                    >
                      {/* Class */}

                      <span
                        className="
                rounded-lg
                bg-purple-100
                px-3
                py-1.5
                text-xs
                font-semibold
                text-purple-700
              "
                      >
                        Class: {student?.className || "-"}
                      </span>

                      {/* Section */}

                      <span
                        className="
                rounded-lg
                bg-gray-100
                px-3
                py-1.5
                text-xs
                font-semibold
                text-gray-600
              "
                      >
                        Batch: {student?.section || "-"}
                      </span>

                      {/* Status */}
                      <span
                        className={`
    flex
    items-center
    gap-2
    rounded-xl
    border
    px-3
    py-1.5
    text-xs
    font-bold
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-0.5
    ${
      student?.status === "Due"
        ? `
          border-red-200/60
          bg-red-50/60
          text-red-600
          shadow-[0_6px_20px_rgba(239,68,68,0.18)]
        `
        : `
          border-green-200/60
          bg-green-50/60
          text-green-600
          shadow-[0_6px_20px_rgba(34,197,94,0.18)]
        `
    }
  `}
                      >
                        <span
                          className="
      relative
      flex
      h-3
      w-3
      items-center
      justify-center
    "
                        >
                          {/* Glow Pulse */}
                          <span
                            className={`
        absolute
        h-3
        w-3
        animate-ping
        rounded-full
        opacity-40
        ${student?.status === "Due" ? "bg-red-500" : "bg-green-500"}
      `}
                          />

                          {/* Main Dot */}
                          <span
                            className={`
        relative
        h-2.5
        w-2.5
        rounded-full
        shadow-lg
        ${
          student?.status === "Due"
            ? "bg-red-500 shadow-red-400/60"
            : "bg-green-500 shadow-green-400/60"
        }
      `}
                          />
                        </span>

                        {student?.status === "Due" ? "Inactive" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =====================================
          DIVIDER
      ===================================== */}

                <div
                  className="
          hidden
          xl:block
          w-px
          h-24
          bg-purple-200/70
        "
                />

                {/* =====================================
          GUARDIAN INFORMATION
      ===================================== */}

                <div
                  className="
          xl:w-[230px]
          md:w-full
          shrink-0
          space-y-4
        "
                >
                  {/* Guardian */}

                  <div className="flex items-center gap-3">
                    <School size={24} className="text-[#41405F]" />

                    <div>
                      <p
                        className="
                text-xs
                text-text-secondary
              "
                      >
                        School
                      </p>

                      <p
                        className="
                mt-0.5
                text-sm
                font-semibold
                text-text-primary
              "
                      >
                        {student?.school || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}

                  <div className="flex items-center gap-3">
                    <Phone size={23} className="text-[#41405F]" />

                    <div>
                      <p
                        className="
                text-xs
                text-text-secondary
              "
                      >
                        Phone
                      </p>

                      <div
                        className="
                flex
                items-center
                gap-2
              "
                      >
                        <p
                          className="
                  text-sm
                  font-semibold
                  text-text-primary
                "
                        >
                          {student?.phone || "-"}
                        </p>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(student?.phone || "");
                          }}
                          className="
                  text-text-secondary
                  hover:text-brand-secondary
                  cursor-pointer
                "
                          title="Copy Phone"
                        >
                          <Copy size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =====================================
          DIVIDER
      ===================================== */}

                <div
                  className="
              
          hidden
         
          w-px
          h-24
          bg-purple-200/70
        "
                />

                {/* =====================================
          MONTHLY FEE
      ===================================== */}

                <div
                  className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-purple-50
          px-5
          py-4
          xl:min-w-[155px]
        "
                >
                  <div
                    className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-purple-100
            text-purple-600
          "
                  >
                    <WalletCards size={24} />
                  </div>

                  <div>
                    <p
                      className="
              text-xs
              text-text-secondary
            "
                    >
                      Monthly Fee
                    </p>

                    <p
                      className="
              mt-1
              text-xl
              font-bold
              text-purple-600
            "
                    >
                      ৳ {Number(student?.monthlyFee || 0).toLocaleString()}
                    </p>
                  </div>
                  {/* Pay Now */}
                </div>

                {/* =====================================
          ATTENDANCE RATE
      ===================================== */}

                {/* =====================================
          STATUS
      ===================================== */}

                {/* <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-green-50
          px-5
          py-4
          xl:min-w-[140px]
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-green-100
          "
        >

          <span
            className="
              h-3
              w-3
              rounded-full
              bg-green-500
            "
          />

        </div>


        <div>

          <p
            className="
              text-xs
              text-text-secondary
            "
          >
            Status
          </p>

          <p
            className="
              mt-1
              text-base
              font-bold
              text-green-600
            "
          >
            Active
          </p>

        </div>

      </div> */}
                <button
                  onClick={() => setOpen(true)}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl
    bg-gradient-to-r from-violet-600 to-purple-600 cursor-pointer
    text-white font-medium shadow-lg shadow-purple-200
    hover:from-purple-700 hover:to-violet-700
    hover:shadow-purple-300 hover:-translate-y-0.5
    transition-all duration-300"
                >
                  <CreditCard
                    size={17}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>Pay Now</span>
                </button>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div
            className="
    rounded-[28px]
    border border-border
    bg-surface-soft/80
    backdrop-blur-xl
    p-6
  "
          >
            <div
              className="
      flex
      gap-2
      border-b
      border-border
      pb-0
      overflow-x-auto
      scrollbar-hide
    "
            >
              {[
                {
                  name: "Attendance",
                  icon: <CalendarCheck size={19} />,
                },

                {
                  name: "Fee Details",
                  icon: <WalletCards size={19} />,
                },

                {
                  name: "Result",
                  icon: <NotebookText size={19} />,
                },
                {
                  name: "Invoice",
                  icon: <UsersRound size={19} />,
                },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`
          relative
          flex
          items-center
          gap-2
          whitespace-nowrap
          px-5
          py-3
          text-sm
          font-semibold
          transition-all
          duration-300
          cursor-pointer

          ${
            activeTab === tab.name
              ? "text-brand-secondary"
              : "text-text-secondary hover:text-brand-secondary"
          }
        `}
                >
                  {/* Icon */}

                  <span
                    className={`
            transition-all
            duration-300

            ${
              activeTab === tab.name
                ? "text-brand-secondary"
                : "text-text-secondary"
            }
          `}
                  >
                    {tab.icon}
                  </span>

                  {/* Tab Name */}

                  <span>{tab.name}</span>

                  {/* Active Bottom Line */}

                  {activeTab === tab.name && (
                    <span
                      className="
              absolute
              left-0
              right-0
              -bottom-[1px]
              h-[3px]
              rounded-t-full
              bg-gradient-to-r
              from-brand-primary
              to-brand-accent
            "
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}

            <div className="mt-6">
              {/* Attendance */}

              {activeTab === "Attendance" && (
                <StudentAttendance student={student} />
              )}

              {/* Personal Info */}

              {activeTab === "Personal Info" && (
                <div className="space-y-4">
                  <div
                    className="
            rounded-2xl
            border
            border-border
            bg-surface
            p-5
          "
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-purple-100
                text-purple-600
              "
                      >
                        <UserRound size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          Personal Information
                        </h3>

                        <p className="text-sm text-text-secondary">
                          Student personal details
                        </p>
                      </div>
                    </div>

                    <div
                      className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
                    >
                      <InfoItem label="Student Name" value={student?.name} />

                      <InfoItem label="Student ID" value={student?.studentId} />

                      <InfoItem label="Class" value={student?.className} />

                      <InfoItem label="Section" value={student?.section} />

                      <InfoItem label="Phone" value={student?.phone} />

                      <InfoItem
                        label="Join Date"
                        value={
                          student?.joinDate
                            ? new Date(student.joinDate).toLocaleDateString(
                                "en-GB",
                              )
                            : "-"
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Fee Details */}

              {activeTab === "Fee Details" && (
                <MonthlyFeeCard
                  amount={student?.monthlyFee}
                  feePayments={student?.feePayments}
                />
              )}

              {/* Invoice*/}

              {activeTab === "Invoice" && (
                <Invoice invoice={student?.invoices} />
              )}

              {/* Notes */}

              {activeTab === "Result" && (
                <>
                  <ResultCard results={student?.results || []} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
      </div>

      <Modal
        title="Make Payment"
        open={open}
        onCancel={() => {
          setOpen(false);
          setPaymentAmount("");
        }}
        footer={null}
        centered
      >
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-lg">{student?.name}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payment Amount */}
            <div>
              <label className="block mb-2 font-medium">Payment Amount</label>

              <Input
                size="large"
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                prefix="৳"
              />
            </div>

            {/* Fee Type */}
            <div>
              <label className="block mb-2 font-medium">Fee Type</label>
              <Select
                size="large"
                className="w-full"
                value={feeType}
                onChange={(v) => setFeeType(v)}
                options={[
                  {
                    label: "Admission Fee",
                    value: "Admission Fee",
                  },

                  {
                    label: "Exam Fee",
                    value: "Exam Fee",
                  },
                  {
                    label: "Hand Note Fee",
                    value: "Hand Note Fee",
                  },
                  {
                    label: "Scholarship Fee",
                    value: "Scholarship Fee",
                  },
                  {
                    label: "Others",
                    value: "Others",
                  },
                ]}
              />
            </div>
          </div>

          <button
            disabled={invoiceLoading}
            onClick={handlePayment}
            className={`
    w-full
    h-11
    rounded-xl
    bg-purple-600
    text-white
    font-semibold
    cursor-pointer
    placeholder:font-urbanist 

    ${invoiceLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-purple-700"}
  `}
          >
            {invoiceLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Confirm Payment"
            )}
          </button>
        </div>
      </Modal>

      <Modal
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        centered
        width={600}
        destroyOnClose
        title={
          <div>
            <h2 className="font-urbanist text-xl font-bold text-text-primary">
              Edit Student Profile
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Update student information below
            </p>
          </div>
        }
        footer={[
          <Button
            key="cancel"
            onClick={() => setEditOpen(false)}
            className="!rounded-xl"
          >
            Cancel
          </Button>,

       <Button
  key="update"
  type="primary"
  loading={updateLoading}
  disabled={updateLoading}
  onClick={handleUpdateStudent}
  className="
    !h-11
    !rounded-xl
    !border-0
    !bg-gradient-to-r
    !from-brand-primary
    !to-brand-secondary
    !font-semibold
    !shadow-lg
    !shadow-brand-primary/20
    transition-all
    duration-300
  "
>
  {updateLoading ? "Updating..." : "Update Student"}
</Button>
        ]}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item label="Student Name" name="name">
              <Input size="large" className="!rounded-xl" />
            </Form.Item>

            <Form.Item label="Class" name="className">
              <Select
                size="large"
                options={[
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
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item label="Batch" name="section">
              <Select
                size="large"
                options={[
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
            </Form.Item>

            <Form.Item label="Time" name="time">
              <Select
                size="large"
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
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item label="Admission Fee" name="admissionFee">
              <Input size="large" type="number" className="!rounded-xl" />
            </Form.Item>

            <Form.Item label="Monthly Fee" name="monthlyFee">
              <Input size="large" type="number" className="!rounded-xl" />
            </Form.Item>
          </div>

          <Form.Item label="School Name" name="school">
            <Input size="large" className="!rounded-xl" />
          </Form.Item>

          <Form.Item label="Guardian Phone" name="phone">
            <Input size="large" maxLength={11} className="!rounded-xl" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const Stat = ({ icon, title, text }) => (
  <div
    className="
  rounded-2xl
  border border-border
  bg-surface
  p-4
  "
  >
    <div className="text-brand-secondary">{icon}</div>

    <h3 className="mt-2 font-bold">{title}</h3>

    <p className="text-xs text-text-secondary">{text}</p>
  </div>
);

const Experience = () => (
  <div
    className="
  rounded-2xl
  border border-border
  bg-surface
  p-5
  "
  >
    <div className="flex justify-between">
      <div>
        <h3 className="font-bold">Graphic Designer</h3>

        <p
          className="
        text-sm
        text-text-secondary
        "
        >
          Dribble Inc
        </p>
      </div>

      <button
        className="
      flex items-center gap-1
      rounded-xl
      border border-border
      px-3 py-2
      text-sm
      "
      >
        <Plus size={15} />
        Add More
      </button>
    </div>

    <div
      className="
    mt-5
    flex
    gap-5
    text-sm
    text-text-secondary
    "
    >
      <span>Feb 2016 - Dec 2017</span>

      <span>New York, USA</span>
    </div>

    <p
      className="
    mt-4
    text-sm
    leading-6
    text-text-secondary
    "
    >
      There are many variations of passages of Lorem Ipsum available, but
      majority have suffered alteration in some form.
    </p>
  </div>
);

export default StudentProfile;
