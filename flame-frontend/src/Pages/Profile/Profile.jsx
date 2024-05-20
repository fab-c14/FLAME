import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import BatchManager from './BatchManager';
import UserStatsChart from './UserStatsChart';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleLogout = () => {
    navigate('/login');
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
              <Button onClick={handleLogout} variant="danger" className="flex items-center">
                <FiLogOut className="mr2" /> Logout
              </Button>
            </Card.Body>
          </Card>
          <BatchManager user={user} setSelectedStudent={setSelectedStudent} />
        </Col>
        <Col xs={12} md={8}>
          <Card className="br3 shadow-2 mb4">
            <Card.Header className="bg-light-gray">User Statistics</Card.Header>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>Total Codes Run:</strong> {user.stats.totalRuns}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Successful Runs:</strong> {user.stats.successfulRuns}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Failed Runs:</strong> {user.stats.failedRuns}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Last Active:</strong> {new Date(user.stats.lastActive).toLocaleString()}
              </ListGroupItem>
            </ListGroup>
          </Card>
          {selectedStudent && <UserStatsChart selectedStudent={selectedStudent} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
