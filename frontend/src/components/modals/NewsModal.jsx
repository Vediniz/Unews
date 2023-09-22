export default function NewsModal({ isOpen, onClose, title, banner, text }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="content-newsModal">
                <header>
                    <h2>{title}</h2>
                    <button onClick={onClose} className="close-button">
                        x
                    </button>
                </header>
                <div className="content-newsImg">
                    <img src={banner} alt="news" />
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}