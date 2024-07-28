"use client";

import { useState, useEffect, useRef } from "react";
import { getAllGoals, Goal } from "@/services/goal";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Volume2, VolumeX } from "lucide-react";
import Loader from "@/components/loader";
export default function MemoryGame() {
    const [boardData, setBoardData] = useState<Goal[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchGoals = async () => {

            setLoading(true);
            try {
                const goals = await getAllGoals();
                const limitedGoals = goals.slice(0, 4); // Limit to 4 goals for 3x3 grid (8 cards total)
                const duplicatedGoals = [...limitedGoals, ...limitedGoals]; // Duplicate the goals for the game
                const shuffledGoals = duplicatedGoals.sort(() => Math.random() - 0.5);
                setBoardData(shuffledGoals);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching goals:", error);
                setLoading(false);
            }
        };

        fetchGoals();
    }, []);

    useEffect(() => {
        if (matchedCards.length === boardData.length && matchedCards.length > 0) {
            setGameOver(true);
            playConfetti();
            setTimeout(() => {
                setShowAlert(true);
                if (!isMuted && audioRef.current) {
                    audioRef.current.play();
                }
            }, 4000); // Show alert after 4 seconds
        }
    }, [moves]);

    const playConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    const updateActiveCards = (index: number) => {
        if (!flippedCards.includes(index)) {
            if (flippedCards.length === 1) {
                const firstIdx = flippedCards[0];
                const secondIdx = index;

                if (boardData[firstIdx].image === boardData[secondIdx].image) {
                    setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
                }

                setFlippedCards([...flippedCards, index]);
            } else if (flippedCards.length === 2) {
                setFlippedCards([index]);
            } else {
                setFlippedCards([...flippedCards, index]);
            }

            setMoves((prev) => prev + 1);
        }
    };

    const initialize = () => {
        setGameOver(false);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);

        const shuffledGoals = [...boardData].sort(() => Math.random() - 0.5);
        setBoardData(shuffledGoals);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };



    if (loading) {
        return <> <Loader /></>;
    }


    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <audio ref={audioRef} src="/clapping.mp3" preload="auto"></audio>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Memory Card Game</h1>
                <p className="text-lg text-gray-700">
                    Match the cards to win the game. Click Reset to start over.
                </p>
            </div>

            <div className="menu mb-4 flex justify-between items-center w-full max-w-xl">
                <p className="text-xl">{`Moves: ${moves}`}</p>
                <Button onClick={initialize} className="reset-btn">
                    Reset
                </Button>

            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
                {boardData.map((data, index) => {
                    const isFlipped = flippedCards.includes(index);
                    const isMatched = matchedCards.includes(index);

                    return (
                        <Card
                            key={index}
                            className={`card ${isFlipped || isMatched ? "active rounded" : ""} ${isMatched ? "matched rounded" : ""} ${gameOver ? "gameover rounded" : " rounded"}`}
                            onClick={() => updateActiveCards(index)}
                            style={{ border: "1px solid #ccc", cursor: "pointer", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                        >
                            <CardContent className="relative h-40">
                                {isFlipped || isMatched ? (
                                    <motion.img
                                        src={data.image}
                                        alt={data.title}
                                        className="absolute inset-0 w-full h-full object-cover rounded"
                                        initial={{ opacity: 0, rotateY: 90 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: -90 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                ) : (
                                    <motion.div
                                        className="absolute inset-0 w-full h-full bg-gray-300 rounded"
                                        initial={{ opacity: 0, rotateY: -90 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: 90 }}
                                        transition={{ duration: 0.5 }}
                                    ></motion.div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {showAlert && (
                <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                            <AlertDialogDescription>
                                You have completed the game with {moves} moves.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setShowAlert(false)}>Close</AlertDialogCancel>
                            <Button onClick={toggleMute}>
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
