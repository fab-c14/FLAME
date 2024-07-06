import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import ShowBatches from './ShowBatches.jsx';
import UserStatsChart from './UserStatsChart.jsx';
import BatchManager from './BatchManager.jsx';
import BatchJoin from './BatchJoin.jsx';
import { joinBatch, fetchJoinedBatches } from '../../actions/batchActions';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const joinedBatches = useSelector((state) => state.batches.joinedBatches || []);

  useEffect(() => {
    if (user.role === 'student') {
      dispatch(fetchJoinedBatches(user.id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate('/');
  };

  const onJoinBatch = (batchCode) => {
    dispatch(joinBatch(batchCode, user.id)); // Ensure correct ID property
  };

  const isStudent = user.role === 'student';

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
          {!isStudent ? (
            <BatchManager setSelectedStudent={setSelectedStudent} createdBy={user.name} />
          ) : (
            <BatchJoin onJoinBatch={onJoinBatch} user={user} />
          )}
        </Col>
        <Col xs={12} md={8}>
          {isStudent && (
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
            </Card>
          )}
          {!isStudent ? (
            <UserStatsChart selectedStudent={selectedStudent} />
          ) : (
            <ShowBatches joinedBatches={joinedBatches} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
