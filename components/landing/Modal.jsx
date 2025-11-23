'use client';

import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children, className = '' }) {
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className={`modal__overlay modal__overlay--visible`}
                aria-hidden="false"
                onClick={onClose}
            />
            <div className={`modal modal--visible ${className}`}>
                <div className="modal__content">
                    {title && <h2 className="modal__title">{title}</h2>}
                    {children}
                </div>
            </div>
        </>
    );
}

export default Modal;
