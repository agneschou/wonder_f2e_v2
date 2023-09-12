export function compareIgnoreCase(fieldValue: string | number, value: string | number) {
    return fieldValue.toString().toLowerCase() === value.toString().toLocaleLowerCase();
}
