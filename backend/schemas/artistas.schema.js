import yup from 'yup'

export const artistaSchema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    foto: yup.string().required('La foto es requerida'),
    descripcion: yup.string().required('La descripción es requerida')
})
