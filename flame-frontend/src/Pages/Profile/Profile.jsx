import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import axios from 'axios';
import { logoutUser } from '../../actions/authActions'; // Import logoutUser action creator
import ShowBatches from './ShowBatches.jsx';
import UserStatsChart from './UserStatsChart.jsx';
import BatchManager from './BatchManager.jsx'; // Import BatchManager
import BatchJoin from './BatchJoin.jsx';
import { BACKEND_URL } from '../../config.js';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleLogout = () => {
    // Dispatch the logoutUser action
    dispatch(logoutUser());
    // Clear localStorage and navigate
    localStorage.removeItem('token'); 
    localStorage.removeItem('joinedBatches');
    navigate('/');
  };

  const onJoinBatch = async (batchCode, studentId) => {
    console.log(studentId, batchCode);
    try {
      // Make an API request to join the batch
      const response = await axios.post(`${BACKEND_URL}/api/batches/${batchCode}`, {
        studentId,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error joining the batch:', error);
    }
  };

  const isStudent = user.role === 'student'; // Check if the user is a student

  return (
    <Container className="pa4">
      <Row>
        <Col xs={12} md={4} className="mb4">
          <Card className="br3 shadow-2 mb4">
            <Card.Body>
              <Card.Title className="f4">{user.name}</Card.Title>
              <Card.Subtitle className="mb2 text-muted">{user.email}</Card.Subtitle>
              <Card.Text>
                <strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}
              </Card.Text>
              <Button onClick={handleLogout} variant="danger" className="d-flex align-items-center">
                <FiLogOut className="mr2" /> Logout
              </Button>
            </Card.Body>
          </Card>
          {!isStudent ? <BatchManager setSelectedStudent={setSelectedStudent} createdBy={user.name} /> : <BatchJoin onJoinBatch={onJoinBatch} user={user} />}
        </Col>
        <Col xs={12} md={8}>
          {isStudent &&
          <Card className="br3 shadow-2 mb4">
            <Card.Header className="bg-light-gray">{user.name} Statistics</Card.Header>
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
          </Card>}
          {!isStudent ? (
            <>
              <UserStatsChart selectedStudent={selectedStudent} />
              
            </>
          ) : (
            <ShowBatches joinedBatches={user.batches} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
