import React from 'react';
import { FaCode, FaChalkboardTeacher, FaChartBar } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import Container from '../ui/Container';
import Card from '../ui/Card';
import './Features.css';

function Features() {
    const features = [
        {
            icon: FaCode,
            title: 'Interactive Coding Labs',
            description: 'Practice coding skills with hands-on labs covering various programming languages and modern development topics.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FaChalkboardTeacher,
            title: 'Expert-Led Learning',
            description: 'Access expert-led batches where you can solve challenging questions posted by experienced instructors.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: FaChartBar,
            title: 'Performance Analytics',
            description: 'Monitor your progress and performance with detailed analytics and comprehensive tracking systems.',
            gradient: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <section className="py-20 m-4">
            <Container>
                <Fade direction="up" cascade damping={0.15}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Key Features
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Discover powerful tools and features designed to accelerate your learning journey
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <Card 
                                    key={index}
                                    variant="glass" 
                                    className="p-8 text-center group"
                                >
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                                        {feature.title}
                                    </h3>
                                    
                                    <p className="text-white/80 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>
                </Fade>
            </Container>
        </section>
    );
}

export default Features;
