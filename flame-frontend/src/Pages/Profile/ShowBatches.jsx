import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBatches } from '../../actions/batchActions';

const ShowBatches = ({ joinedBatches }) => {
  const dispatch = useDispatch();
  const { batches, loading, error } = useSelector((state) => state.batches);
  const [storedBatches, setStoredBatches] = useState([]);

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  useEffect(() => {
    const localStorageBatches = localStorage.getItem('userBatches');
    if (localStorageBatches) {
      setStoredBatches(JSON.parse(localStorageBatches));
    }
  }, []);

  useEffect(() => {
    if (batches.length > 0) {
      const matchedBatches = batches.filter(batch => joinedBatches.includes(batch.id));
      if (matchedBatches.length > 0) {
        localStorage.setItem('joinedBatches', JSON.stringify(matchedBatches));
        setStoredBatches(matchedBatches);
      }
    }
  }, [batches, joinedBatches]);

  return (
    <Card className="br3 shadow-3 mt4 ba2 br3 b--black">
      <Card.Body>
        <Card.Title className="f4">Your Joined Batches</Card.Title>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : storedBatches.length > 0 ? (
          <ul className="list pl0 mt3">
            {storedBatches.map((batch) => (
              <li key={batch.id} className="flex items-center justify-between pa3 bg-light-gray mb2 ba2 b--green b3">
                <div className="batch-info">
                  <h5 className="f5 ma0">{batch.name}</h5>
                  <p className="ma0"><strong>ID:</strong> {batch._id}</p>
                  <p className="ma0"><strong>Created By:</strong> {batch.createdBy}</p>
                </div>
                <Button variant="primary" className="ml3">Community</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't joined any batches yet.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default ShowBatches;
