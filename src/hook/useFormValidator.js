class Validator {
    constructor(data) {
        this.data = data;
        this.errors = {};
    }
    string() {
        if (typeof this.data != "string") {
            this.errors[this.data] = {
                type: "typeError",
                message: "Tiene que ser un string"
            }
        }
        return this
    }
    number() {
        if (typeof this.data != "number") {
            throw new TypeError("Tiene que ser un numero")
        }
        return this
    }
    required() {
        if (this.data == "") {
            throw new TypeError("Es requerido")
        }
    }
}

// NO terminado

export const useFormValidator = (data) => {
    const validate = new Validator(data);
    return validate
}

