import { useState } from "react";
import Card from './Card';

function generateCards() {
    const numPairs = 8;
    const cards = [];
    for (let i = 0; i < numPairs; i++) {
        const content = String.fromCharCode(65 + i);
        cards.push(
            { id: i * 2, content, isFlipped: false, isMatched: false },
            { id: i * 2 + 1, content, isFlipped: false, isMatched: false }
        );
    }
    return shuffleArray(cards);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function GameBoard() {
    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);

    const handleCardClick = (id) => {
        const clickedCard = cards.find((card) => card.id === id);
        if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
            return;
        }

        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, isFlipped: true } : card
        );
        setCards(updatedCards);
        setFlippedCards((prev) => [...prev, id]);

        if (flippedCards.length === 1) {
            const firstCard = updatedCards.find((card) => card.id === flippedCards[0]);
            const secondCard = updatedCards.find((card) => card.id === id);

            if (firstCard.content === secondCard.content) {
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.content === firstCard.content
                            ? { ...card, isMatched: true }
                            : card
                    )
                );
            } else {
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card) =>
                            card.id === firstCard.id || card.id === secondCard.id
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                }, 1000);
            }
            setFlippedCards([]);
        }
    };

    return (
        <div className="game-board">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    content={card.content}
                    isFlipped={card.isFlipped || card.isMatched}
                    onClick={() => handleCardClick(card.id)}
                />
            ))}
        </div>
    );
}

export default GameBoard;