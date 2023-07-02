import React, { useContext } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi';
import SWAlert from '../../../../../components/SwAlert/SWAlert';
import { Spinner } from '../../../../../components/Spinner/Spinner';
import { Context } from '../../DemosContext';

export const DeleteDemo = (props) => {
    const { demo, setOpenModal } = props;
    const { demos, setDemos } = useContext(Context);

    const [deleteDemo, loading] = useFetchApi({
        url: `/api/emby/demos/${demo._id}`,
        method: 'DELETE'
    })
    const deleteDemoFunc = () => {
        deleteDemo()
            .then(data => {
                const newDemoState = demos.filter(d => d._id != demo._id);
                setDemos(newDemoState)
                SWAlert.alert({
                    title: data.message || "OK"
                })
                setOpenModal(false)

            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })
    }
    return (
        <div>
            <div className="alert alert-danger">
                Seguro que quires eliminar a {demo.email}
            </div>

            {!loading &&
                <div className="d-flex gap-3">
                    <button onClick={deleteDemoFunc} className='btn btn-primary'>
                        Si,Eliminar
                    </button>
                    <button onClick={() => setOpenModal(false)} className='btn btn-secondary'>
                        Cancelar
                    </button>
                </div>
            }

            {
                loading &&
                <Spinner />
            }




        </div>
    )
}
