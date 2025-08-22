import { useState, useEffect } from "react";
import Card from './Card';
import {
    FaHeart, FaStar, FaMoon, FaSun,
    FaCat, FaDog, FaCar, FaTree
} from 'react-icons/fa';

function generateCards(numPairs = 8) {
    const iconPairs = [{ name: 'heart', component: <FaHeart className="heart-icon" /> },
    { name: 'star', component: <FaStar className="star-icon" /> },
    { name: 'moon', component: <FaMoon className="moon-icon" /> },
    { name: 'sun', component: <FaSun className="sun-icon" /> },
    { name: 'cat', component: <FaCat className="cat-icon" /> },
    { name: 'dog', component: <FaDog className="dog-icon" /> },
    { name: 'car', component: <FaCar className="car-icon" /> },
    { name: 'tree', component: <FaTree className="tree-icon" /> }];

    const cards = [];

    for (let i = 0; i < numPairs; i++) {
        const icon = iconPairs[i];
        cards.push(
            {
                id: i * 2,
                content: icon.name,
                icon: icon.component,
                isFlipped: false,
                isMatched: false
            },
            {
                id: i * 2 + 1,
                content: icon.name,
                icon: icon.component,
                isFlipped: false,
                isMatched: false
            }
        );
    }

    return shuffleArray(cards);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function GameBoard() {
    const [gameState, setGameState] = useState("menu");
    const [flippedCards, setFlippedCards] = useState([]);
    const [cards, setCards] = useState([]);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startGame = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setTime(0);
        setIsRunning(true);
        setGameState("playing");
    };

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

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
            setIsRunning(false);
            setGameState("finished");
        }
    }, [cards]);

    return (
        <>
            {gameState === "menu" && (
                <div className="menu">
                    <h1>Memory Game</h1>
                    <p>Find all the matching pairs as fast&nbsp;as&nbsp;you&nbsp;can!</p>
                    <button onClick={startGame}>Start Game</button>
                </div>
            )}

            {gameState === "playing" && (
                <>
                    <div className="game-info">
                        <p>Time: {time} sec</p>
                    </div>
                    <div className="game-board">
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                card={card}
                                isFlipped={card.isFlipped || card.isMatched}
                                onClick={() => handleCardClick(card.id)}
                            />
                        ))}
                    </div>
                </>
            )}

            {gameState === "finished" && (
                <div className="end-screen">
                    <h2>🎉 Congrats!</h2>
                    <p>You matched all pairs in {time} seconds.</p>
                    <button onClick={startGame}>Play Again</button>
                    <button onClick={() => setGameState("menu")}>Back to Menu</button>
                </div>
            )}
        </>
    );
}

export default GameBoard;