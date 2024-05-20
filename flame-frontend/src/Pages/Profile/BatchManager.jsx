import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Button, Form, Modal } from 'react-bootstrap';
import { FaPlus, FaUser } from 'react-icons/fa';
import axios from 'axios';

const BatchManager = ({ user, setSelectedStudent }) => {
  const [showModal, setShowModal] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [batches, setBatches] = useState(null);

  const fetchBatches = async () => {
    try {
      const response = await axios.get('/api/batches');
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleBatchCreation = async () => {
    try {
      const response = await axios.post('/api/batches', { name: batchName });
      setBatches([...batches, response.data]);
      setBatchName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  if (!batches) {
    return <div>Loading batches...</div>;
  }

  return (
    <Card className="br3 shadow-2 mt4">
      <Card.Header className="bg-light-gray flex items-center">
        <span>Manage Batches</span>
        <Button variant="success" className="ml-auto" onClick={() => setShowModal(true)}>
          <FaPlus className="mr2" /> Create Batch
        </Button>
      </Card.Header>
      <ListGroup variant="flush">
        {batches.map((batch) => (
          <ListGroupItem key={batch._id} onClick={() => handleStudentClick(batch)}>
            <FaUser className="mr2" /> {batch.name}
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="batchName">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter batch name"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleBatchCreation}>
              Create Batch
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default BatchManager;
