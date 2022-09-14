import React, { useContext } from 'react'
import Modal from '../../../components/modal/Modal';
import { StepCounter } from '../../../components/StepCounter/StepCounter';
import { appContext } from '../../../context/AppContext';
import NewUserContext from '../../../context/NewUserContextProvider';
import { Confirm } from './Confirm';
import { Role } from './Role';
import { SelectPackage } from './SelectPlans/SelectPackage';
import { UserInfo } from './UserInfo';
import "./NewUser.scss";

export const NewUser = ({users}) => {
    //Context
    const { state, reset } = useContext(NewUserContext);
    const { setOpenModal, state:{openModal}} = useContext(appContext);




    const steps = {
        1: <UserInfo />,
        2: <Role />,
        3: <SelectPackage />,
        4: <Confirm />
    }
    return (

        <section className="NewUser container">
            <div className="new-user-bar">
                <div className="num-users">
                    <p> <i className="fa-solid fa-users"></i> Total</p>
                    <span>{users.length}</span> 
                    <p>Usuarios</p>
                </div>
                <div>
                    <button className='btn-add' onClick={() => {
                        setOpenModal(true);
                    }}>
                        <i className="fa-solid fa-user-plus"></i>
                        agregar nuevo usuario
                    </button>
                </div>
            </div>
            {openModal &&
                <Modal title="New User" reset={reset} setOpenModal={setOpenModal}>

                    {/* Cunter */}
                    <StepCounter steps={steps} step={state.step} />
                    {steps[state.step]}

                </Modal>}
        </section>

    )
}
