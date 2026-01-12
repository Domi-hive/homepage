import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'icon' | 'full';
    color?: 'default' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full', color = 'default' }) => {
    const navyColor = color === 'white' ? '#FFFFFF' : '#1E293B';
    const yellowColor = '#F59E0B';
    const textColor = color === 'white' ? '#FFFFFF' : '#1E293B';
    const subtextColor = color === 'white' ? '#F59E0B' : '#F59E0B';

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Icon */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
            >
                {/* House Outline */}
                <path
                    d="M50 15 L85 45 V85 H15 V45 L50 15 Z"
                    stroke={navyColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Chimney */}
                <path
                    d="M72 32 V20 H82 V42"
                    stroke={navyColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Hexagon Top */}
                <path
                    d="M50 35 L58 40 V50 L50 55 L42 50 V40 L50 35 Z"
                    fill={yellowColor}
                />
                {/* Hexagon Bottom Right */}
                <path
                    d="M59 52 L67 57 V67 L59 72 L51 67 V57 L59 52 Z"
                    fill={yellowColor}
                />
                {/* Hexagon Bottom Left */}
                <path
                    d="M41 52 L49 57 V67 L41 72 L33 67 V57 L41 52 Z"
                    fill={yellowColor}
                />
            </svg>

            {/* Text */}
            {variant === 'full' && (
                <div className="flex flex-col justify-center">
                    <span className="font-display font-bold text-2xl tracking-tight leading-none" style={{ color: textColor }}>
                        Domihive
                    </span>
                    <span className="font-bold text-[0.6rem] uppercase tracking-[0.2em] leading-tight" style={{ color: subtextColor }}>
                        Real Estate
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
