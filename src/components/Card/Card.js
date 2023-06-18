export default function Card({ card, onCardClick }) {
    return (
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={() => onCardClick({ name: card.name, link: card.link })} />
            <button
                type="button"
                className="element__button-trash"
                aria-label="Удалить карточку"
            />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button
                        type="button"
                        className="element__button-like"
                        aria-label="Поставить лайк"
                    />
                    <span id="likes" className="element__likes-number">
                        {card.likes.length}
                    </span>
                </div>
            </div>
        </article>

    )
}