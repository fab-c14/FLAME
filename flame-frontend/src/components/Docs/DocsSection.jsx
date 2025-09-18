import React from 'react';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Fade, Zoom } from 'react-awesome-reveal';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Card from '../ui/Card';
import './Docs.css';

const Docs = () => {
  const navigate = useNavigate();

  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn how to set up your profile, start coding, and use the editor effectively.',
      delay: 0
    },
    {
      title: 'Features',
      description: 'Discover key features like real-time test cases, language support, and solution history.',
      delay: 100
    },
    {
      title: 'FAQs',
      description: 'Get answers to common questions about account setup, usage, and troubleshooting.',
      delay: 200
    }
  ];

  return (
    <section className="py-20 m-4">
      <Container>
        <Fade direction="down" cascade damping={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Documentation
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Explore our comprehensive documentation to learn more about FLAME and how to get started.
            </p>
          </div>
        </Fade>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {docSections.map((section, index) => (
            <Fade 
              key={index}
              direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'} 
              delay={section.delay}
            >
              <Card variant="glass" className="p-6 h-full">
                <Card.Body>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {section.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {section.description}
                  </p>
                </Card.Body>
              </Card>
            </Fade>
          ))}
        </div>

        <Zoom delay={300}>
          <div className="text-center">
            <Button
              onClick={() => navigate('/docs')}
              icon={FaBook}
              size="lg"
              className="shadow-xl"
            >
              View Full Documentation
            </Button>
          </div>
        </Zoom>
      </Container>
    </section>
  );
};

export default Docs;
