export const validation = (name, value, userData, users) => {
    const errors = {};
    switch (name) {
        case "name":
            if (!value) {
                errors.name = "El nombre es obligatorio";
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errors.name = "El nombre solo puede contener letras y espacios";
            } else if (value.length < 2) {
                errors.name = "El nombre debe tener al menos 2 caracteres.";
            } else if (value.length > 50) {
                errors.name = "El nombre no debe tener más de 50 caracteres.";
            } else {
                if (errors.hasOwnProperty(name)) {
                    delete obj[prop];
                }
                errors.name = undefined;
            }
            break;
        case "username":
            if (!value) {
                errors.username = "El nombre de usuario es obligatorio";
            } else if (users.find((e) => e.credential.username === value)) {
                errors.username = "El nombre de usuario ya se encuentra en uso";
            } else if (value.length < 3 || value.length > 20) {
                errors.username =
                    "El nombre de usuario debe tener entre 3 y 20 caracteres";
            } else {
                errors.username = undefined;
            }
            break;
        case "email":
            if (!value) {
                errors.email = "El correo electrónico es obligatorio";
            } else if (users.find((e) => e.email === value)) {
                errors.email = "El email ya se encuentra registrado";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errors.email = "El correo electrónico no es válido";
            } else {
                errors.email = undefined;
            }
            break;
        case "nDni":
            if (!value) {
                errors.nDni = "El número de DNI es obligatorio";
            } else if (users.find((e) => e.nDni === parseInt(value))) {
                errors.nDni = "El DNI ya se encuentra registrado";
            } else if (!/^\d{8}$/.test(value)) {
                errors.nDni = "El número de DNI debe tener 8 dígitos";
            } else {
                errors.nDni = undefined;
            }
            break;
        case "birthdate":
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            const dayDifference = today.getDate() - birthDate.getDate();
            if (!value) {
                errors.birthdate = "La fecha de nacimiento es obligatoria";
            } else if (today.getFullYear() < birthDate.getFullYear()) {
                errors.birthdate =
                    "Debes ingresar una fecha anterior al día de hoy";
            } else if (
                age < 18 ||
                (age === 18 &&
                    (monthDifference < 0 ||
                        (monthDifference === 0 && dayDifference < 0)))
            ) {
                errors.birthdate = "Debes ser mayor de 18 años";
            } else {
                errors.birthdate = undefined;
            }
            break;
        case "phone":
            if (!value) {
                errors.phone = "El número de teléfono es obligatorio";
            } else if (!/^\d{10}$/.test(value)) {
                errors.phone = "El número de teléfono debe tener 10 dígitos";
            } else {
                errors.phone = undefined;
            }
            break;
        case "password":
            if (!value) {
                errors.password = "La contraseña es obligatoria";
            } else if (value.length < 6) {
                errors.password =
                    "La contraseña debe tener al menos 6 caracteres";
            } else {
                errors.password = undefined;
            }
            break;
        case "password2":
            if (!value) {
                errors.password2 =
                    "La confirmación de la contraseña es obligatoria";
            } else if (value !== userData.password) {
                errors.password2 = "Las contraseñas no coinciden";
            } else {
                errors.password2 = undefined;
            }
            break;
        default:
            break;
    }

    return errors;
};
