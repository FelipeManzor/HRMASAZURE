import React, { useEffect } from "react";
import { message, Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';
import { useOutletContext, useNavigate, useLoaderData  } from "react-router-dom";
import { addSurvey } from "@/api/createcase";

export default function CreateCase() {
  const setTitle = useOutletContext();

  const data = useLoaderData();

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = (values) => {
    addSurvey(values);
    navigate('/case/inprogress');
    message.success('Case created!');
  };

  const headcountValidator = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    if (!/^\d+$/.test(value)) {
      return Promise.reject('Headcount must be a number');
    }
    return Promise.resolve();
  };

  const { Option } = Select;
  const { TextArea } = Input;


  useEffect(() => {
    setTitle('Create a Case');
  }, []);

  return (
    <Form onFinish={onFinish}>
      {contextHolder}
      
      <Form.Item
        label={<h3>Case Name</h3>}
        name="name"
        rules={[{ required: true, message: 'Please enter case name' }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input placeholder="Enter case name" />
      </Form.Item>

      <Form.Item
        label={<h3>Company Name</h3>}
        name="companyName"
        rules={[{ required: true, message: 'Please enter company name' }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input placeholder="Enter company name" />
      </Form.Item>

      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label={<h3>Case Start Date</h3>}
            name="startDate"
            rules={[{ required: true, message: 'Please select case start date' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>          
          <Form.Item
            label={<h3>Vincents Advisor</h3>}
            name="principal"
            rules={[{ required: true, message: 'Please enter advisor name' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="Enter advisor name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>          
          <Form.Item
            label={<h3>Industry Category</h3>}
            name="industryId"
            rules={[{ required: true, message: 'Please select industry category' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select defaultValue="Select industry" style={{ width: '100%' }}>
              {data.industryData.map((option) => (
                <Option key={option.id} value={option.id}>{option.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>          
          <Form.Item
            label={<h3>Headcount</h3>}
            name="headcount"
            rules={[
              { required: true, message: 'Please enter headcount' },
              { validator: headcountValidator },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="Enter headcount" />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        label={<h3>Description</h3>}
        name="description"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea rows={4} placeholder="Enter description" />
      </Form.Item>
      
      <Form.Item
        label={<h3>Questionnaire</h3>}
        name="questionSetId"
        rules={[{ required: true, message: 'Please select case start date' }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Select defaultValue="Select questionnaire" style={{ width: 200 }}>
        {data.questionSetData.map((option) => (
      <Option key={option.id} value={option.id}>{option.name}</Option>
    ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
