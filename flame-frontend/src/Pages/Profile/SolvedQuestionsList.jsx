import React from 'react';
import { Dropdown, DropdownButton, ListGroup, ListGroupItem } from 'react-bootstrap';

const SolvedQuestionsList = ({ solvedQuestions }) => (
  <ListGroup className="ma2 pa2">
    {Array.isArray(solvedQuestions) && solvedQuestions.length > 0 ? (
      solvedQuestions.map((answer, index) => (
        <ListGroupItem key={answer.questionId} className='mt2 bg-near-black white'>
          <strong>Question ID: </strong> {answer.questionId} <br />
          <strong>Title: </strong> {answer.questionTitle} <br />
          <strong>Language : {answer.language}</strong> <br />
          <hr/>
          <DropdownButton id={`dropdown-${index}`} title="View Answer" className='tr'>
            <Dropdown.Item as="div" className='f4 shadow-2 bg-washed-blue'>
              <code className='bg-dark f4 dib pa2 ma-1 br2'>
              <pre>
                {answer.code || 'No code available'}
              </pre>
              </code>
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
