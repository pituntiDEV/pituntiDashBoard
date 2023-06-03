export const usePlexPasswordValidate = () => {
    const validatePassword = (password) => {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{10,}).*$/;

        // Verificar si la contraseña cumple con los requisitos
        if (!regex.test(password)) {
            throw new Error("Agrega una contraseña valida de minimo 10 caracteres incluyendo letras minusculas y mayusculas , numeros & carateres especial: @#$%^&+=")
        }
        return true;
    }

    return [validatePassword]
}
