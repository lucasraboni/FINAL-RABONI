import yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string().email('Debe ser un email válido').required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida')
})

export const registerSchema = yup.object({
    email: yup.string().email('Debe ser un email válido').required('El email es requerido'),
    password: yup.string()
        .required('La contraseña es requerida')
        .min(8, 'Mínimo 8 caracteres')
        .matches(/[0-9]/, 'Debe tener al menos un número')
        .matches(/[A-Z]/, 'Debe tener al menos una mayúscula')
        .matches(/[a-z]/, 'Debe tener al menos una minúscula')
        .matches(/[@$!%*?&._-]/, 'Debe tener al menos un símbolo'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
        .required('Confirmar contraseña es requerido')
})