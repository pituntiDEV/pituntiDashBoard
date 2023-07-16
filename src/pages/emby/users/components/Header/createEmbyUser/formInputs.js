const form = {
    inputs: [
        {
            name: "name",
            label: "Nombre",
            required: true
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            required: true

        },

        {
            name: "credits",
            label: "Credits",
            type: "number",
            required: true,
            min: 1

        },
        {
            name: "connections",
            label: "Conexiones",
            type: "number",
            required: true,
            min: 1

        },


    ],
    inputsAdmins: [

        {
            name: "daysToDeleteAfterExpired",
            label: "Dias a eliminar",
            type: "number",
            min: 0,
            small: "Dejar en blanco para Eliminar"
        }, {
            name: "daysToRemoveLibsAfterToExpired",
            label: "Quitar librerias despues de (Dias)",
            min: 0,
            type: "number",
            small: "Dejar en blanco para no quitar libs"
        }
    ]
}

export default form;