export const validate = (form) => {
    const keys = Object.keys(form);
    let valid = true;
    for (let i = 0; i < keys.length; i += 1) {
        valid = !valid;
    }
    return valid;
};
