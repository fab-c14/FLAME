import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Button, Form, Modal } from 'react-bootstrap';
import { FaPlus, FaUser } from 'react-icons/fa';
import axios from 'axios';

const BatchManager = ({ user, setSelectedStudent }) => {
  const [showModal, setShowModal] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [batches, setBatches] = useState(null); // Initialize as null
  const [selectedBatch, setSelectedBatch] = useState(null);

  const BACKEND_URL = "https://5000-fabc14-flame-vemxsjxiy69.ws-us114.gitpod.io";

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/batches`);
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, [BACKEND_URL]);

  const handleBatchCreation = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/batches`, { name: batchName });
      setBatches([...batches, response.data]);
      setBatchName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
    setSelectedStudent(null); // Reset selected student when batch is clicked
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <Card className="br3 shadow-2 mt4">
      <Card.Header className="bg-light-gray d-flex align-items-center">
        <span>Manage Batches</span>
        <Button variant="success" className="ml-auto" onClick={() => setShowModal(true)}>
          <FaPlus className="mr2" /> Create Batch
        </Button>
      </Card.Header>
      <ListGroup variant="flush">
        {batches && batches.length > 0 ? (
          batches.map((batch) => (
            <ListGroupItem key={batch._id} onClick={() => handleBatchClick(batch)}>
              <FaUser className="mr2" /> {batch.name}
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>No batches available.</ListGroupItem>
        )}
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

      {selectedBatch && (
        <Card.Body>
          <h3>Batch: {selectedBatch.name}</h3>
          <h4>Students in Batch:</h4>
          <ListGroup>
            {selectedBatch.students.map((student) => (
              <ListGroupItem key={student.id} onClick={() => handleStudentClick(student)}>
                {student.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      )}
    </Card>
  );
};

export default BatchManager;
