# Contributing to DocSchema

Thank you for your interest in contributing! DocSchema aims to become the universal standard for AI-readable document schemas. Every new vertical, country, or document type brings us closer to that goal.

---

## Ways to Contribute

| Contribution                                 | Difficulty |  Impact  |
| -------------------------------------------- | :--------: | :------: |
| Add a document type to an existing vertical  |  🟢 Easy   |   ⭐⭐   |
| Add a country variant (e.g., German helpers) | 🟡 Medium  |  ⭐⭐⭐  |
| Add a new business vertical                  | 🟡 Medium  |  ⭐⭐⭐  |
| Improve extraction prompts                   |  🟢 Easy   |   ⭐⭐   |
| Fix a JSON Schema pattern/regex              |  🟢 Easy   |    ⭐    |
| Propose a spec change                        |  🔴 Hard   | ⭐⭐⭐⭐ |

---

## Adding a New Country

### 1. Create country helpers

Create `src/helpers/{cc}.ts` where `{cc}` is the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code (lowercase):

```typescript
// src/helpers/de.ts — German field helpers

// Re-export universal primitives
export {
    text,
    num,
    enumField,
    email,
    datePattern,
    objectSchema,
    arrayOfObjects,
} from './schema.js';

// German date format: DD.MM.YYYY
export const datumDE = (desc = 'Datum im Format TT.MM.JJJJ') => ({
    type: 'string' as const,
    description: desc,
    pattern: '^\\\\d{2}\\\\.\\\\d{2}\\\\.\\\\d{4}$',
});

// German person fields
export const vorname = (desc = 'Vorname') => ({ type: 'string' as const, description: desc });

export const nachname = (desc = 'Nachname / Familienname') => ({
    type: 'string' as const,
    description: desc,
});

// German tax ID (Steueridentifikationsnummer) — 11 digits
export const steuerID = (desc = 'Steueridentifikationsnummer — 11-stellig') => ({
    type: 'string' as const,
    description: desc,
    pattern: '^\\\\d{11}$',
});
```

### 2. Key conventions

- **Re-export** all universal primitives from `schema.ts` so verticals can import from one file
- **Date format**: Use the country's standard format with a regex `pattern`
- **Person names**: Create helpers matching the country's naming conventions
- **IDs**: Include regex patterns for national ID formats (SSN, Codice Fiscale, etc.)
- **Descriptions**: Write in the country's language for field names, English for code comments

---

## Adding a New Business Vertical

### 1. Create the directory

```
src/verticals/{business-name}/{country-code}/
```

Examples: `src/verticals/law-firm/us/`, `src/verticals/medical/de/`

### 2. Create three files

| File               | Purpose                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `documentTypes.ts` | Document type definitions with JSON Schema extraction instructions                 |
| `entityTypes.ts`   | Entity definitions with data sources, field mappings, and conditional requirements |
| `index.ts`         | Assemble and export the `BusinessConfiguration`                                    |

### 3. Document Types (`documentTypes.ts`)

```typescript
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, objectSchema, firstName, lastName, dateUS } from '../../../helpers/us.js';

// Always define IDs as a const object for type safety and cross-referencing
export const DOC_IDS = {
    CONTRACT: 'doc-contract',
    COURT_FILING: 'doc-court-filing',
} as const;

export const documentTypes: DocumentTypeDef[] = [
    {
        id: DOC_IDS.CONTRACT,
        name: 'Contract',
        description: 'Legal contract or agreement',
        jsonSchema: objectSchema(
            {
                title: text('Contract title'),
                effectiveDate: dateUS('Effective date'),
                parties: text('Names of contracting parties'),
            },
            ['title', 'effectiveDate', 'parties'],
        ),
    },
];
```

**Rules:**

- Document IDs MUST use the `doc-` prefix and lowercase kebab-case
- Always export a `DOC_IDS` const object
- Use the country's field helpers — never raw `{ type: 'string' }`
- Include `description` for every document type
- Mark fields as `required` only if they appear on >90% of documents of this type

### 4. Entity Types (`entityTypes.ts`)

```typescript
import type { EntityTypeDef } from '../../../types.js';
import { DOC_IDS } from './documentTypes.js';

export const ENTITY_IDS = {
    CLIENT: 'entity-client',
} as const;

// Define reusable match field patterns
const NAME_MATCH = [
    { field: 'firstName', fuzzyThreshold: 0.2 },
    { field: 'lastName', fuzzyThreshold: 0.2 },
];

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.CLIENT,
        name: 'Client',
        icon: 'user',
        color: '#3b82f6',
        displayOrder: 0,
        fieldOrder: ['firstName', 'lastName', 'email'],
        dataSources: [
            {
                docTypeId: DOC_IDS.CONTRACT,
                enabled: true,
                canCreateEntity: true,
                fieldMappings: [
                    {
                        sourceField: 'clientName',
                        targetField: 'firstName',
                        matchFields: NAME_MATCH,
                    },
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
```

**Rules:**

- Entity IDs MUST use the `entity-` prefix
- Always export an `ENTITY_IDS` const object
- Define shared match field patterns as constants (e.g., `CF_NOME_COGNOME`)
- Use `canCreateEntity: true` on the primary document source
- Set `isRequired: true` for documents that must always be present

### 5. Conditional Requirements

Conditional requirements implement **IF-THEN** business logic. Example: _"If marital status is 'widowed', require a death certificate."_

```typescript
conditionalRequirements: [
    {
        docTypeId: DOC_IDS.DEATH_CERTIFICATE,
        enabled: true,
        conditions: [
            // OR logic: any of these triggers the requirement
            { sourceDocTypeId: DOC_IDS.ID_DOCUMENT, field: 'maritalStatus', operator: 'contains', value: 'widow' },
            { sourceDocTypeId: DOC_IDS.CONTRACT, field: 'parties.maritalStatus', operator: 'contains', value: 'widow' },
        ],
    },
],
```

**Operators:**
| Operator | Use When |
|----------|----------|
| `equals` | Exact value match (e.g., property type === "inheritance") |
| `contains` | Substring match, case-insensitive (e.g., status contains "divorced") |
| `exists` | Field is present and non-empty (e.g., mortgage amount exists) |

### 6. Configuration assembly (`index.ts`)

```typescript
import type { BusinessConfiguration } from '../../../types.js';
import { documentTypes, DOC_IDS } from './documentTypes.js';
import { entityTypes, ENTITY_IDS } from './entityTypes.js';

export { DOC_IDS, ENTITY_IDS };

export const lawFirmUsConfig: BusinessConfiguration = {
    id: 'LAW-FIRM-US-DEFAULT',
    name: 'US Law Firm',
    description: 'Document processing for US legal practice',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
};
```

### 7. Register in `src/index.ts`

Add your config to the main barrel export and the `allConfigurations` array.

### 8. Generate & test

```bash
npm run generate     # Auto-discovers and generates JSON → configs/
npm test             # Validates all configurations
```

---

## Validation

All generated configs are validated against `docschema.schema.json`. Before submitting a PR:

1. Run `npm run generate` — must succeed
2. Run `npm test` — all tests must pass
3. Review the generated JSON in `configs/` — check that schemas look reasonable

---

## Code Style

- **TypeScript strict mode** — no `any` types in new code
- **Const assertions** — use `as const` for ID objects
- **Field descriptions** — every JSON Schema field MUST have a `description`
- **Country language** — field names and descriptions should be in the document's language (e.g., Italian fields in Italian)

---

## Pull Request Process

1. **Fork** the repo and create a branch: `feat/{vertical}-{country}` or `fix/{description}`
2. **Implement** following the patterns above
3. **Test**: `npm run generate && npm test`
4. **Submit** a PR with:
    - What vertical/country you're adding
    - How many document types and entity types
    - Any conditional requirements (the interesting business logic)
5. A maintainer will review for spec compliance and merge

---

## Questions?

Open a [GitHub Discussion](https://github.com/piwi-ai/docSchema/discussions) for:

- **RFC proposals** — changes to the spec or type system
- **Help wanted** — questions about implementation patterns
- **Show & tell** — share your vertical with the community
