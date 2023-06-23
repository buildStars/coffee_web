export const setLocal = (name, value) => {
    value = JSON.stringify(value)
    localStorage.setItem(name, value)
}
export const getLocal = (name) => {
    return JSON.parse(localStorage.getItem(name))
}

export const removeLocal = (name) => {
    localStorage.removeItem(name)
}