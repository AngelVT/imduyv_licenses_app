export function validateRedirection(group, requiredPasswordReset) {
    if (requiredPasswordReset) {
        return '/app/passwordReset'
    }

    switch (group) {
        case 'all':
            return '/app/mainMenu'

        case 'land_use':
            return '/app/landMenu'

        case 'urban':
            return '/app/urbanMenu'

        case 'consultant':
            return '/app/consultant'

        default:
            return '/app/login'
    }
}

export function validatePassword(password) {
    if (password.length < 12) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (!/[a-z]/.test(password)) {
        return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
    }

    return true;
}