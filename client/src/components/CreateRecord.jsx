import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../config/api';

const CreateRecord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${api}/api/records`, formData);
      alert(res.data.message || 'a record has been created')
      // navigate('/'); // Navigate back to home after adding record
    } catch (error) {
      console.error(error.response.data.message || 'Error creating record');
      alert(error.response.data.message || 'Error creating record');

    }
  };

  return (
    <div>
      <h2>Add New Record</h2>
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
        <button type="submit">Add Record</button>
        <button type="button" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default CreateRecord;
