import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import QuestionItem from './QuestionItem';

const QuestionList = ({ user }) => {
  const [questions, setQuestions] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);      // Add error state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions/batch/${user.batchId}`);
        setQuestions(response.data); // Ensure response.data is an array
      } catch (error) {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [user.batchId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-4">
      <h2>Questions</h2>
      <ListGroup>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionItem key={question._id} question={question} user={user} />
          ))
        ) : (
          <div>No questions available.</div>
        )}
      </ListGroup>
    </div>
  );
};

export default QuestionList;
