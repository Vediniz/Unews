export function TextLimit({text, limit}) {
    const newText = text.length > limit ? `${text.substring(0, limit)}...` : text

    return newText
}