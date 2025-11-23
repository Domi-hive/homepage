import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Aisha Patel',
    avatar: '👩‍🦰',
    text: 'The customer support is fantastic. They genuinely care about your needs.'
  },
  {
    id: 2,
    name: 'James Foster',
    avatar: '🧔',
    text: 'With Domihive, I\'ve saved time and increased my efficiency tenfold.'
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    avatar: '🤴',
    text: 'Domihive has completely transformed my property management experience. Highly recommend!'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__heading">What Our Clients Say</h2>
        <p className="testimonials__subheading">Real experiences from real users.</p>
        
        <div className="testimonials__stack">
          {testimonials.map((testimonial, index) => {
            const isActive = index === currentIndex;
            const offset = (index - currentIndex + testimonials.length) % testimonials.length;
            
            return (
              <div
                key={testimonial.id}
                className={`testimonials__card ${isActive ? 'testimonials__card--active' : ''}`}
                style={{
                  transform: `translateY(${offset * 8}px) scale(${1 - offset * 0.05})`,
                  opacity: offset === 0 ? 1 : 0.4,
                  zIndex: testimonials.length - offset
                }}
              >
                <div className="testimonials__author">
                  <div className="testimonials__avatar">
                    {testimonial.avatar}
                  </div>
                  <p className="testimonials__text">{testimonial.text}</p>
                </div>
                
                <div className="testimonials__author-name">{testimonial.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
