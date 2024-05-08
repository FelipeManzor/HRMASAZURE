import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { message, Table, Space, Flex, Button, Modal, Form, Input } from "antd";
import { updateIndustry, addIndustry, deleteIndustry } from "@/api/industry";

export default function IndustryList() {
  const data = useLoaderData();

  const setTitle = useOutletContext();
  const [industries, setIndustries] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function close() {
    setIsOpen(false);
    setEditIdx(null);
  }

  function update(newIndustry) {
    newIndustry = { ...industries[editIdx], ...newIndustry };
    updateIndustry(newIndustry)
      .then(() => {
        setIndustries(
          [...industries].map((x, idx) => {
            if (idx === editIdx) {
              return newIndustry;
            } else return x;
          })
        );
        messageApi.success("Updated successfully");
      })
      .catch((msg) => {
        messageApi.error(msg);
      });
    close();
  }

  function add(newIndustry) {
    newIndustry.key = industries.length + 1;
    addIndustry(newIndustry)
      .then((id) => {
        newIndustry.id = id;
        setIndustries([...industries, newIndustry]);
        messageApi.success("Added successfully");
      })
      .catch((msg) => {
        messageApi.error(msg);
      });
    close();
  }

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Industry Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Service / Product",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space>
          <a
            onClick={() => {
              setEditIdx(index);
              setIsOpen(true);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              deleteIndustry(industries[index].id)
                .then(() => {
                  setIndustries(
                    [...industries].filter((_, idx) => idx !== index)
                  );
                  messageApi.success("Deletion success!");
                })
                .catch((msg) => {
                  messageApi.error(`${msg}`);
                });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setTitle("Industry list");
  }, []);

  useEffect(() => {
    if (editIdx !== null) {
      form.setFieldsValue(industries[editIdx]);
    }
  }, [editIdx]);

  return (
    <>
      {contextHolder}
      <Flex justify="flex-end" style={{ marginBottom: "1rem" }}>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setIsOpen(true);
          }}
        >
          New
        </Button>
      </Flex>
      <Table dataSource={industries} columns={columns} pagination={false} />
      <Modal
        title={editIdx === null ? "New" : "Editing"}
        open={isOpen}
        onCancel={close}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          onFinish={editIdx === null ? add : update}
        >
          <Form.Item
            label="Industry name"
            name="name"
            rules={[
              {
                required: true,
                message: "Industry name cannot be empty!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Industry description"
            name="description"
            rules={[
              {
                required: true,
                message: "Industry description cannot be empty!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Flex justify="flex-end">
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
