export default function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_image ${isOpen && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button
                    type="button"
                    className="popup__close popup__close-image"
                    aria-label="Закрыть всплывающее окно"
                    onClick={onClose}
                />
                <img
                    src={card.link}
                    alt={`Фото ${card.name}`}
                    className="popup__image-view"
                />
                <h2 className="popup__image-title" >{card.name}</h2>
            </div>
        </div>
    )
}