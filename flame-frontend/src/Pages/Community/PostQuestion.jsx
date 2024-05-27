// PostQuestion.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PostQuestion = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testCases, setTestCases] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = {
        title,
        description,
        testCases: testCases.split('\n'),
        createdBy: user.id,
        batchId: user.batchId // Ensure this comes from the user or another source
      };
      await axios.post('/api/questions', newQuestion);
      setTitle('');
      setDescription('');
      setTestCases('');
    } catch (error) {
      console.error('Failed to post question', error);
    }
  };

  return (
    <div className="my-4">
      <h2>Post a Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Test Cases (one per line)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={testCases}
            onChange={(e) => setTestCases(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Post Question
        </Button>
      </Form>
    </div>
  );
};

export default PostQuestion;
