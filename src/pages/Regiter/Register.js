import React,{useState} from 'react'
import SWAlert from '../../components/SwAlert/SWAlert';
import useFetch from '../../hook/useFetchApi';
import "./Register.scss";
export const Register = () => {
    //Hooks
    const [errors,setErrors] = useState({});
    const [data,setData] = useState({
        email: "",
        password: "",
        password2: "",
        name: "",
    })

    const [req,loading] =useFetch({
        url: "/api/auth/register",
    })
    //Functions
    const submit=(e)=>{
        e.preventDefault();
        const {email,password,password2,name} = data;
        const keys= Object.keys(data);
        const errors = {};
        keys.forEach(key=>{
            if(!data[key]){
                errors[key] = `${key} is required`;
            }
        })
    
        if(password !== password2){
            errors.password2 = "Passwords must match";
        }
        setErrors(errors);
        const errorsCount=Object.keys(errors).length;
        if(errorsCount > 0){return }
       
        req({
            body: JSON.stringify(data) 
        }).then(data=>{
            data.error && SWAlert.error({
                text: data.message.msg
            })
            SWAlert.success({
                text: data.message.msg
            })
        })
        .catch(err=>{
            SWAlert.error({
                text: err.message.msg
            })
        })
    }

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })  
    }
    return (
        <div className="register">


            <form onSubmit={submit}>
                <h1>Register</h1>

                <div className="form-group">
                    <label>Name</label>
                    <input onChange={onChange} type="text" name="name" className="form-control" placeholder="Enter Name" />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input  onChange={onChange} type="email" name="email" className="form-control" placeholder="Enter email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input  onChange={onChange} type="password" name="password" className="form-control" placeholder="Enter password" />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input  onChange={onChange} type="password" name="password2" className="form-control" placeholder
                        ="Confirm password" />
                    {errors.password2 && <span className="error">{errors.password2}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-register">Submit</button>


            </form>
        </div>
    )
}
