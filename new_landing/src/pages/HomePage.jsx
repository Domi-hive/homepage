import HeroSection from '../components/HeroSection.jsx';
import Features from '../components/Features.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Testimonials from '../components/Testimonials.jsx';
import WorkAsAgent from '../components/WorkAsAgent.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import pageBackground from '../../assets/background_image.png';

function HomePage() {
  return (
    <div className="page-shell" style={{ '--page-bg-image': `url(${pageBackground})` }}>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <WorkAsAgent />
      <Footer />
    </div>
  );
}

export default HomePage;
