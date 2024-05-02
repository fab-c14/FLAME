import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa'; // Importing the book icon from React Icons

const Docs = () => {
    return (
        <section className="py-5">
            <Container>
                <h2 className="text-center mb-4">Documentation</h2>
                <p className="text-center mb-4">
                    Explore our documentation to learn more about FLAME.
                </p>
                <div className="text-center">
                    <Button variant="primary" size="lg" href="link_to_original_documentation_page">
                        <FaBook className="mr-2" /> View Documentation
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export default Docs;
