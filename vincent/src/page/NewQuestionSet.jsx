import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Table, Checkbox, Divider, Select, Button, Input, Typography } from 'antd';
import { questionLoader, categoryLoader, questionSet } from "../api/questionSetManagement";

const { Option } = Select;
const { Text } = Typography;

export default function NewQuestionSet() {
  const setTitle = useOutletContext();
  const [selectedRows, setSelectedRows] = useState({});
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setTitle('Create New Questionnaire');
    questionLoader().then(data => {
      setOriginalData(data);
      setTableData(data);
    });
    categoryLoader().then(data => setCategories(data));
  }, []);

  const handleRowSelection = (e, id) => {
    const isChecked = e.target.checked;
    setSelectedRows(prevSelectedRows => {
      if (isChecked) {
        const count = Object.keys(prevSelectedRows).length + 1;
        return { ...prevSelectedRows, [id]: count };
      } else {
        const { [id]: removedId, ...rest } = prevSelectedRows;
        const updatedRows = {};
        Object.keys(rest).forEach(rowId => {
          const count = rest[rowId] > removedId ? rest[rowId] - 1 : rest[rowId];
          updatedRows[rowId] = count;
        });
        return updatedRows;
      }
    });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const filteredData = value ? originalData.filter(item => item.categoryId === value) : originalData;
    setTableData(filteredData);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSave = () => {
    const selectedQuestionIds = Object.keys(selectedRows).map(Number);
    const questionSetObject = {
      name: searchValue, // Assuming the questionnaire name is entered in the input field
      detail: selectedQuestionIds,
    };
    questionSet(questionSetObject)
      .then(response => {
        // Handle successful save
        console.log(questionSetObject);
        console.log("Questionnaire saved successfully:", response);
      })
      .catch(error => {
        // Handle save error
        console.error("Error saving questionnaire:", error);
      });
  };

  const columns = [
    {
      title: 'Question Title',
      dataIndex: 'title',
    },
    {
      title: 'Question Body',
      dataIndex: 'body',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
    },
    {
      title: 'Select',
      dataIndex: 'select',
      width: 100,
      render: (_, record) => (
        <Checkbox
          checked={selectedRows[record.id]}
          onChange={(e) => handleRowSelection(e, record.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <Text>Questionnaire Name</Text>
      <br />
      <Input
        placeholder="Questionnaire Name"
        value={searchValue}
        onChange={handleSearchChange}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Divider />

      <Select
        placeholder="Select Category"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <Option value={null}>Select All</Option>
        {categories.map(cat => (
          <Option key={cat.id} value={cat.id}>{cat.name}</Option>
        ))}
      </Select>
      <Table dataSource={tableData.map(item => ({ ...item, key: item.id }))} columns={columns} />
      <Divider />
      <Button type="primary" onClick={handleSave}>Save</Button>
    </div>
  );
}
