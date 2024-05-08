import React, { useState, useEffect } from 'react';
import { Table, Select, Modal, Form, Input, Button, Space, Divider, Row, Col } from 'antd';


//const questions=questionLoader();
import { useOutletContext } from "react-router-dom";
import { questionLoader, updateQuestion } from "../api/questionManagement";

const { Option } = Select;

export default function QuestionList() {
  const setTitle = useOutletContext();

  useEffect(() => {
    setTitle('List of questions');
  }, []);

  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editQuestionModalVisible, setEditQuestionModalVisible] = useState(false);
  const [editQuestion, setEditQuestion] = useState({
    titleChanged: '',
    bodyChanged: '',
    bestPracticeChanged: ''
  });
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsFromApi = await questionLoader();
        setQuestions(questionsFromApi);
        setFilteredQuestions(questionsFromApi); // Set filtered questions initially same as fetched questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = value => {
    setSelectedCategory(value);
  };

  const handleEditQuestion = record => {
    setEditQuestion(record);
    setEditQuestionModalVisible(true);
  };

  const handleSaveQuestion = async () => {
    try {
      // Log the original and changed values of the question
      const json = {
        id: editQuestion.id,
        title: editQuestion.titleChanged,
        body: editQuestion.bodyChanged,
        categoryId: editQuestion.categoryId,
        bestPractice: editQuestion.bestPracticeChanged
      };
      console.log(json);
      
      // Update question in API
      await updateQuestion(json);

      // Update state with the modified question
      const updatedQuestions = questions.map(q => {
        if (q.id === editQuestion.id) {
          return { ...q, ...json };
        }
        return q;
      });
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);

      // Close the modal
      setEditQuestionModalVisible(false);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditQuestion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const columns = [
    { title: 'Question Title', dataIndex: 'title', key: 'title' },
    { title: 'Question Details', dataIndex: 'body', key: 'body' },
    { title: 'Best Practice Statement', dataIndex: 'bestPractice', key: 'bestPractice'},
    {
      title: 'Action',
      dataIndex: '',
      width: "100px",
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditQuestion(record)}>Edit Question Details</Button>
        </Space>
      ),
    },
    // Hidden fields
  ];

  const uniqueCategories = Array.from(new Set(questions.map(q => q.categoryName)));

  const handleFilter = value => {
    const filtered = questions.filter(q =>
      q.title.toLowerCase().includes(value.toLowerCase()) ||
      q.body.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Select
            style={{ width: '100%' }}
            onChange={handleCategoryChange}
            placeholder="Select category"
            defaultValue={selectedCategory}
          >
            <Option key="all" value={null}>Show All Categories</Option>
            {uniqueCategories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Col>
        <Col span={18}>
          <Input
            placeholder="Search by question or details"
            onChange={e => handleFilter(e.target.value)}
          />
        </Col>
      </Row>
      <Divider />
      <Table
        dataSource={selectedCategory ? filteredQuestions.filter(q => q.categoryName === selectedCategory) : filteredQuestions}
        columns={columns}
        rowKey="id"
      />
      {/* Edit Question Modal */}
<Modal
  title="Edit Question"
  open={editQuestionModalVisible}
  onCancel={() => setEditQuestionModalVisible(false)}
  footer={[
    <Button key="cancel" onClick={() => setEditQuestionModalVisible(false)}>
      Cancel
    </Button>,
    <Button key="save" type="primary" onClick={handleSaveQuestion}>
      Save
    </Button>,
  ]}
>
  <Form>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item label="Question Title">
          <Input
            className="input-field" // Apply CSS class to the input
            name="titleChanged"
            value={editQuestion.titleChanged}
            onChange={handleChange}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item label="Question">
          <Input
            className="input-field" // Apply CSS class to the input
            name="bodyChanged"
            value={editQuestion.bodyChanged}
            onChange={handleChange}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item label="Question Best Practice">
          <Input
            className="input-field" // Apply CSS class to the input
            name="bestPracticeChanged"
            value={editQuestion.bestPracticeChanged}
            onChange={handleChange}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>

    </div>
  );
}
