import accountantIt from './accountant-it.json';
import carDealershipIt from './car-dealership-it.json';
import insuranceIt from './insurance-it.json';
import realEstateIt from './real-estate-it.json';
import realEstateUs from './real-estate-us.json';

export interface DocTypeDef {
    id: string;
    name: string;
    description: string;
    isArrayExtraction?: boolean;
    jsonSchema: {
        type: string;
        properties: Record<string, SchemaField>;
        required?: string[];
    };
}

export interface SchemaField {
    type: string;
    description?: string;
    pattern?: string;
    enum?: (string | null)[];
    nullable?: boolean;
    format?: string;
    properties?: Record<string, SchemaField>;
    required?: string[];
    items?: {
        type: string;
        properties?: Record<string, SchemaField>;
        required?: string[];
    };
}

export interface DataSourceField {
    source: string;
    target: string;
}

export interface DataSource {
    docTypeId: string;
    fields: DataSourceField[];
    matchFields?: { field: string; fuzzyThreshold?: number }[];
}

export interface Condition {
    field: string;
    operator: string;
    value?: string;
}

export interface ConditionalRequirement {
    docTypeId: string;
    conditions: Condition[];
}

export interface EntityTypeDef {
    id: string;
    name: string;
    description: string;
    dataSources: DataSource[];
    conditionalRequirements?: ConditionalRequirement[];
}

export interface BusinessConfig {
    id: string;
    name: string;
    description: string;
    schemaVersion: number;
    documentTypes: DocTypeDef[];
    entityTypes: EntityTypeDef[];
}

export interface VerticalMeta {
    config: BusinessConfig;
    slug: string;
    flag: string;
    country: string;
    vertical: string;
}

export const verticals: VerticalMeta[] = [
    {
        config: accountantIt as unknown as BusinessConfig,
        slug: 'accountant-it',
        flag: '🇮🇹',
        country: 'Italy',
        vertical: 'Accountant',
    },
    {
        config: carDealershipIt as unknown as BusinessConfig,
        slug: 'car-dealership-it',
        flag: '🇮🇹',
        country: 'Italy',
        vertical: 'Car Dealership',
    },
    {
        config: insuranceIt as unknown as BusinessConfig,
        slug: 'insurance-it',
        flag: '🇮🇹',
        country: 'Italy',
        vertical: 'Insurance',
    },
    {
        config: realEstateIt as unknown as BusinessConfig,
        slug: 'real-estate-it',
        flag: '🇮🇹',
        country: 'Italy',
        vertical: 'Real Estate',
    },
    {
        config: realEstateUs as unknown as BusinessConfig,
        slug: 'real-estate-us',
        flag: '🇺🇸',
        country: 'USA',
        vertical: 'Real Estate',
    },
];

export function getStats() {
    const totalDocTypes = verticals.reduce((sum, v) => sum + v.config.documentTypes.length, 0);
    const totalEntityTypes = verticals.reduce((sum, v) => sum + v.config.entityTypes.length, 0);
    const totalFields = verticals.reduce((sum, v) => {
        return (
            sum +
            v.config.documentTypes.reduce((dSum, dt) => {
                return dSum + Object.keys(dt.jsonSchema.properties).length;
            }, 0)
        );
    }, 0);
    return { totalDocTypes, totalEntityTypes, totalFields, totalVerticals: verticals.length };
}
