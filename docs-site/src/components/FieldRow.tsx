import { Hash, Type, List, Braces, AlertCircle } from 'lucide-react';
import type { SchemaField } from '../data/configs';

/**
 * Renders a single field row inside a schema table.
 * Shared by Documents and Verticals pages.
 */
export default function FieldRow({
    name,
    field,
    isRequired,
}: {
    name: string;
    field: SchemaField;
    isRequired: boolean;
}) {
    const typeIcon =
        {
            string: <Type size={14} />,
            number: <Hash size={14} />,
            object: <Braces size={14} />,
            array: <List size={14} />,
        }[field.type] || <Type size={14} />;

    const typeColor =
        {
            string: 'green',
            number: 'amber',
            object: 'purple',
            array: 'blue',
        }[field.type] || 'green';

    return (
        <tr className="field-row">
            <td className="field-row__name">
                <code>{name}</code>
                {isRequired && (
                    <span className="field-row__req" title="Required">
                        <AlertCircle size={12} />
                    </span>
                )}
            </td>
            <td>
                <span className={`badge badge--${typeColor}`}>
                    {typeIcon} {field.type}
                </span>
            </td>
            <td className="field-row__desc">
                {field.description || '—'}
                {field.pattern && <code className="field-row__pattern">{field.pattern}</code>}
                {field.enum && (
                    <span className="field-row__enum">
                        {field.enum.filter(Boolean).join(' | ')}
                    </span>
                )}
            </td>
        </tr>
    );
}
