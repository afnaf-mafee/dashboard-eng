import {
  Button,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Select,
  Skeleton,
  Table,
  Tag,
} from "antd";
import { useState } from "react";

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { FiCopy } from "react-icons/fi";
import {
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "../../redux/services/studentsApiServices/studentApiServices";
import { useNavigate } from "react-router-dom";
import { useGetBatchesQuery } from "../../redux/services/batchApiServices/batchApiServices";

const Students = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const [deleteStudent, setDeleteStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const searchParams = {
    className: selectedClass !== "all" ? selectedClass : undefined,
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
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [deleteStudentApi, { isLoading: isDeleting }] =
    useDeleteStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const { data: batchData, isLoading: batchLoading } = useGetBatchesQuery();
  // ==========================================
  // Add Student
  // ==========================================

  const handleOpenAddModal = () => {
    setEditingStudent(null);

    form.resetFields();
    console.log(form);

    setOpenModal(true);
  };

  // ==========================================
  // Edit Student
  // ==========================================

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);

    form.setFieldsValue({
      name: student.name,
      className: student.className,
      monthlyFee: student.monthlyFee,
      admissionFee: student.monthlyFee,
      section: student.section,
      guardian: student.guardian,
      phone: student.phone,
    });

    setOpenModal(true);
  };

  // ==========================================
  // Close Add/Edit Modal
  // ==========================================

  const handleCloseModal = () => {
    form.resetFields();

    setEditingStudent(null);

    setOpenModal(false);
  };

  // ==========================================
  // Add / Update Student
  // ==========================================

  const handleSubmitStudent = async () => {
    try {
      const values = await form.validateFields();

      const studentData = {
        name: values.name,
        className: values.className,
        monthlyFee: Number(values.monthlyFee),
        admissionFee: Number(values.admissionFee),

        section: values.section,
        guardian: values.guardian,
        phone: values.phone,
      };

      if (editingStudent) {
        await updateStudent({
          id: editingStudent._id,
          data: studentData,
        }).unwrap();

        message.success("Student added successfully!");
      } else {
        await createStudent(studentData).unwrap();

        message.success("Student added successfully!");
      }

      form.resetFields();
      setEditingStudent(null);
      setOpenModal(false);
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  // ==========================================
  // Delete Student
  // ==========================================
  const handleDeleteStudent = async () => {
    if (!deleteStudent) return;

    try {
      await deleteStudentApi(deleteStudent._id).unwrap();

      message.success(`${deleteStudent.name} deleted successfully!`);

      setDeleteStudent(null);
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete student");
    }
  };

  const getActionItems = (student) => [
    {
      key: "edit",
      label: "Edit Student",
      icon: <EditOutlined />,
      onClick: () => handleOpenEditModal(student),
    },

    {
      key: "delete",
      label: "Delete Student",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => setDeleteStudent(student),
    },
  ];

  // ==========================================
  // Table Columns
  // ==========================================

  const columns = [
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
      title: "Batch",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Monthly Fee",
      dataIndex: "monthlyFee",
      key: "monthlyFee",

      render: (fee) => (
        <div
          className="
    flex
    w-fit
    items-center
    rounded-lg
  
 
    bg-purple-50/10
    px-3
    py-1.5
    
    transition-all
    duration-300
  
    hover:shadow-md
  "
        >
          <span
            className="
      font-urbanist
      text-sm
      font-bold
      text-purple-700
    "
          >
            ৳ {Number(fee).toLocaleString()}
          </span>
        </div>
      ),
    },

    {
      title: "Guardian",
      dataIndex: "guardian",
      key: "guardian",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",

      render: (phone) => (
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-100"
          onClick={() => {
            navigator.clipboard.writeText(String(phone));
            message.success("Phone number copied!");
          }}
        >
          <span className="font-medium">{phone}</span>

          <FiCopy size={15} className="text-gray-400 hover:text-purple-600" />
        </div>
      ),
    },

    {
      title: "Profile",
      key: "profile",

      render: (_, record) => (
        <button
          onClick={() => {
            navigate(`/students-profile/${record._id}`);
          }}
          className="
        cursor-pointer 
        rounded-xl 
        border 
        border-white/20 
        bg-gradient-to-r 
        from-brand-primary/80 
        to-brand-secondary/80 
        px-5 
        py-1 
        text-sm 
        font-semibold 
        text-white 
        shadow-lg 
        text-[14px] 
        shadow-brand-primary/30 
        backdrop-blur-md 
        transition-all 
        duration-300 
        hover:scale-105 
        hover:shadow-xl 
        hover:shadow-brand-secondary/40 
        hover:brightness-110 
        active:scale-95
      "
          title="View Profile"
        >
          Profile
        </button>
      ),
    },
    {
      title: "",
      key: "action",
      align: "right",

      render: (_, record) => (
        <Dropdown
          menu={{
            items: getActionItems(record),
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-urbanist text-2xl font-bold text-text-primary sm:text-3xl">
            Students
          </h1>

          <p className="mt-1 text-sm text-text-muted">
            Manage all students and their information
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleOpenAddModal}
          className="!h-11 !rounded-xl !border-0 !bg-gradient-to-r !from-brand-primary !to-brand-secondary !px-5 !font-urbanist !font-semibold !shadow-lg !shadow-brand-primary/20"
        >
          Add Student
        </Button>
      </div>

      {/* ==========================================
          Search + Filter
      ========================================== */}

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

      {/* ==========================================
          Student Table
      ========================================== */}

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

      {/* ==========================================
          ADD / EDIT STUDENT MODAL
      ========================================== */}

      <Modal
        open={openModal}
        onCancel={handleCloseModal}
        centered
        width={600}
        destroyOnClose
        title={
          <div>
            <h2 className="font-urbanist text-xl font-bold text-text-primary">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>

            <p className="mt-1 text-sm font-normal text-text-muted">
              {editingStudent
                ? "Update student information"
                : "Enter student information below"}
            </p>
          </div>
        }
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
            loading={isCreating}
            disabled={isCreating}
            onClick={handleSubmitStudent}
            className="!rounded-xl !border-0 !bg-gradient-to-r !from-brand-primary !to-brand-secondary !font-urbanist !font-semibold"
          >
            {isCreating
              ? "⏳Adding Student..."
              : editingStudent
                ? "Update Student"
                : "Add Student"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" className="mt-6">
          {/* Name */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              label="Student Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter student name",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter student name"
                className="!rounded-xl"
              />
            </Form.Item>
            <Form.Item
              label="Class"
              name="className"
              rules={[
                {
                  required: true,
                  message: "Please select class",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select class"
                className="w-full"
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

          {/* Batch */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              label="Batch"
              name="section"
              rules={[
                {
                  required: true,
                  message: "Please select section",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select section"
                loading={batchLoading}
                options={
                  batchData?.data?.map((batch) => ({
                    value: "d",
                    label: batch.days,
                  })) || []
                }
              />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please select time",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select time"
                options={[
                  {
                    value: "Morning",
                    label: "Morning",
                  },
                  {
                    value: "Afternoon",
                    label: "Afternoon",
                  },
                  {
                    value: "Evening",
                    label: "Evening",
                  },
                ]}
              />
            </Form.Item>
          </div>

          {/* Section */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              label="Admission Fee"
              name="admissionFee"
              rules={[
                {
                  required: true,
                  message: "Please enter admission fee",
                },
              ]}
            >
              <Input
                size="large"
                type="number"
                placeholder="Enter admission fee"
                className="!rounded-xl"
              />
            </Form.Item>
            <Form.Item
              label="Monthly Fee"
              name="monthlyFee"
              rules={[
                {
                  required: true,
                  message: "Please enter monthly fee",
                },
              ]}
            >
              <Input
                size="large"
                type="number"
                placeholder="Enter monthly fee"
                className="!rounded-xl"
              />
            </Form.Item>
          </div>

          {/* Guardian */}

          <Form.Item
            label="School Name"
            name="school"
            rules={[
              {
                required: true,
                message: "Please enter school name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter school name"
              className="!rounded-xl"
            />
          </Form.Item>

          {/* Phone */}

          <Form.Item
            label="Guardian Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
              {
                pattern: /^01[3-9]\d{8}$/,
                message: "Enter a valid Bangladesh phone number",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="01XXXXXXXXX"
              maxLength={11}
              className="!rounded-xl"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* ==========================================
          DELETE CONFIRMATION MODAL
      ========================================== */}

      <Modal
        open={!!deleteStudent}
        onCancel={() => setDeleteStudent(null)}
        centered
        width={430}
        footer={[
          <Button
            key="cancel"
            onClick={() => setDeleteStudent(null)}
            className="!rounded-xl"
          >
            Cancel
          </Button>,

          <Button
            key="delete"
            danger
            type="primary"
            icon={<DeleteOutlined />}
            loading={isDeleting}
            disabled={isDeleting}
            onClick={handleDeleteStudent}
            className="!rounded-xl !font-semibold"
          >
            {isDeleting ? "⚠️Deleting..." : "Delete Student"}
          </Button>,
        ]}
      >
        <div className="py-3">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
              <ExclamationCircleOutlined className="text-xl" />
            </div>

            <div>
              <h3 className="font-urbanist text-lg font-bold text-text-primary">
                Are you sure?
              </h3>

              <p className="text-sm text-text-muted">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {deleteStudent && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-text-muted">You are about to delete</p>

              <p className="mt-1 font-urbanist font-semibold text-text-primary">
                {deleteStudent.name}
              </p>

              <p className="mt-1 text-xs text-text-muted">
                {deleteStudent.id} · {deleteStudent.className}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Students;
