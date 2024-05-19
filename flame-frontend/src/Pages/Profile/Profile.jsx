import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FiUser } from 'react-icons/fi';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy data for the graph and statistics
const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Assignments Completed',
            data: [10, 15, 8, 12],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
            label: 'Average Score',
            data: [75, 82, 78, 85],
            fill: false,
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgba(153, 102, 255, 0.2)',
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const Profile = () => {
    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-3">
                        <Card.Body>
                            <div className="tc">
                                <FiUser size={64} className="mb-3" />
                                <Card.Title>John Doe</Card.Title>
                                <Card.Text>johndoe@example.com</Card.Text>
                                <Card.Text>Student</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-3 mb-4">
                        <Card.Body className="tc">
                            <Card.Title>Total Assignments</Card.Title>
                            <Card.Text>25</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-3 mb-4">
                        <Card.Body className="tc">
                            <Card.Title>Completed Assignments</Card.Title>
                            <Card.Text>20</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-3 mb-4">
                        <Card.Body className="tc">
                            <Card.Title>Average Score</Card.Title>
                            <Card.Text>80%</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="shadow-3">
                        <Card.Body>
                            <Card.Title className="tc">Student Progress</Card.Title>
                            <Line data={data} options={options} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
