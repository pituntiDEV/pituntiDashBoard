import React, { useState } from 'react'
import useFetchApi from '../../hook/useFetchApi';
import { FilesList } from './components/FilesList/FilesList';
import { Search } from './components/Search/Search'
import "./Gdrive.scss";
export const Gdrive = () => {
    // State 
    const [query,setQuery] = useState("");
    const [files,setFiles] = useState([]);

    // Custom Hooks
    const [searchFiles,loading] = useFetchApi({
        url:`/api/gdrive/search`
    })
    const onChange = (e)=>{
       setQuery(e.target.value);
    }
    const search=()=>{
        setFiles([]);
        searchFiles({body:JSON.stringify({query})})
            .then(files=>{
                setFiles(files);
            })
    }
  return (
    <div className='Gdrive'>
        <Search placeholder="Escribe el nombre del archivo a buscar" onChange={onChange} onClick={search} className="gdrive__search"/>
        <FilesList loadingFiles={loading} files={files}/>
    </div>
  )
}
