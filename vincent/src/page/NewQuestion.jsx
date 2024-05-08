import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Input, Select, Button, message } from 'antd';
import { categoryLoader, addQuestion } from "../api/questionManagement";

const { Option } = Select;

export default function NewQuestion() {
    const setTitle = useOutletContext();
    useEffect(() => {
        setTitle('Add New Question');
    }, []);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesFromApi = await categoryLoader();
                setCategories(categoriesFromApi);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            console.log(values)
            await addQuestion(values);
            message.success('Question created successfully');
            form.resetFields();
        } catch (error) {
            console.error("Error creating question:", error);
            message.error('Failed to create question');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select placeholder="Select a category">
                    {categories.map(category => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="title"
                label="Question Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
            >
                <Input placeholder="Enter question title" />
            </Form.Item>
            <Form.Item
                name="body"
                label="Question"
                rules={[{ required: true, message: 'Please enter question content' }]}
            >
                <Input.TextArea rows={4} placeholder="Enter question content" />
            </Form.Item>
            <Form.Item
                name="bestPractice"
                label="Best Practice Statement"
            >
                <Input.TextArea rows={4} placeholder="Enter question statement" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create Question
                </Button>
            </Form.Item>
        </Form>
    );
};
