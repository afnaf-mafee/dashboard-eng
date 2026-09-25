import React, { useState } from "react";

import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  message,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
  useCreateBatchMutation,
  useGetBatchesQuery,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} from "../../redux/services/batchApiServices/batchApiServices";

const Batch = () => {
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);

  const [editingBatch, setEditingBatch] = useState(null);

  const [deleteBatch, setDeleteBatch] = useState(null);

  const { data: batchData, isLoading } = useGetBatchesQuery();

  const [createBatch, { isLoading: isCreating }] = useCreateBatchMutation();

  const [updateBatch, { isLoading: isUpdating }] = useUpdateBatchMutation();

  const [deleteBatchApi, { isLoading: isDeleting }] = useDeleteBatchMutation();

  // =========================
  // Open Add Modal
  // =========================

  const handleOpenAddModal = () => {
    setEditingBatch(null);

    form.resetFields();

    setOpenModal(true);
  };

  // =========================
  // Edit Batch
  // =========================

  const handleEdit = (batch) => {
    setEditingBatch(batch);

    form.setFieldsValue({
      batchName: batch.batchName,

      className: batch.className,

      days: batch.days,

      time: batch.time,
    });

    setOpenModal(true);
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingBatch) {
        await updateBatch({
          id: editingBatch._id,

          data: values,
        }).unwrap();

        message.success("Batch updated successfully");
      } else {
        await createBatch(values).unwrap();

        message.success("Batch added successfully");
      }

      form.resetFields();

      setEditingBatch(null);

      setOpenModal(false);
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = async () => {
    try {
      await deleteBatchApi(deleteBatch._id).unwrap();

      message.success("Batch deleted successfully");

      setDeleteBatch(null);
    } catch (error) {
      message.error(error?.data?.message || "Delete failed");
    }
  };

  const getActionItems = (record) => [
    {
      key: "edit",

      label: "Edit Batch",

      icon: <EditOutlined />,

      onClick: () => handleEdit(record),
    },

    {
      key: "delete",

      label: "Delete Batch",

      danger: true,

      icon: <DeleteOutlined />,

      onClick: () => setDeleteBatch(record),
    },
  ];

  const columns = [
  

  

    {
      title: "Days",

      dataIndex: "days",

      key: "days",

      render: (days) => (
        <div className="flex flex-wrap gap-1 font-semibold ">
          {days?.map((day) => (
            <Tag key={day} className="font-urbanist">
              {day}
            </Tag>
          ))}
        </div>
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
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="font-urbanist"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full font-urbanist">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-urbanist text-2xl font-bold text-text-primary sm:text-3xl">
            Batch
          </h1>

          <p className="mt-1 font-urbanist text-sm text-text-muted">
            Manage all batches and class schedule
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleOpenAddModal}
          className="

        !h-11

        !rounded-xl

        !border-0

        !bg-gradient-to-r

        !from-brand-primary

        !to-brand-secondary

        !px-5

        !font-urbanist

        !font-semibold

        !shadow-lg

        "
        >
          Add Batch
        </Button>
      </div>

      {/* Table */}

      <div
        className="

      overflow-hidden

      rounded-2xl

      border

      border-border

      bg-surface-soft

      shadow-[0_10px_40px_rgba(91,33,182,0.06)]

      backdrop-blur-xl

      "
      >
        <Table
          columns={columns}
          dataSource={batchData?.data || []}
          rowKey="_id"
          loading={isLoading}
          className="font-urbanist"
          pagination={{
            pageSize: 8,

            showSizeChanger: false,
          }}
        />
      </div>

      {/* Add Edit Modal */}

      <Modal
        open={openModal}
        centered
        width={600}
        destroyOnClose
        onCancel={() => setOpenModal(false)}
        title={
          <div className="font-urbanist">
            <h2 className="font-urbanist text-xl font-bold">
              {editingBatch ? "Edit Batch" : "Add Batch"}
            </h2>

            <p className="font-urbanist text-sm text-gray-500">
              Enter batch information
            </p>
          </div>
        }
        footer={[
          <Button
            key="cancel"
            className="!rounded-xl !font-urbanist"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>,

          <Button
            key="submit"
            type="primary"
            loading={isCreating || isUpdating}
            className="

        !rounded-xl

        !border-0

        !bg-gradient-to-r

        !from-brand-primary

        !to-brand-secondary

        !font-urbanist

        !font-semibold

        "
            onClick={handleSubmit}
          >
            {editingBatch ? "Update Batch" : "Add Batch"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" className="mt-5 font-urbanist">
        
          <Form.Item
            label="Class Days"
            name="days"
            rules={[
              {
                required: true,
                message: "Please select class days",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select class days"
              className="w-full"
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

        
        </Form>
      </Modal>

      {/* Delete Modal */}

      <Modal
        open={!!deleteBatch}
        centered
        onCancel={() => setDeleteBatch(null)}
        footer={[
          <Button
            key="cancel"
            className="!font-urbanist"
            onClick={() => setDeleteBatch(null)}
          >
            Cancel
          </Button>,

          <Button
            key="delete"
            danger
            type="primary"
            loading={isDeleting}
            className="!font-urbanist"
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <div className="flex gap-3 py-5 font-urbanist">
          <ExclamationCircleOutlined className="text-2xl text-red-500" />

          <div>
            <h3 className="font-urbanist text-lg font-bold">Are you sure?</h3>

            <p className="font-urbanist text-sm text-gray-500">
              Delete this batch permanently
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Batch;
