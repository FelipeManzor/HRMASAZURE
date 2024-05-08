import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Table, Button } from "antd";
import { cuestionSetLoaderlvl2 } from "../api/questionSetManagement";

const QuestionSetListDetail = () => {
  const { questionSet } = useParams();
  const setTitle = useOutletContext();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setTitle(`Review QuestionSet`);
    // Extract the last part of the URL (questionSet ID)
    const id = questionSet.split("-").pop();
    //console.log(id)
    // Fetch data using the ID
    cuestionSetLoaderlvl2(id)
      .then(data => setDataSource(data))
      .catch(error => console.error("Error loading question set details:", error));
  }, [questionSet, setTitle]);

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  const columns = [
    {
      title: 'Question Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Question Body',
      dataIndex: 'body',
      key: 'body',
    }
  ];

  return (
    <div>
      <Button onClick={handleBack}>Back</Button>
      <h2>Question Set Details: {questionSet}</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default QuestionSetListDetail;
