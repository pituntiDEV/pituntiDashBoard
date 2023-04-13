import { useState } from "react";

export const useRandomText = (nums = 8) => {
    const [random, setRandom] = useState("")
    const getRandomValues = () => {
        const lettersMin = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const lettersMay = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const allCharacters = [
            ...lettersMay,
            ...lettersMin,
            ...numbers,

        ]
        let text = ''
        for (let i = 0; i < nums; i++) {
            text += allCharacters[Math.floor(Math.random() * allCharacters.length - 1)] || "";
        }
        setRandom(text)
    }

    return [getRandomValues, random]
}

