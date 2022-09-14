import Joi from 'joi'


const joiValidate = (data,state,role) => {
    const SchemaAdmin=Joi.object({
        name: Joi.string().required().error(errors=>{
            errors.map(error => {
               error.message = error.code == "string.empty" && "Nombre es requerido"

               return error
           })
           return errors
       }),
       email: Joi.string()
           .email({ minDomainSegments: 2, tlds: {} }).error(errors => {
               errors.map(error => {
                   error.message = error.code == "string.empty" && "Email es requerido"
                   error.message = error.code == "string.email" && "Email no valido"
                   switch (error.code) {
                       case "string.empty":
                           error.message =  "Email es requerido"
                           break;
                       case "string.email":
                             error.message="Email no valido"
                           break; 
                   
                       default:
                           break;
                   }
               })
               return errors
           }),
       package: Joi.required().error(errors=>{
           errors.map(error=>{
               switch (error.code) {
                   case "string.empty":
                        error.message = "Paquete es requerido"
                       break;
               
                   default:
                       break;
               }
           })
           return errors
       }),
       conexion: Joi.number().required(),
    })
    const joiSchema = Joi.object({
        name: Joi.string().required().error(errors=>{
             errors.map(error => {
                error.message = error.code == "string.empty" && "Nombre es requerido"

                return error
            })
            return errors
        }),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: {} }).error(errors => {
                errors.map(error => {
                    error.message = error.code == "string.empty" && "Email es requerido"
                    error.message = error.code == "string.email" && "Email no valido"
                    switch (error.code) {
                        case "string.empty":
                            error.message =  "Email es requerido"
                            break;
                        case "string.email":
                              error.message="Email no valido"
                            break; 
                    
                        default:
                            break;
                    }
                })
                return errors
            }),
        package: Joi.required().error(errors=>{
            errors.map(error=>{
                switch (error.code) {
                    case "string.empty":
                         error.message = "Paquete es requerido"
                        break;
                
                    default:
                        break;
                }
            })
            return errors
        }),
        conexion: Joi.number().required(),
        platform: Joi.string(),
        credits: Joi.number().min(1).max(2).required().error(errors => {
            errors.map(error => {
                switch (error.code) {
                    case "number.min":
                        error.message = "minimo un credito"
                        break;
                    case "number.max":
                        error.message = "NO tienes suficientes creditos Max "+state.maxCredits + ` ${state.maxCredits>1?"Creditos":"Credito"}`+" de " + state.conexion+ " conexiones"
                        break;
                    default:
                        break;
                }
                return error
            })

            return errors
        }),


    })

    const Schema2= role=='admin' ? SchemaAdmin:joiSchema;
    const {error}=Schema2.validate(data);
 

    return error
}

export default joiValidate