import React, { useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswers } from '../../actions/answerActions';
import SolvedQuestionsList from './SolvedQuestionsList';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const UserStatsChart = ({ selectedStudent }) => {
  const dispatch = useDispatch();
  const solvedQuestions = useSelector(state => state.submissions.answers);

  useEffect(() => {
    if (selectedStudent) {
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

  const studentProgress = selectedStudent.stats || {};

  const sampleSolvedQuestions = [
    { date: '2023-01-01', count: 1 },
    { date: '2023-02-01', count: 2 },
    { date: '2023-03-01', count: 3 },
  ];

  const questionsData = Array.isArray(solvedQuestions) && solvedQuestions.length > 0 ? solvedQuestions : sampleSolvedQuestions;

  const lineData = {
    labels: questionsData.map(q => new Date(q.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Total Runs',
        data: questionsData.map(q => q.totalRuns || 0),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Successful Runs',
        data: questionsData.map(q => q.successfulRuns || 0),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Failed Runs',
        data: questionsData.map(q => q.failedRuns || 0),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
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
            <strong>Total Codes Run:</strong> {studentProgress.totalRuns || 0}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Successful Runs:</strong> {studentProgress.successfulRuns || 0}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Failed Runs:</strong> {studentProgress.failedRuns || 0}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Last Active:</strong> {studentProgress.lastActive ? new Date(studentProgress.lastActive).toLocaleString() : 'N/A'}
          </ListGroupItem>
        </ListGroup>
        <hr/>
        <Line data={lineData} options={options} />
        <hr/>
        <SolvedQuestionsList solvedQuestions={questionsData} />
      </Card.Body>
    </Card>
  );
};

export default UserStatsChart;
