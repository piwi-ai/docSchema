/**
 * Syntax-highlights a JSON string by wrapping tokens in <span> elements.
 * Returns an HTML string intended for use with dangerouslySetInnerHTML.
 */
export function syntaxHighlight(json: string): string {
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? 'json-key' : 'json-string';
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return `<span class="${cls}">${match}</span>`;
        },
    );
}

/**
 * Derive a display filename from a vertical's metadata.
 * e.g. { slug: 'real-estate-it', vertical: 'Real Estate', country: 'Italy' }
 *   → "real-estate/it.config.json"
 */
export function getConfigFilename(slug: string): string {
    const lastDash = slug.lastIndexOf('-');
    if (lastDash === -1) return `${slug}.config.json`;
    const vertical = slug.substring(0, lastDash);
    const country = slug.substring(lastDash + 1);
    return `${vertical}/${country}.config.json`;
}
