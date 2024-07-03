import React from 'react';
import { Dropdown, DropdownButton, ListGroup, ListGroupItem } from 'react-bootstrap';

const SolvedQuestionsList = ({ solvedQuestions }) => (
  <ListGroup className="ma2 pa2">
    {Array.isArray(solvedQuestions) && solvedQuestions.length > 0 ? (
      solvedQuestions.map((answer, index) => (
        <ListGroupItem key={answer.questionId} className='mt2 bg-near-black white'>
          <strong>Question ID:</strong> {answer.questionId} <br />
          <strong>Title:</strong> {answer.questionTitle} <br />
          <DropdownButton id={`dropdown-${index}`} title="View Answer" className='tr'>
            <Dropdown.Item as="div" className='tc  f4 shadow-2 bg-washed-blue'>
              <pre>{answer.code || 'No code available'}</pre>
            </Dropdown.Item>
          </DropdownButton>
        </ListGroupItem>
      ))
    ) : (
      <ListGroupItem>No solved questions available.</ListGroupItem>
    )}
  </ListGroup>
);

export default SolvedQuestionsList;
