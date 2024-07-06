import React, { useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Dropdown, DropdownButton } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswers,clearAnswers } from '../../actions/answerActions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatsChart = ({ selectedStudent }) => {
  const dispatch = useDispatch();
  const solvedQuestions = useSelector(state => state.submissions.answers);

  useEffect(() => {
    if (selectedStudent) {
      dispatch(clearAnswers());
      dispatch(getAnswers(selectedStudent._id));
    }
  }, [dispatch, selectedStudent]);

  if (!selectedStudent) {
    return (
      <Card className="br3 shadow-2 mt4">
        <Card.Body>
          <Card.Title className="tc">No Student Selected</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const sampleSolvedQuestions = [
    { date: '2023-01-01', count: 1 },
    { date: '2023-02-01', count: 2 },
    { date: '2023-03-01', count: 3 },
  ];

  // const questionsData = Array.isArray(solvedQuestions) && solvedQuestions.length > 0 ? solvedQuestions : sampleSolvedQuestions;//here we are putting the sample question but now we don't need it 
  const questionsData = solvedQuestions;
  const barData = {
    labels: ['Total Runs', 'Successful Runs', 'Failed Runs'],
    datasets: [
      {
        label: 'Runs',
        data: [
          selectedStudent.stats.totalRuns || 0,
          selectedStudent.stats.successfulRuns || 0,
          selectedStudent.stats.failedRuns || 0,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="br3 shadow-2 mt2">
      <Card.Header className="bg-light-gray">{selectedStudent.name} Statistics</Card.Header>
      <Card.Body>
        <Card.Title className="tc">Progress of {selectedStudent.name}</Card.Title>
      
        <ListGroup variant="flush" className="mt3">
          <ListGroupItem>
            <strong>Total Codes Run:</strong> {selectedStudent.stats.totalRuns || 0}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Successful Runs:</strong> {selectedStudent.stats.successfulRuns || 0}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Failed Runs:</strong> {selectedStudent.stats.failedRuns || 0}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Last Active:</strong> {selectedStudent.stats.lastActive ? new Date(selectedStudent.stats.lastActive).toLocaleString() : 'N/A'}
          </ListGroupItem>
        </ListGroup>
        <hr/>
        <Bar data={barData} options={barOptions} />
        <hr/>
        <ListGroup className="ma2 pa2">
          {Array.isArray(questionsData) && questionsData.length > 0 ? (
            questionsData.map((answer, index) => (
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
      </Card.Body>
    </Card> 
  );
};

export default UserStatsChart;
