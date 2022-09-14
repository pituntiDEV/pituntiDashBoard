// CommonJS
const Swal = require('sweetalert2')

const success=({title ='Success',text=""}={})=>{
    Swal.fire({
      title,
      text,
      icon: 'success',
      allowOutsideClick:false,
      confirmButtonText: 'OK',
        // preConfirm: () => {
        //     window.location.href = "/";
        // }
    })
    
}

const error=({title="Error",text=""}={})=>{
    Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'OK'
        })
}

export default {
    success,
    error

}