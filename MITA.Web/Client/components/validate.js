export const validate = (value, rules) => {
    let valid = true;
    if (!rules) {
        return valid;
    }
    if (rules.required) {
        valid = value.trim() !== '' && valid;
    }
    if (rules.minLength) {
        valid = value.length >= rules.minLength && valid;
    }
    if (rules.hasLower) {
        valid = /[a-z]/.test(value) && valid;
    }
    if (rules.hasNumbers) {
        valid = /[0-9]/.test(value) && valid;
    }
    if (rules.hasUpper) {
        valid = /[A-Z]/.test(value) && valid;
    }
    if (rules.hasSpecials) {
        /* eslint-disable no-useless-escape */
        valid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) && valid;
        /* eslint-enable */
    }
    if (rules.isEmail) {
        valid = /^.+?@.+?\..+?$/.test(value) && valid;
    }
    return valid;
};
export const validateFormInState = state =>
    Object.values(state)
        .filter(v =>
            Object.prototype.hasOwnProperty.call(v, "valid"))
        .every(t => t.valid);
