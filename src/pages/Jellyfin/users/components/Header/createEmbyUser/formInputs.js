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