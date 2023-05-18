import React from 'react'
import { Form } from '../../../../components/Form/Form'
import { useState } from 'react';
import { useGetEmbyAccounts } from '../../../../hook/emby/useGetEmbyAccounts';
import { useGetPackagesByAccount } from '../../../../hook/emby/useGetPackagesByAccount';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';



export const NewDemoForm = ({ setOpenModal, demos, setDemos }) => {
    //States
    const [formData, setFormData] = useState({
        packages: []
    });
    const [accounts] = useGetEmbyAccounts()
    const [packages, setPackages, loading] = useGetPackagesByAccount(formData.account);

    const options = {
        inputs: [
            {
                name: "name",
                type: "text",
                required: true,
            },
            {
                name: "email",
                type: "email",
                required: true,
            },

            {
                name: "duration",
                type: "number",
                min: 1,
                required: true,
                placeholder: "En horas"
            },

        ],
        selects: [
            {
                name: "account",
                required: true,
                title: "Server",
                placeholder: "Selecciona un server",
                options: accounts.map(acc => ({
                    name: acc.data.name,
                    _id: acc._id
                }))
            }
        ],
        list: [
            {
                name: "packages",
                data: packages
            }
        ]

    }

    const props = {
        options,
        formData,
        setFormData,
        btnSubmitTitle: "Agregar",
        setOpenModal
    }


    //Custom hOOks
    const [addDemo, loadingAddDemo] = useFetchApi({
        url: `/api/emby/demos`,
        method: "POST",
    })

    //Functions
    const submit = (e) => {
        e.preventDefault();
        if (formData.packages.length == 0) {
            SWAlert.error({
                title: "Selecciona un paquete"
            });
            return
        }

        addDemo({ body: JSON.stringify(formData) })
            .then(data => {
                const newDemosState = [data.data, ...demos];
                setDemos(newDemosState);

                SWAlert.alert({
                    title: data.message
                })
                setOpenModal(false);
            })
            .catch(error => SWAlert.error({ title: error.message }));


    }
    return (
        <form onSubmit={submit}>
            <Form {...props} />

        </form>
    )
}
