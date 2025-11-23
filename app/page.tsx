import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import WorkAsAgent from '@/components/landing/WorkAsAgent';
import Footer from '@/components/landing/Footer';

export default function Home() {
    return (
        <div className="page-shell">
            <Header />
            <main>
                <HeroSection />
                <Features />
                <HowItWorks />
                <Testimonials />
                <WorkAsAgent />
            </main>
            <Footer />
        </div>
    );
}
