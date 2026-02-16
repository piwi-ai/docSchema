# DocSchema Specification v1.0

**An open standard for AI-readable document schemas**

This specification defines a portable, JSON-based format for describing business documents, their extractable fields, and cross-document entity relationships. Any AI system — regardless of provider — can consume these definitions to automatically extract, validate, and link structured data from unstructured documents.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Conventions](#2-conventions)
3. [Document Types](#3-document-types)
4. [Entity Types](#4-entity-types)
5. [Cross-Document Validation](#5-cross-document-validation)
6. [Business Configuration](#6-business-configuration)
7. [Field Helpers](#7-field-helpers)

---

## 1. Overview

A **DocSchema configuration** is a JSON file that tells an AI system:

| Question                                        | Answered By                               |
| ----------------------------------------------- | ----------------------------------------- |
| What documents exist in this business?          | `documentTypes[]`                         |
| What data should the AI extract from each one?  | `documentTypes[].jsonSchema`              |
| How do documents relate to real-world entities? | `entityTypes[].dataSources[]`             |
| When is a document conditionally required?      | `entityTypes[].conditionalRequirements[]` |

### Design Principles

- **LLM-agnostic**: Works with any AI provider (Gemini, GPT, Claude, Llama, etc.)
- **Country-aware**: Same document concept, localized fields and formats per country
- **Declarative**: Configuration describes _what_, not _how_ — implementations decide execution
- **JSON Schema native**: Extraction schemas use standard [JSON Schema](https://json-schema.org) vocabulary
- **Zero runtime dependencies**: Pure data definitions, no libraries required

---

## 2. Conventions

### Identifiers

| Type          | Prefix    | Example                              |
| ------------- | --------- | ------------------------------------ |
| Document Type | `doc-`    | `doc-fattura`, `doc-drivers-license` |
| Entity Type   | `entity-` | `entity-venditore`, `entity-buyer`   |

| Configuration | `{VERTICAL}-{COUNTRY}-DEFAULT` | `REAL-ESTATE-IT-DEFAULT` |

### Country Codes

Use [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2): `IT`, `US`, `DE`, `FR`, etc.

### Schema Version

Every configuration MUST include `schemaVersion: 1`. This enables forward-compatible parsing.

### File Layout

```
configs/
├── {vertical}/
│   ├── {country}.config.json     # e.g. it.config.json
│   └── {country}.config.json
```

---

## 3. Document Types

A **Document Type** defines a category of document and a JSON Schema describing the fields an AI should extract from it.

### Schema

```typescript
interface DocumentTypeDef {
    /** Unique identifier, prefixed with 'doc-' */
    id: string;

    /** Human-readable name */
    name: string;

    /** Description */
    description?: string;

    /** JSON Schema defining extractable fields */
    jsonSchema: JSONSchema;

    /**
     * If true, extraction returns an array of objects.
     * Use for documents containing data about multiple entities
     * (e.g. an ID document listing multiple people).
     */
    isArrayExtraction?: boolean;
}
```

### JSON Schema Requirements

The `jsonSchema` field MUST be a valid JSON Schema object with:

- `type: "object"` at the top level
- `properties` object defining each extractable field
- `required` array listing mandatory fields

### Field Types

| Type             | JSON Schema                                                         | Description                                            |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| Text             | `{ "type": "string", "description": "..." }`                        | Free-text field                                        |
| Number           | `{ "type": "number", "description": "..." }`                        | Numeric value                                          |
| Enum             | `{ "type": "string", "enum": [...values, null], "nullable": true }` | Constrained values; `null` allows AI to skip if unsure |
| Email            | `{ "type": "string", "format": "email" }`                           | Email address                                          |
| Date             | `{ "type": "string", "pattern": "..." }`                            | Date with country-specific pattern                     |
| Nested Object    | `{ "type": "object", "properties": {...}, "required": [...] }`      | Grouped fields                                         |
| Array of Objects | `{ "type": "array", "items": { "type": "object", ... } }`           | Repeated structures (e.g. line items, list of people)  |

### Enum Nullability Convention

Enum fields MUST include `null` in their enum array and set `nullable: true`. This prevents the AI from being forced to guess when a value is not visible in the document:

```json
{
    "type": "string",
    "description": "Marital status",
    "enum": ["single", "married", "divorced", "widowed", null],
    "nullable": true
}
```

### Date Patterns by Country

Date fields SHOULD include a `pattern` property with a regex enforcing the country's standard format:

| Country | Format     | Pattern                      | Example      |
| ------- | ---------- | ---------------------------- | ------------ |
| Italy   | DD.MM.YYYY | `^\\d{2}\\.\\d{2}\\.\\d{4}$` | `15.01.2024` |
| US      | MM/DD/YYYY | `^\\d{2}/\\d{2}/\\d{4}$`     | `01/15/2024` |

### Example

```json
{
    "id": "doc-fattura",
    "name": "Fattura",
    "description": "Invoice — issuer, recipient, line items, VAT",
    "jsonSchema": {
        "type": "object",
        "properties": {
            "numero": { "type": "string", "description": "Invoice number" },
            "data": {
                "type": "string",
                "description": "Issue date DD.MM.YYYY",
                "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$"
            },
            "totale": { "type": "number", "description": "Total amount in EUR" },
            "righe": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "descrizione": { "type": "string" },
                        "importo": { "type": "number" }
                    },
                    "required": ["descrizione", "importo"]
                }
            }
        },
        "required": ["numero", "data", "totale"]
    }
}
```

---

## 4. Entity Types

An **Entity Type** defines a real-world object (person, property, transaction) that aggregates data from multiple documents. This is the core mechanism for cross-document data linking.

### Schema

```typescript
interface EntityTypeDef {
    /** Unique identifier, prefixed with 'entity-' */
    id: string;

    /** Human-readable name */
    name: string;

    /** Icon name for UI rendering */
    icon?: string;

    /** Color hex code for UI rendering */
    color?: string;

    /** Ordered list of entity field names for display */
    fieldOrder?: string[];

    /** Document types that provide data for this entity */
    dataSources?: EntityDataSource[];

    /** Documents conditionally required for this entity */
    conditionalRequirements?: ConditionalRequirement[];

    /** Display order (lower = shown first) */
    displayOrder?: number;
}
```

### Data Sources (Aggregation)

A **Data Source** defines how a document type feeds data into an entity. Multiple documents can contribute different fields to the same entity.

```typescript
interface EntityDataSource {
    /** Document type ID that provides data */
    docTypeId: string;

    /** If true, this document is always required for the entity */
    isRequired?: boolean;

    /** Field-level mappings from document → entity */
    fieldMappings: EntityFieldMapping[];

    /** If true, this document can create new entities (vs. only enriching) */
    canCreateEntity?: boolean;

    /** If false, this data source is skipped (default: true) */
    enabled?: boolean;
}
```

### Field Mappings

Each mapping connects a field in the extracted document data to a field on the entity, and optionally defines how to match this document to an existing entity.

```typescript
interface EntityFieldMapping {
    /** Path in the document's extracted data (supports dot notation for nested/array fields) */
    sourceField: string;

    /** Field name on the entity */
    targetField: string;

    /** Match rules for identity resolution */
    matchFields?: MatchFieldConfig[];
}
```

#### Dot Notation for Source Fields

When a document's extraction schema contains arrays (e.g., `venditori` is an array of objects), use dot notation to reference fields within:

```
"sourceField": "venditori.nome"       → venditori[i].nome
"sourceField": "acquirenti.cognome"   → acquirenti[i].cognome
```

The processing engine iterates through the array and applies match rules to determine which array element corresponds to which entity.

### Identity Resolution (Match Fields)

**Match fields** define how to determine if two documents refer to the same real-world entity. The engine uses these rules to answer: _"Does this document's data belong to an existing entity, or should we create a new one?"_

```typescript
interface MatchFieldConfig {
    /** Entity field name to match on */
    field: string;

    /**
     * Fuzzy matching threshold:
     * - 0   = exact match required
     * - 0.2 = minor typos tolerated (recommended for names)
     * - 0.3 = moderate fuzzy matching (addresses)
     * - 1.0 = match anything
     */
    fuzzyThreshold?: number;

    /** Comparison operator (for condition edges, not matching) */
    operator?: 'equals' | 'contains' | 'exists';

    /** Value to compare against (for condition edges) */
    value?: string;
}
```

#### Standard Match Field Patterns

**Person matching** — Match by fiscal code + name (handles typos):

```json
[
    { "field": "codiceFiscale", "fuzzyThreshold": 0.2 },
    { "field": "nome", "fuzzyThreshold": 0 },
    { "field": "cognome", "fuzzyThreshold": 0 }
]
```

**Property matching** — Match by cadastral identifiers (exact):

```json
[
    { "field": "foglio", "fuzzyThreshold": 0 },
    { "field": "particella", "fuzzyThreshold": 0 },
    { "field": "subalterno", "fuzzyThreshold": 0 }
]
```

### Example: Seller Entity

A real estate "Seller" entity aggregates data from 9+ document types:

```json
{
    "id": "entity-venditore",
    "name": "Venditore",
    "icon": "user-minus",
    "color": "#ef4444",
    "displayOrder": 0,
    "fieldOrder": [
        "nome",
        "cognome",
        "codiceFiscale",
        "dataNascita",
        "statoCivile",
        "telefono",
        "email"
    ],
    "dataSources": [
        {
            "docTypeId": "doc-identita",
            "isRequired": true,
            "canCreateEntity": false,
            "fieldMappings": [
                {
                    "sourceField": "nome",
                    "targetField": "nome",
                    "matchFields": [{ "field": "codiceFiscale", "fuzzyThreshold": 0.2 }]
                },
                {
                    "sourceField": "cognome",
                    "targetField": "cognome",
                    "matchFields": [{ "field": "codiceFiscale", "fuzzyThreshold": 0.2 }]
                },
                {
                    "sourceField": "codiceFiscale",
                    "targetField": "codiceFiscale",
                    "matchFields": [{ "field": "codiceFiscale", "fuzzyThreshold": 0.2 }]
                }
            ]
        },
        {
            "docTypeId": "doc-provenienza",
            "isRequired": true,
            "canCreateEntity": true,
            "fieldMappings": [
                {
                    "sourceField": "acquirenti.nome",
                    "targetField": "nome",
                    "matchFields": [{ "field": "codiceFiscale", "fuzzyThreshold": 0.2 }]
                },
                {
                    "sourceField": "acquirenti.cognome",
                    "targetField": "cognome",
                    "matchFields": [{ "field": "codiceFiscale", "fuzzyThreshold": 0.2 }]
                }
            ]
        }
    ]
}
```

---

## 5. Cross-Document Validation

**Conditional Requirements** implement business rules that determine when additional documents are required, based on data extracted from other documents. This is the "IF-THEN" logic that makes the system intelligent about document completeness.

### Schema

```typescript
interface ConditionalRequirement {
    /** Document type ID that becomes required when conditions are met */
    docTypeId: string;

    /** Match fields to link the required document to the entity (empty = folder-level check) */
    matchFields?: MatchFieldConfig[];

    /**
     * Conditions that trigger this requirement.
     * - Empty/undefined = always required
     * - Multiple conditions = OR logic (any match triggers the requirement)
     */
    conditions?: DocumentCondition[];

    /** If false, this requirement is skipped (default: true) */
    enabled?: boolean;
}

interface DocumentCondition {
    /** Document type to evaluate the condition against */
    sourceDocTypeId: string;

    /** Field path in the source document (supports dot notation) */
    field: string;

    /** Comparison operator */
    operator: 'equals' | 'contains' | 'exists';

    /** Value to compare against (not needed for 'exists') */
    value?: string;
}
```

### Operators

| Operator   | Behavior                           | Example                                                                        |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| `equals`   | Exact string match                 | `{ "field": "tipoProvenienza", "operator": "equals", "value": "successione" }` |
| `contains` | Substring match (case-insensitive) | `{ "field": "statoCivile", "operator": "contains", "value": "vedov" }`         |
| `exists`   | Field is present and non-empty     | `{ "field": "qualita", "operator": "exists" }`                                 |

### OR Logic

When multiple conditions are specified, **any match triggers the requirement** (OR logic):

```json
{
    "docTypeId": "doc-morte",
    "conditions": [
        {
            "sourceDocTypeId": "doc-provenienza",
            "field": "acquirenti.statoCivile",
            "operator": "contains",
            "value": "vedov"
        },
        {
            "sourceDocTypeId": "doc-identita",
            "field": "statoCivile",
            "operator": "contains",
            "value": "vedov"
        }
    ]
}
```

This means: _"Require a death certificate if EITHER the deed of provenance OR the ID document indicates the person is widowed."_

### Real-World Examples

#### Person-level: marital status triggers

| Condition                                        | Required Documents                              |
| ------------------------------------------------ | ----------------------------------------------- |
| Marital status contains "vedov" (widowed)        | Death Certificate, Family Status Certificate    |
| Marital status contains "coniugat" (married)     | Marriage Certificate                            |
| Marital status contains "separat" or "divorziat" | Separation/Divorce Decree, Marriage Certificate |

#### Property-level: provenance triggers

| Condition                                         | Required Documents                                   |
| ------------------------------------------------- | ---------------------------------------------------- |
| Property acquired via `successione` (inheritance) | Declaration of Succession, Acceptance of Inheritance |
| Property acquired via `donazione` (donation)      | Family Status Certificate (20-year revocation risk)  |
| Cadastral category contains `A/` (residential)    | Condominium Documentation                            |
| Land parcel (field `qualita` exists)              | Urbanistic Destination Certificate (CDU)             |
| Mortgage approved (field `importoMutuo` exists)   | Bank Appraisal                                       |

### Evaluation Flow

```
For each entity:
  For each conditionalRequirement:
    1. Skip if enabled === false
    2. If no conditions → always required
    3. For each condition:
       a. Find documents of type sourceDocTypeId linked to this entity
       b. Evaluate field against operator/value
       c. If ANY condition matches → requirement is ACTIVE
    4. Check: does a document of type docTypeId exist for this entity?
       - Yes → requirement satisfied ✅
       - No  → requirement missing ❌ (flag for user)
```

---

---

## 6. Business Configuration

The **Business Configuration** is the top-level container that bundles document types and entity types into a single deployable unit.

### Schema

```typescript
interface BusinessConfiguration {
    /** Unique identifier: {VERTICAL}-{COUNTRY}-DEFAULT */
    id: string;

    /** Human-readable name */
    name: string;

    /** Description of the business vertical */
    description: string;

    /** Schema version (currently: 1) */
    schemaVersion: number;

    /** Document type definitions with extraction schemas */
    documentTypes: DocumentTypeDef[];

    /** Entity type definitions with aggregation and validation rules */
    entityTypes: EntityTypeDef[];
}
```

### Example Output

```json
{
    "id": "REAL-ESTATE-IT-DEFAULT",
    "name": "Italian Real Estate",
    "description": "Document processing for Italian real estate transactions",
    "schemaVersion": 1,
    "documentTypes": [ ... ],
    "entityTypes": [ ... ]
}
```

### Vertical Naming

| Vertical       | Country | Config ID                   |
| -------------- | ------- | --------------------------- |
| Accountant     | Italy   | `ACCOUNTANT-IT-DEFAULT`     |
| Car Dealership | Italy   | `CAR-DEALERSHIP-IT-DEFAULT` |
| Insurance      | Italy   | `INSURANCE-IT-DEFAULT`      |
| Real Estate    | Italy   | `REAL-ESTATE-IT-DEFAULT`    |
| Real Estate    | US      | `REAL-ESTATE-US-DEFAULT`    |

---

## 7. Field Helpers

To reduce boilerplate, the standard provides **field helper functions** organized in three tiers:

### Universal Primitives

Available for all countries:

| Helper                                   | Produces                                    | Description                   |
| ---------------------------------------- | ------------------------------------------- | ----------------------------- |
| `text(desc)`                             | `{ "type": "string" }`                      | Free-text field               |
| `num(desc)`                              | `{ "type": "number" }`                      | Numeric value                 |
| `enumField(desc, values)`                | `{ "type": "string", "enum": [..., null] }` | Constrained values (nullable) |
| `email(desc)`                            | `{ "type": "string", "format": "email" }`   | Email address                 |
| `objectSchema(props, required)`          | `{ "type": "object", ... }`                 | Object wrapper                |
| `arrayOfObjects(props, required, desc?)` | `{ "type": "array", ... }`                  | Array of objects              |

### Country-Specific Helpers

**Italian (`it`)**: `nome()`, `cognome()`, `codiceFiscale()`, `partitaIva()`, `date()` (DD.MM.YYYY), `statoCivile()`, `targa()`, `telaio()`

**US (`us`)**: `firstName()`, `lastName()`, `ssn()`, `ein()`, `dateUS()` (MM/DD/YYYY), `currency()`, `address()`, `parcelNumber()`

### Adding a New Country

To add support for a new country (e.g., Germany `de`):

1. Create `src/helpers/de.ts`
2. Re-export universal primitives from `schema.ts`
3. Add country-specific fields (e.g., `steueridentifikationsnummer()` for German tax ID)
4. Use `datePattern()` for the country's date format

---

## License

This specification is released under the [MIT License](LICENSE), same as the reference implementation.

## Contributing

New verticals, countries, and document types are welcome. See the [README](README.md) for contribution guidelines.
