import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Button, Form, Modal } from 'react-bootstrap';
import { FaPlus, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { createBatch, fetchBatches } from '../../actions/batchActions';
import { useDispatch, useSelector } from 'react-redux';

const BatchManager = ({ setSelectedStudent, createdBy }) => {
  const [showModal, setShowModal] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [selectedBatch, setSelectedBatch] = useState();
  const dispatch = useDispatch();

  const batches = useSelector(state=> state.batches.batches);

  useEffect(() => {
    dispatch(fetchBatches(createdBy));
  }, [dispatch, createdBy]);

  const handleBatchCreation = async () => {
    try {
      await dispatch(createBatch(batchName, createdBy));
      dispatch(fetchBatches(createdBy));
      setBatchName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  const handleBatchClick = (batch) => {
    localStorage.setItem('selectedBatch',JSON.stringify(batch));
    setSelectedBatch(batch);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <Card className="br3 shadow-3 mt4">
      <Card.Header className="bg-light-gray d-flex align-items-center">
        <span>Manage Batches</span>
        <Button variant="success" className="ml-auto" onClick={() => setShowModal(true)}>
          <FaPlus className="mr2" /> Create Batch
        </Button>
      </Card.Header>
      <ListGroup variant="flush br2">
        {batches && batches.length > 0 ? (
          batches.map((batch) => (
            <ListGroupItem className='tc ma2 pa2 shadow-2 bg-light-green' key={batch._id} onClick={() => handleBatchClick(batch)}>
              <FaUser className="mr2" /> {batch.name} ({batch._id}){' '}
              <Link to="/community" className='tc ma2 pa2 dib btn btn-warning'>
                Community
              </Link>
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
            <Button variant="primary" className="mt-2" onClick={handleBatchCreation}>
              Create Batch
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {selectedBatch && (
        <Card.Body>
          <h3 className="tc pa1 bg-moon-gray">Batch: {selectedBatch.name}</h3>
          <h4 className="tc ba b--blue">Students in Batch:</h4>
          <ListGroup>
            {selectedBatch.students.map((student) => (
              <ListGroupItem className="blue tc" key={student._id} onClick={() => handleStudentClick(student)}>
                {student.name} (ID: {student._id})
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      )}
    </Card>
  );
};

export default BatchManager;
