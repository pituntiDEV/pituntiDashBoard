import React from 'react'
import { useContext } from 'react'
import SWAlert from '../../../components/SwAlert/SWAlert'
import NewUserContext from '../../../context/NewUserContextProvider'
import useFetchApi from '../../../hook/useFetchApi'
import { Buttons } from './Buttons'
import joiValidate from './joiSchema';
import moment from 'moment';
import { UsersContext } from '../../../context/usersContext'
import { appContext } from '../../../context/AppContext'
export const Confirm = () => {
    //Context
    const { state } = useContext(NewUserContext);
    const {state:usersState,setState}=useContext(UsersContext);
    const {socket}=useContext(appContext);

    
    //Custom Hooks
    const url = state.role == "admin" ? "/api/plex/user/add" : "/api/plex/user/add/reseller"
    const [req, loading] = useFetchApi({
        url,
        method: "POST",
    })



    //Functions
    const submit = () => {
        
        const dataAdminValidate = {
            email: state.email,
            name: state.name,
            package: state.package,
            conexion: state.conexion,

        }

        const dataResellerToValidate = {
            email: state.email,
            name: state.name,
            package: state.package,
            conexion: state.conexion,
            platform: "plex",
            credits: state.creditos


        }
        const dataToValidate = state.role === "admin" ? dataAdminValidate : dataResellerToValidate

        const error = joiValidate(dataToValidate, state, state.role);
        if (error) {
            SWAlert.error({
                title: error.message
            })
            return;
        }

    
        const dataToSendAdmin = {
            "email": state.email,
            "name": state.name,
            "platform": "plex",
            "package": state.package._id
        }

        const dataToSendReseller = {
            "email": state.email,
            "name": state.name,
            "platform": "plex",
            "package": state.package._id,
            "credits":state.creditos,
            "conexion":state.conexion,
        }

        const dataToSend= state.role === "admin" ? dataToSendAdmin : dataToSendReseller;

        req({
            body: JSON.stringify(dataToSend),
        })
            .then(data => {
                if(!data.error){
                    // const newUsers=[...usersState.users,data.user];
                    // setState({...usersState,users:newUsers});
                }
                console.log(data);
            })
            .catch(error => {
                console.log(error, "Eroor");
            })

           

    }


    const dateConvert = (byDate, date) => {
        const dateFormat = byDate && date ? moment(date).format("DD MMMM YYYY")
            : !byDate && date && moment(moment().add(date, "month").calendar()).format("DD MMMM YYYY");

        const dataFormatReseller=state.creditos> 0 ?moment().add(state.creditos,"month").format("DD MMMM YYYY"):null;
        return state.role=="admin"?dateFormat:dataFormatReseller;
    }
    return (<>
        <h2 className="text-center mt-4">Resumen:</h2>
        <div className='confirm p-2 mt-4'>
            <div className={`${!state.name && "alert alert-danger"}`}>
                <p>Name:</p>
                <small className='text-muted'>{state.name}</small>
            </div>
            <div className={`${!state.email && "alert alert-danger"}`}>
                <p>Email:</p>
                <small className='text-muted'>{state.email}</small>
            </div>
            <div className={
                `date alert ${state.role=="reseller" && 
                state.creditos < 1 && 
                "alert alert-danger"}

                ${!state.date && !state.months && state.role=="admmin" &&"alert-danger"}
                
                `}> 
                
                
                <p>Expire date:</p>
                <small className='text-muted'>
                    {state.role=="admin" && dateConvert(state.byDate, state.date)}
                    {state.role=="admin" && dateConvert(state.byDate, state.months)}
                    {state.role=="reseller" && dateConvert(false)}
                </small>
            </div>
            <div className={`${!state.package && "alert alert-danger"}`}>
                <p>Paquete:</p>
                <small className='text-muted'>{state?.package?.name}</small>
            </div>
        </div>
        <Buttons disabled={false} submit={submit} end={true} />
    </>
    )
}
