import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker, Button, Table, Form, Row, Col } from 'antd';

export default function InProgressCase() {
  const setTitle = useOutletContext();

  const data = useLoaderData();

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { Column } = Table;
  const { Search } = Input;
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formFilters, setFormFilters] = useState({
    industryName: null,
    year: null,
    startDate: null,
    principal: null,
  });

  const filteredData = data.progressCaseData.filter((item) =>
    (item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString() === searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!formFilters.industryName || item.industryName === formFilters.industryName) &&
    (!formFilters.year || (new Date(item.startDate).getFullYear() >= formFilters.year[0] && new Date(item.startDate).getFullYear() <= formFilters.year[1])) &&
    (!formFilters.startDate || (item.startDate >= formFilters.startDate[0] && item.startDate <= formFilters.startDate[1])) &&
    (!formFilters.principal || item.principal.toLowerCase().includes(formFilters.principal.toLowerCase()))
  );

  useEffect(() => {
    setTitle('In-progress cases');
  }, []);

  const onFinish = (values) => {
    setFormFilters({
      industryName: values.industryName,
      year: values.year ? [new Date(values.year[0]).getFullYear(), new Date(values.year[1]).getFullYear()] : null,
      startDate: values.startDate ? [values.startDate[0].format('YYYY-MM-DD'), values.startDate[1].format('YYYY-MM-DD')] : null,
      principal: values.principal,
    });
  };

  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
    setFormFilters({
      industryName: null,
      year: null,
      startDate: null,
      principal: null,
    });
  };




  const handleCaseIdClick = (id) => {
    navigate(`/case/details/${id}`); 
  };

  return (
    <>
      <Search
        placeholder="Enter the id/case name/company name of the client"
        style={{ width: 500, marginBottom: '10px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Form form={form} onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={4}>
            <Form.Item name="principal" label={<h4>Vincents Advisor</h4>} labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
              <Input placeholder="Enter advisor name" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="year" label={<h4>Start Year</h4>} labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
              <RangePicker picker="year" style={{ width: '100%' }} placeholder={['Start Year', 'End Year']} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="startDate" label={<h4>Start Date</h4>} labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="industryName" label={<h4>Industry Category</h4>} labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
              <Select defaultValue="Select industry" style={{ width: '100%' }}>
                {data.industryData.map((option) => (
                  <Option key={option.name} value={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item style={{ marginTop: '39px' }}>
              <Button type="primary" icon={<SearchOutlined />} htmlType="submit"></Button>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item style={{ marginTop: '39px' }}>
              <Button type="danger" icon={<DeleteOutlined />} onClick={resetForm}></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table dataSource={filteredData}>
        <Column
          title="Case ID"
          dataIndex="id"
          key="id"
          render={(id) => (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCaseIdClick(id);
              }}
              style={{
                color: 'blue',
                textDecoration: 'underline',
              }}
            >
              {id}
            </a>
          )}
        />
        <Column title="Case Name" dataIndex="name" key="name" />
        <Column title="Company Name" dataIndex="companyName" key="companyName" />
        <Column title="Vincents Advisor" dataIndex="principal" key="principal" />
        <Column title="Case Start Date" dataIndex="startDate" key="startDate" />
        <Column title="Industry" dataIndex="industryName" key="industryName" />
        <Column title="Headcount" dataIndex="headcount" key="headcount" />
        <Column title="Questionnaire Name" dataIndex="questionSetName" key="questionSetName" />
      </Table>
    </>
  );
}