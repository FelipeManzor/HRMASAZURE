import { useEffect } from "react";
import { useOutletContext, useNavigate, useLoaderData, useParams } from "react-router-dom";
import { Descriptions, Card, Button, Space, message } from 'antd';
import { updateArchive } from "@/api/archivedetails";

export default function ArchiveDetails() {
  const setTitle = useOutletContext();
  const navigate = useNavigate();

  const data = useLoaderData();

  const { survey } = useParams();

  const handleView = () => {
    navigate(`/case/archiveview/${survey}`); 
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInprogress = () => {
    updateArchive(survey)
    .then(() => {
      message.success("Case moved to archive");
    })
    .catch((msg) => {
      message.error(msg);
    });

    navigate('/case/inprogress'); 
  };

  useEffect(() => {
    setTitle(`${data.id} - ${data.companyName}`);
  }, [setTitle]);

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
          onClick={handleView}
        >
          View Details
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

          onClick={handleInprogress}
        >
          Move to In-progress
        </Button>
      </Space>
    </>
  );
  
}

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