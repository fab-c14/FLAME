import React from 'react';
import gifImage from '../../assets/flame.gif'; // Importing the GIF

const About = () => {
    return (
        <div className="pa4 shadow-2 pa2 ma3 bb b--pink-45 flex flex-column flex-md-row relative">
            <div className="about-gif" style={{ backgroundImage: `url(${gifImage})`, opacity: 0.3 }}></div>
            <div className="mr-md-4 mb-3 mb-md-0" style={{ maxWidth: '300px' }}>
                <h2 className="f2 mb3">About FLAME</h2>
                <p className="f4">
                    Welcome to FLAME (Foundation for Learning Assistance and Management Environment), your platform for interactive learning. Our mission is to empower students with the tools and resources they need to excel in their academic journey.
                </p>
                <p className="f4">
                    At FLAME, we believe in the power of hands-on learning. Our platform provides a rich environment for students to practice coding, experiment with different programming languages, and collaborate with peers on exciting projects.
                </p>
                <p className="f4">
                    Whether you're a beginner just starting your coding journey or an experienced developer looking to sharpen your skills, FLAME has something for everyone. Join us today and ignite your passion for learning!
                </p>
            </div>
        </div>
    );
}

export default About;
