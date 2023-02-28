import moment from "moment";
import { InputWithIcon } from "../../icons/InputWithIcon/InputWithIcon"

export const Owner = ({state,setState}) => {
  

    const dateChange=(e)=>{
        const value=e.target.value;
       let date= "";
       if(state.byMonth){
         const add = moment().add(value,"months").calendar();
          date = moment(add);
       }else{
         date = moment(value);
       }
     
       setState({...state,date});
       
    }

    const inputOnChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value});
    }
    return (
        <div className="owner">
            <div className='form-group'>
                <label htmlFor="email">Date</label>
                <div>
                    <input type="checkbox" name="" onChange={(e)=>{
                       
                       setState({...state,date:"",byMonth:e.target.checked})
                    }} checked={state.byMonth} id="byMonth"/> 
                    <label htmlFor="byMonth">By Month </label>
                </div>
               
                <InputWithIcon>
                    <i className="fa-solid fa-calendar-days"></i>
                    {
                        state.byMonth 
                        ?<select required defaultValue={""} name="credits" onChange={dateChange}>
                            <option value="" disabled>Add Mes</option>
                            <option value="1">1 Mes</option>
                            <option value="2">2 Meses</option>
                            <option value="3">3 Meses</option>
                            <option value="6">6 Meses</option>
                            <option value="9">9 Meses</option>
                            <option value="12">12 Meses</option>
                            
                        </select>
                         :<input value={moment(state.date,'YYYY-MM-DD').format("YYYY-MM-DD")}  onChange={dateChange} type="date" required placeholder="Date" name="date" />
                    }
                </InputWithIcon> 
            </div>

            <div className='form-group'>
                <label htmlFor="email">Connections:</label>
                <InputWithIcon>
                    <i className="fa-solid fa-satellite-dish"></i>
                    <input value={state.connections} onChange={inputOnChange} min={1} type="Number" required placeholder="Connections" name="connections" />
                </InputWithIcon>
            </div>

            <div className='form-group'>
            <input type="checkbox" onChange={(e)=>{
                    setState({...state, removeLibs:e.target.checked})
                }} checked={state.removeLibs} name="" id="" />
                <label htmlFor="email">Quitar librerias despues de que el servicio expire [DIAS]?:</label>
                <InputWithIcon>
                <i class="fa-solid fa-user-lock"></i>
                    <input type="Number" value={state.removeLibsDays} placeholder="Quitar libs" onChange={inputOnChange}  min={1} name="removeLibsDays" />
                    <small>Dias</small>
                </InputWithIcon>
            </div>

            <div className='form-group'>
                <input type="checkbox" onChange={(e)=>{
                    setState({...state, delete:e.target.checked})
                }} checked={state.delete} name="" id="" />
                <label className='text-danger'htmlFor="email">Eliminar automaticamente despues de vencido [DIAS]?:</label>
                <InputWithIcon>
                <i class="fa-solid fa-user-xmark"></i>
                    <input onChange={inputOnChange} type="Number" placeholder="Eliminar" value={state.deleteDays}  min={1} name="deleteDays" />
                    <small>Dias</small>
                </InputWithIcon>
            </div>
                 
        </div>
        
    )
}