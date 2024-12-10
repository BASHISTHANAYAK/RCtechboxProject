import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  //fetch all records
  const fetchRecords = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/records');
      console.log("data-", data)
      setRecords(data.records);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // delete by id
  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/records/${id}`);
      alert("record deleted!")
      fetchRecords(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/create')}>Add Record</button>
      {records.length === 0 ? (
        <p>No records available. Please add some.</p>
      ) : (
        <div>
          {records.length > 0 && records.map((record) => (
            <div key={record._id} className="record">
              <h3>Name: {record.name}</h3>
              <p>Email: {record.email}</p>
              <p>Age: {record.age}</p>
              <button onClick={() => navigate(`/edit/${record._id}`)}>Edit</button>
              <button onClick={() => deleteRecord(record._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordList;
