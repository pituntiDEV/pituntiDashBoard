import React, { useState } from 'react'
import useFetchApi from '../../hook/useFetchApi';
import { FilesList } from './components/FilesList/FilesList';
import { Search } from './components/Search/Search'
import "./Gdrive.scss";
export const Gdrive = () => {
    // State 
    const [query,setQuery] = useState("");
    const [files,setFiles] = useState([]);
    const [filesFilter,setFilesFilter] = useState([]);

    // Custom Hooks
    const [searchFiles,loading] = useFetchApi({
        url:`/api/gdrive/search`
    })
    const onChange = (e)=>{
       setQuery(e.target.value);
    }
    const search=()=>{
        setFiles([]);
        setFilesFilter([])
        searchFiles({body:JSON.stringify({query})})
            .then(files=>{
                setFiles(files);
                setFilesFilter(files)
            })
    }

    const filer=(e)=>{
        const value= e.target.value;
        const filesFilters = files.filter(file=>{
            if(value!=""){
                return file.name.toLowerCase().includes(value.toLowerCase())
            }
            return file
        })

         setFilesFilter(filesFilters);
          
    }
  return (
    <div className='Gdrive'>
        <Search placeholder="Escribe el nombre del archivo a buscar" onChange={onChange} onClick={search} className="gdrive__search"/>
        <Search placeholder="Buscar palabras claves Ejem:1x1 S01E01 s01e01 s1e2" onChange={filer}  className="gdrive__search"/>
       
        <FilesList loadingFiles={loading} files={filesFilter}/>
    </div>
  )
}
