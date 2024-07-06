import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { joinBatch } from '../../actions/batchActions';

const BatchJoin = ({ onJoinBatch, user }) => {
  const [batchCode, setBatchCode] = useState('');
  const dispatch = useDispatch();

  const handleJoin = async () => {
    try {
      // Validate batch code (e.g., check if it exists in the database)
      const response = await axios.get(`${BACKEND_URL}/api/batches/${batchCode}`);
      const data = response.data;

      if (data.exists) {
        // If batch exists, join the batch
        const studentId = user._id; // Ensure you use the correct user ID field
        dispatch(joinBatch(batchCode, studentId));
        // Optional: Call parent component's join handler if needed
        if (onJoinBatch) {
          onJoinBatch(batchCode, studentId);
        }
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
