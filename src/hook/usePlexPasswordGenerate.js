
export const usePlexPasswordGenerate = () => {
    const generate = () => {
        const lettersMin = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const lettersMay = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let password = ''
        for (let i = 0; i < 2; i++) {

            password += lettersMin[Math.floor(Math.random() * 26)];
            password += lettersMin[Math.floor(Math.random() * 26)];
            password += lettersMay[Math.floor(Math.random() * 26)];
            password += lettersMay[Math.floor(Math.random() * 26)];
            password += numbers[Math.floor(Math.random() * 10)];
            password += numbers[Math.floor(Math.random() * 10)];
        }
        password += "@";
        return password

    }
    return [generate];
}
