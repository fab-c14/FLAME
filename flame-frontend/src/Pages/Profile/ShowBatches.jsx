import React from 'react';
import { Card } from 'react-bootstrap';

const ShowBatches = ({ joinedBatches }) => {
   
  return (
    <Card className="br3 shadow-2 mt4">
      <Card.Body>
        <Card.Title>Your Joined Batches</Card.Title>
        {joinedBatches.length > 0 ? (
          <ul>
            {joinedBatches.map((batch) => (
              <li key={batch._id}>{batch._id}</li>
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
