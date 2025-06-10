export function escapeLike(value) {
    return value
        .replace(/\\/g, '\\\\')  // Escape backslashes
        .replace(/%/g, '\\%')    // Escape %
        .replace(/_/g, '\\_');   // Escape _
}