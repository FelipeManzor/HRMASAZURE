import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { Upload, Button } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { importQuestion } from '../api/questionManagement';
const FileUploader = () => {
    const setTitle = useOutletContext();

    useEffect(() => {
        setTitle('Import Questions From Excel');
    }, []);

    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        // You can perform additional validation or processing here if needed
        setFileList(fileList);
    };

    const handleUpload = () => {
      
      importQuestion(fileList[0].originFileObj);
        // Implement your backend upload logic here
        console.log("Uploading files:", fileList);
        // Here you can use fetch or Axios to send the fileList to your backend
    };

    return (
        <div>
            <a href="/template.csv" download><DownloadOutlined /> Download CSV Template</a>
            <Upload.Dragger
                fileList={fileList}
                onChange={handleFileChange}
                multiple
                beforeUpload={() => false} // Prevent default upload behavior
                accept=".csv" // Only allow CSV files
            >
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag CSV files to this area to upload</p>
            </Upload.Dragger>
            <Button
                type="primary"
                onClick={handleUpload}
                style={{ marginTop: '16px', marginLeft: '16px' }}
                disabled={fileList.length === 0}
            >
                Upload
            </Button>
        </div>
    );
};

export default FileUploader;
