import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../config/api';

const EditRecord = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const { data } = await axios.get(`${api}/api/records/getaRecord/${id}`);
        console.log("EditRecord data-", data.record)
        setFormData(data.record);
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };

    fetchRecord();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("new data:-", formData)
    try {

      let result = await axios.put(`${api}/api/records/${id}`, formData);
      if (result.status === 200) {
        console.log("Edited the data-", result.data.message)
        alert(result.data.message)
        navigate('/'); // Navigate back to home after updating
      } else {
        console.log("can't update record")
        alert("can't update record")

      }

    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div>
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default EditRecord;
