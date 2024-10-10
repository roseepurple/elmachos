import {animated, useSpring} from "@react-spring/web";
import useSound from "use-sound";
// @ts-ignore
import soundFile from "../assets/musique.mp3";
import React, {useEffect, useState} from "react";
import img from "../assets/img.png";
import '../styles/intro.css';

interface IntroProps {
    onClick: () => void;
}

export const Intro = ({onClick}: IntroProps) => {
    const textSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 1000 },
    });

    const [play, { stop, duration }] = useSound(soundFile, { volume: 1 });
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            play();
        } else {
            stop();
        }
    }, [isPlaying, play, stop, duration]);

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <>

            <div className="title-container">
                <animated.h1 style={textSpring} className="war-title">
                    ⚔️ Bon anniversaire ElMachos ⚔️
                </animated.h1>

            </div>

            <animated.img
                src={img}
                alt="War scene"
                className="central-image"
                onClick={handleClick}
            />

            <animated.p style={textSpring} className="war-message">
                Galette dans le bed
            </animated.p>

            <animated.button style={textSpring} className={"quiz-button"} onClick={onClick}>Démarrer le Quiz</animated.button>

        </>
    );
}