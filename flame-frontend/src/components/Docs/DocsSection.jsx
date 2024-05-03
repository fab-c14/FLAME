import React from 'react';
import { Button, Container,Col} from 'react-bootstrap';
import { FaBook } from 'react-icons/fa'; // Importing the book icon from React Icons
import './Docs.css';
const Docs = () => {
    return (
        <section className="py-5 shadow-2 br3 ma3 pa2 b--black bw2 ba ">
            <Container>
                <h2 className="text-center mb-4">Documentation</h2>
                <p className="text-center mb-4">
                    Explore our documentation to learn more about FLAME.
                </p>
                <Col md={3} sm={4} className='center'>
                    <div className="center">
                            <Button variant="warning" size="lg" href="/Docs" className='hover-button md3'>
                                <FaBook className="mr-2 " /> View Documentation
                            </Button>
                    </div>
                </Col>
            </Container>
        </section>
    );
}

export default Docs;
