'use client';

import React from 'react';

const steps = [
    {
        number: 1,
        title: 'Create Request',
        description: 'Tell us your requirements: location, budget, property type, and preferences.',
        icon: '📝'
    },
    {
        number: 2,
        title: 'Get Matched',
        description: 'Our system connects you with verified agents and properties that match your criteria.',
        icon: '🤝'
    },
    {
        number: 3,
        title: 'Schedule Inspection',
        description: 'Book property viewings with agents and track inspections in real-time for safety.',
        icon: '🔍'
    },
    {
        number: 4,
        title: 'Make secure payments',
        description: 'Make secure payments and move into your perfect home with confidence.',
        icon: '💳'
    }
];

function HowItWorks() {
    return (
        <section className="how-it-works">
            <div className="how-it-works__container">
                <div className="how-it-works__content">
                    <div className="how-it-works__left">
                        <div className="how-it-works__header">
                            <h2 className="how-it-works__title">How It Works</h2>
                            <p className="how-it-works__subtitle">
                                Finding your perfect home is just a few simple steps away
                            </p>
                        </div>

                        <div className="how-it-works__steps">
                            {steps.map((step) => (
                                <div key={step.number} className="how-it-works__card">
                                    <div className="how-it-works__card-number">{step.number}</div>
                                    <div className="how-it-works__card-icon">
                                        <span role="img" aria-label={step.title}>{step.icon}</span>
                                    </div>
                                    <h3 className="how-it-works__card-title">{step.title}</h3>
                                    <p className="how-it-works__card-description">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="how-it-works__images">
                        <div className="how-it-works__image-placeholder">
                            <span>Image Placeholder</span>
                        </div>
                        <div className="how-it-works__image-placeholder">
                            <span>Image Placeholder</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
