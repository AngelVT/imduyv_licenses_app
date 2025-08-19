export function escapeLike(value) {
    return value
        .replace(/\\/g, '\\\\')  // Escape backslashes
        .replace(/%/g, '\\%')    // Escape %
        .replace(/_/g, '\\_');   // Escape _
}

export function unaccent(text) {
    return text
        .normalize("NFD")                 // Descompone letras y acentos
        .replace(/[\u0300-\u036f]/g, ""); // Elimina los diacríticos
}