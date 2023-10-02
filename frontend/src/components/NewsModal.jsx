import React, { useRef, useEffect } from 'react';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewsModal({ isOpen, onClose, title, banner, text }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleCloseModal = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleCloseModal);
        } else {
            document.removeEventListener('mousedown', handleCloseModal);
        }

        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="content-newsModal" ref={modalRef}>
                <header>
                    <h2>{title}</h2>
                    <FontAwesomeIcon onClick={onClose} icon={faTimes} className='close-button' />
                </header>
                <div className="content-newsImg">
                    <img src={banner} alt="news" />
                </div>
                <div className="texts">
                    {text.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
