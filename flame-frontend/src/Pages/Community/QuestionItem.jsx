// QuestionItem.jsx
import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

const QuestionItem = ({ question, user }) => {
  const handleSolve = async () => {
    try {
      await axios.put(`/api/questions/${question._id}/solve`, { userId: user.id });
    } catch (error) {
      console.error('Failed to mark question as solved', error);
    }
  };

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div>
        <h5>{question.title}</h5>
        <p>{question.description}</p>
      </div>
      {user.role === 'student' && !question.solvedBy.includes(user.id) && (
        <Button variant="success" onClick={handleSolve}>
          Solve
        </Button>
      )}
      {question.solvedBy.includes(user.id) && <span className="text-success">Solved</span>}
    </ListGroupItem>
  );
};

export default QuestionItem;
