export const removePhone84 = (phone) => {
    if (!phone) return phone;
    if (phone.indexOf('84') === 0) {
        return phone.slice(2);
    }
    return phone;
}