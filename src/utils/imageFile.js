export const getType = (file) => {
    return file.file.type.slice(6)
}

export const getBase64 = (file) => {
    return file.content.slice(file.file.type.length + 13)
}