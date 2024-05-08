import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useLoaderData, useParams } from "react-router-dom";
import { Table, Card, Button, Form, Space, Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default function ArchiveView() {
  const setTitle = useOutletContext();
  const { Column } = Table;
  const navigate = useNavigate();

  const data = useLoaderData();

  const { survey } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(data.categoryData[0]);
  const [filteredData, setFilteredData] = useState(data.responseData.filter((response) => response.categoryId === data.categoryData[0].id));

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setFilteredData(data.responseData.filter((response) => response.categoryId === value));
  };

  useEffect(() => {
    const updatedData = filteredData.map((record) => {
      return {
          ...record,
          eva: record.adjustment,
      };
    });
    data.responseData = data.responseData.map((record) => {
      return {
        ...record,
        eva: record.adjustment,
      };
    });
    setFilteredData(updatedData);
  }, []);

  useEffect(() => {
    setTitle(`${survey} - Evaluation`);
  }, [setTitle]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Button
        onClick={handleGoBack}
        style={{
        marginBottom: '20px'
        }}
      >
        Back
      </Button>

      <Form>
        <Form.Item
          label={<h3>Question Category</h3>}
          name="select"
          style={{ marginBottom: '20px' }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Space>
            <Select
              value={selectedCategory}
              style={{
                width: '400px',
                marginRight: '30px',
              }}
              onChange={handleCategoryChange}
            >
              {data.categoryData.map((option) => (
                <Option key={option.id} value={option.id}>{option.name}</Option>
              ))}
            </Select>
          </Space>
        </Form.Item>
      </Form>

      <Card title={<h3>Questions</h3>} style={{ marginTop: '30px' }}>
      <Table
          dataSource={filteredData}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                {record.attachments.map((attachment, index) => (
                  <div key={index}>
                    <span>{attachment}</span>
                    <Button type="text" icon={<DownloadOutlined />} />
                  </div>
                ))}
              </div>
            ),
            rowExpandable: (record) => record.attachments.length > 0,
          }}
          rowKey={(record) => record.id}
        >
          <Column title="Question Title" dataIndex="title" key="title" />
          <Column title="Question" dataIndex="body" key="body" />
          <Column title="Client Answer" dataIndex="value" key="value" />
          <Column title="Final Evaluation" key="evaluation"
                render={(title, record, index) => {
                  if (record.eva !== undefined) {
                    return record.eva;
                  }
                  return record.value;
                }} />
        </Table>
      </Card>

    </>
  );
}

const categoryOptions = [
  "Recruitment and Selections",
  "Employee turnover",
  "Employee absenteeism",
  "Employment Documentation and Induction",
  "Pay, Leave and Entitlements inc. transparency q’s",
  "Policies and Procedures",
  "Performance Management",
  "Learning and Development",
  "Succession Planning",
  "Compensation and Benefits",
  "Business Culture and Strategy",
  "HR Information System and data security",
  "HR data and analytics",
  "Workplace Health and Safety (WHS)",
];

const data = [
  {
    caseId: '001',
    companyName: 'Company A',
    representative: 'John Doe',
    startDate: '2023-01-15',
    industryCategory: 'Agriculture & Food',
    headcount: "100",
    questionnaire: 'Questionnaire 1',
    description: "Cultivating Tomorrow's Harvest. We specialize in innovative agricultural solutions, leveraging cutting-edge technology to enhance crop yields, promote sustainability, and empower farmers worldwide",      
    url: 'https://www.example.com',
  },
];

const responsedata = [
  {
    qustionNo: '1',
    questionBody: 'How do you typically source candidates for open positions?',
    questionCategory: 'Recruitment and Selections',
    answer: 'Yes',
    attachments: ['example1.pdf'],
    evaluation: '',
  },
  {
    qustionNo: '2',
    questionBody: 'What criteria do you use to evaluate candidates during the hiring process?',
    questionCategory: 'Recruitment and Selections',
    answer: 'No',
    attachments: ['example2.pdf', 'example3.pdf'],
    evaluation: 'Yes',
  },
  {
    qustionNo: '3',
    questionBody: 'Could you describe your onboarding process for new employees?',
    questionCategory: 'Recruitment and Selections',
    answer: 'Somewhat',
    attachments: [],

  },
  {
    qustionNo: '4',
    questionBody: 'What factors do you believe contribute to employee turnover within your organization?',
    questionCategory: 'Employee turnover',
    answer: 'Yes',
    attachments: [],
  },
  {
    qustionNo: '5',
    questionBody: 'How do you track and analyze employee turnover data?',
    questionCategory: 'Employee turnover',
    answer: 'No',
    attachments: [],
  },
  {
    qustionNo: '6',
    questionBody: 'What measures do you have in place to address employee absenteeism?',
    questionCategory: 'Employee absenteeism',
    answer: 'Yes',
    attachments: [],
  },
];