import React, { useEffect } from "react";
import { useOutletContext, useNavigate, useLoaderData, useParams } from "react-router-dom";
import { Card, Button, Tooltip, Input, Form, Space, message, Descriptions  } from 'antd';
import { updateCase } from "@/api/casedetails";

export default function CaseDetails() {
  const setTitle = useOutletContext();
  const navigate = useNavigate();
  
  const data = useLoaderData();

  const { survey } = useParams();

  const handleAdjustRisks = () => {
    navigate(`/case/adjust/${survey}`); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_SURVEY_PREFIX}/${data.link}`);
    message.success('Copied to clipboard!');
  };

  const handleArchive = () => {
    updateCase(survey)
    .then(() => {
      message.success("Case moved to archive");
    })
    .catch((msg) => {
      message.error(msg);
    });

    navigate('/case/archive'); 
  };

  useEffect(() => {
    setTitle(`${data.id} - ${data.companyName}`);
  }, [setTitle]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return  (
    <>
      <Button
        onClick={handleGoBack}
        style={{
        marginBottom: '20px'
        }}
      >
        Back
      </Button>

      <Descriptions title="User Info" layout="vertical" style={{ marginBottom: '20px' }}>
        <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Company Name">{data.companyName}</Descriptions.Item>
        <Descriptions.Item label="Principal">{data.principal}</Descriptions.Item>
        <Descriptions.Item label="Start Date">{data.startDate}</Descriptions.Item>
        <Descriptions.Item label="Industry Name">{data.industryName}</Descriptions.Item>
        <Descriptions.Item label="Headcount">{data.headcount}</Descriptions.Item>
        <Descriptions.Item label="Question Set Name">{data.questionSetName}</Descriptions.Item>
      </Descriptions>

      <Card title={`Description`} style={{ width: 900, marginBottom: '30px' }}>
        <p>{data.description}</p>
      </Card>

      <Form.Item
        label={<h3>Questionnaire Link</h3>}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
      >
        <Input
          value={`${import.meta.env.VITE_SURVEY_PREFIX}/${data.link}`}
          readOnly
          style={{
            width: '600px',
            marginRight: '8px',
            backgroundColor: '#f0f0f0',
            border: 'none',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '4px 8px',
          }}
        />
        <Tooltip title="Copy URL">
          <Button type="primary" onClick={copyToClipboard}>
            Copy URL
          </Button>
        </Tooltip>
      </Form.Item>

      <Space
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '100px',
          width: '100%',
        }}
      >
        
        <Button
          style={{
            backgroundColor: '#bfbfbf',
            color: '#333',
            border: '4px solid #595959',
            borderRadius: '4px',
            marginRight: '400px',
            padding: '32px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '200px',
          }}
          onClick={handleAdjustRisks}
        >
          Evaluate
        </Button>
        <Button
          style={{
            backgroundColor: '#ff7875',
            color: '#333',
            border: '4px solid #f5222d',
            borderRadius: '4px',
            padding: '32px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '200px',
          }}

          onClick={handleArchive}
        >
          Move to Archive
        </Button>
      </Space>
    </>
  );
  
}

