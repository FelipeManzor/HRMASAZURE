import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { Table, Button, Divider, Modal, Form, Input, message } from 'antd';
import { categoryLoader, categoryCreate, deleteCategory,editCategory } from '../api/questionManagement';

export default function CategoryList() {
  const setTitle = useOutletContext();

  useEffect(() => {
    setTitle('Create or Delete Category');
    loadCategories(); // Load categories when component mounts
  }, []);

  const [categories, setCategories] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  const loadCategories = () => {
    categoryLoader().then(data => setCategories(data));
  };

  const handleDelete = async (categoryId) => {
    try {
      const messageText = await deleteCategory(categoryId);
      if (messageText === 'success') {
        message.success('Category deleted successfully');
        setCreateModalVisible(false); // Close the modal after successful deletion
        loadCategories(); // Update the table after deletion
      } else {
        message.error(messageText); // Display error message returned from deleteCategory
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error
      message.error('Failed to delete category'); // Display generic error message
    }
  };

  const handleCreate = async () => {
    const newCategoryJSON = {
      name: newCategoryName
    };

    try {
      const creation = await categoryCreate(newCategoryJSON);
      if (creation > 0) {
        setCreateModalVisible(false); // Close the modal
        setNewCategoryName(''); // Clear the input field
        message.success('Category created successfully'); // Show success message
        loadCategories(); // Update the table after creation
      } else {
        message.error('Failed to create category'); // Show error message if creation failed
      }
    } catch (error) {
      console.error('Error creating category:', error);
      // Handle error
      message.error('Failed to create category'); // Show error message if an error occurred
    }
  };

  const handleEdit = async () => {
    const RenamedCategory = {
      id: editedCategoryId,
      name: editedCategoryName
    };
  
    try {
      await editCategory(RenamedCategory);
      message.success('Category renamed successfully');
      setEditModalVisible(false); // Close the modal after successful rename
      loadCategories(); // Update the table after renaming
    } catch (error) {
      console.error('Error renaming category:', error);
      // Handle error
      message.error('Failed to rename category'); // Display error message
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'id',
      width: "300px",
      key: 'id',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditModal(record)}>Rename</Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleEditModal = record => {
    setEditedCategoryId(record.id);
    setEditedCategoryName(record.name);
    setEditModalVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setCreateModalVisible(true)}>Create Category</Button>
      <Divider />
      <Table columns={columns} dataSource={categories} />
      <Modal
        title="Create Category"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={handleCreate}
      >
        <Form>
          <Form.Item label="Category Name">
            <Input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Rename Category"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEdit}
      >
        <Form>
          <Form.Item label="Category Name">
            <Input value={editedCategoryName} onChange={e => setEditedCategoryName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
