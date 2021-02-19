
export function maybeParseClasses(maybeString: string | undefined) {
    if (typeof maybeString === 'string' && maybeString.length > 0) {
        return maybeString.split(' ');
    }
    return undefined;
}