import yup from 'yup'

export const viniloSchema = yup.object({
    titulo: yup.string().required('El título es requerido'),
    artista: yup.string().required('El artista es requerido'),
    descripcion: yup.string().required('La descripción es requerida'),
    precio: yup.number().typeError('El precio debe ser un número').positive('El precio debe ser positivo').required('El precio es requerido'),
    generos: yup.string().required('El género es requerido'),
    portada: yup.string().required('La portada es requerida'),
    link: yup.string().optional(),
    pais: yup.string().optional(),
    lanzamiento: yup.string().optional(),
    foto_artista: yup.string().optional(),
    artista_id: yup.string().optional()
})
