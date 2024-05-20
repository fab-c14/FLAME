// src/Pages/StudentProfile/StudentProfile.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap';

const StudentProfile = ({ user }) => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    // Fetch batches from the backend
    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/batches');
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, []);

  const handleJoinBatch = async (batchId) => {
    try {
      await fetch(`/api/batches/${batchId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: user.id }),
      });
      alert('Joined batch successfully!');
    } catch (error) {
      console.error('Error joining batch:', error);
    }
  };

  return (
    <Container className="pa4">
      <Row>
        <Col xs={12} md={4} className="mb4">
          <Card className="br3 shadow-2">
            <Card.Body>
              <Card.Title className="f4">{user.name}</Card.Title>
              <Card.Subtitle className="mb2 text-muted">{user.email}</Card.Subtitle>
              <Card.Text>
                <strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card className="br3 shadow-2 mb4">
            <Card.Header className="bg-light-gray">Join a Batch</Card.Header>
            <ListGroup variant="flush">
              {batches.map((batch, index) => (
                <ListGroupItem key={index}>
                  <span>{batch.name}</span>
                  <Button variant="primary" className="ml-auto" onClick={() => handleJoinBatch(batch._id)}>
                    Join
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile;
