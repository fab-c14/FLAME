import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import { BACKEND_URL } from '../../config';


const BatchJoin = ({ onJoinBatch , user}) => {
  const [batchCode, setBatchCode] = useState('');
    
  
  const handleJoin = async () => {
    // Validate batch code (e.g., check if it exists in the database)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/batches/${batchCode}`); 
      const data = response.data;

      if (data.exists) {
       
        const studentId = user.id;

        onJoinBatch(batchCode, studentId);
      } else {
        // Batch code does not exist
        alert('Invalid batch code. Please check and try again.');
      }
    } catch (error) {
      console.error('Error checking batch code:', error);
      alert('An error occurred while checking the batch code. Please try again later.');
    }
  };

 
  return (
    <div>
      <h3>Join a Batch</h3>
      <Form>
        <Form.Group controlId="batchCode">
          <Form.Label>Enter Batch Code:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Batch Code"
            value={batchCode}
            onChange={(e) => setBatchCode(e.target.value)}
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" onClick={handleJoin}>
          Join
        </Button>
      </Form>
    </div>
  );
};

export default BatchJoin;
