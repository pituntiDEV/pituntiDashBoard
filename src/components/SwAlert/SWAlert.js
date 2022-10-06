// CommonJS
const Swal = require('sweetalert2')

const success=({title ='Success',preConfirm=()=>{},text=""}={})=>{
    Swal.fire({
      title,
      text,
      icon: 'success',
      allowOutsideClick:false,
      confirmButtonText: 'OK',
        preConfirm
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

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

const alert=({title="alert",icon="success"})=>{
 
      
      Toast.fire({
        icon,
        title
      })
}

export default {
    success,
    error,
    alert

}