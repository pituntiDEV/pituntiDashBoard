import React, { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import Modal from '../../../../components/modal/Modal';
import useFetchApi from '../../../../hook/useFetchApi';

export const FilesList = ({files}) => {
    const [openModal,setOpenModal] = useState(false);
    const [email,setEmail] = useState(localStorage.getItem("gdriveEmail"));
    const [file,setFile]=useState(null);
    const [fileName,setFileName] = useState("");

    const [share,loading] = useFetchApi({
        url:`/api/gdrive/share`
    })

    const submit=(e)=>{
        e.preventDefault();
        const formData = {
            fileId:file,
            email
        }
         share({body:JSON.stringify(formData)})
            .then(data=>{
                console.log(data);
            })
    }
  return (
    <div className='files__containers'>
        <div className="files">
            {files.map(file=>{
                return (
                    <div className='file' key={file.id}>
                        <div className="name">{file.name}</div>
                        <i onClick={()=>{
                           setFile(file.id);
                           setFileName(file.name);
                           setOpenModal(true)
                        }} className="fa-solid fa-share-nodes"></i>
                    </div>
                )
            })}
        </div>

        {openModal &&<Modal setOpenModal={setOpenModal} title='Compartir con migo'>
               <form onSubmit={submit} action="">
                   <div className="">
                    <span className='fw-600'>Compartir:</span>
                    <small className='text-muted'> {fileName}</small>
                   </div>
                    <div className="form__group">
                        <label htmlFor="email">Email de googleDrive a compartir</label>
                        <input onChange={(e)=>{
                            localStorage.setItem("gdriveEmail",e.target.value)
                            setEmail(e.target.value);
                        }} type="email" required value={email} name="email" id="email" />
                    </div>

                   <div className="d-flex gap-3">
                    <BtnPrimary title="Compartir"/>
                   <BtnSecondary type="button" onClick={()=>setOpenModal(false)} title="Cancelar"/>
                   </div>
               </form>
        </Modal>}
    </div>
  )
}
