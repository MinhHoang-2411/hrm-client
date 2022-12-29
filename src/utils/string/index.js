export function upperCaseFirstCharacter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).split('_').join(' ').toLowerCase();
}
