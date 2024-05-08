import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import { cuestionSetLoader } from "../api/questionSetManagement";

export default function QuestionSetList() {
    const setTitle = useOutletContext();
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setTitle('Question Set list');
        cuestionSetLoader()
            .then(data => setDataSource(data))
            .catch(error => console.error("Error loading question set list:", error));
    }, [setTitle]);

    const handleRedirect = (id) => {
        // Redirect to the current route with the id parameter
        navigate(`./${id}`);
    };

    const columns = [
        {
          title: 'No',
          dataIndex: 'id',
          width: 50,
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          width: 150,
          key: 'date',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Button onClick={() => handleRedirect(record.id)}>View Details</Button>
          ),
        },
    ];

    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
}
