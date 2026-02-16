# DocSchema — Business Schema Configurations

An **open standard** for AI-readable document schemas. Define what documents exist in a business, what data to extract, how to validate across documents, and how to link everything to real-world entities — in a single JSON file that any AI can consume.

[![npm](https://img.shields.io/npm/v/@piwi.ai/docschema)](https://www.npmjs.com/package/@piwi.ai/docschema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **📖 [Read the full specification →](SPECIFICATION.md)**

---

## The Standard

DocSchema defines **four core primitives** for AI-powered document processing:

| Primitive                    | Purpose                                                  |                    Spec Section                    |
| ---------------------------- | -------------------------------------------------------- | :------------------------------------------------: |
| **Document Types**           | JSON Schema definitions for AI data extraction           |      [§3](SPECIFICATION.md#3-document-types)       |
| **Entity Types**             | Cross-document data aggregation with identity resolution |       [§4](SPECIFICATION.md#4-entity-types)        |
| **Conditional Requirements** | IF-THEN validation logic across documents                | [§5](SPECIFICATION.md#5-cross-document-validation) |

### Why a Standard?

Every AI document processing system reinvents the same wheel: _"What fields should I extract from this invoice?"_ DocSchema provides a **universal, portable format** so that:

- **AI agents** can use any schema to extract structured data from any document, with any LLM
- **Businesses** get pre-built configurations for their industry — no prompt engineering required
- **Developers** can build document processing systems that work with any configuration
- **Countries** get localized schemas with proper date formats, ID patterns, and field names

The standard is LLM-agnostic (Gemini, GPT, Claude, Llama, …), open-source, and has zero runtime dependencies.

---

## What Is PIWI?

**PIWI** is an AI-powered platform that turns stacks of unstructured business documents (PDFs, scans, photos) into clean, structured, validated data — ready for export via **REST API** or rendered directly onto **PDF documents**.

### How It Works

```
📄 Upload documents (PDF, scan, photo)
        ↓
🤖 AI Identification — "What type of document is this?"
   The AI reads the document and matches it against the document types
   defined in this package (e.g., Invoice, ID Card, Tax Return)
        ↓
🔍 AI Extraction — "What data is in this document?"
   Using the JSON Schema from the matched document type, the AI extracts
   every field (names, dates, amounts, tax codes, addresses, …)
        ↓
✅ AI Verification — "Is the extraction correct?"
   A second AI pass independently verifies the extracted data,
   catching errors and assigning confidence scores per field
        ↓
🔗 Entity Matching — "Who/what does this data belong to?"
   Extracted fields are matched to business entities (Buyer, Seller,
   Property, Vehicle, …) using fuzzy matching rules defined here
        ↓
📤 Export — API or PDF
   • REST API: retrieve structured data as JSON for any downstream system
   • PDF Export: overlay extracted + validated data directly onto the
     original document, producing filled-in PDFs ready for signing
```

### Real-World Example

A **real estate agency** uploads a folder of documents for a property transaction:

- Driver's licenses, tax forms → AI identifies them, extracts buyer/seller names, SSNs
- Purchase agreement → AI extracts property address, sale price, closing date
- Title deed, survey → AI extracts parcel numbers, legal descriptions

PIWI **automatically links** all extracted data to the correct entities (Buyer, Seller, Property, Transaction) and flags missing documents. The agency can then:

- **Pull structured data via API** to feed into their CRM or compliance system
- **Generate pre-filled PDF documents** with all extracted data overlaid

### 🔒 Privacy-First & 100% Offline

PIWI is designed to work **entirely offline** — no cloud, no external API calls, no data leaving your device.

- **Local AI via WebGPU**: AI models run directly in the browser using [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) acceleration, leveraging your device's GPU for fast inference without any server
- **No cloud dependency**: Documents are processed locally — your sensitive business data (contracts, tax returns, financial records, identity documents) **never leaves your machine**
- **OPFS storage**: Documents and model weights are stored in the browser's [Origin Private File System](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system), fully sandboxed and private
- **IndexedDB**: All extracted data, entity mappings, and configuration state persist locally via IndexedDB
- **Optional cloud mode**: For organizations that prefer managed infrastructure, PIWI also supports cloud deployment with server-side AI (Google Gemini, etc.) — but the offline-first architecture ensures privacy is never compromised by default

This makes PIWI ideal for industries handling highly sensitive documents: **law firms**, **tax advisors**, **medical practices**, **financial institutions**, and **government agencies**.

---

## Where This Repo Fits

This package defines the **configuration layer** — the rules that drive everything above. Without it, the AI doesn't know what to look for.

| Layer                     | Role                                                        | This Repo? |
| ------------------------- | ----------------------------------------------------------- | :--------: |
| Document Upload & Storage | Handle file uploads, store in S3                            |     ❌     |
| AI Processing Engine      | Run LLM calls, orchestrate processing pipelines             |     ❌     |
| **Schema Configurations** | **Define document types, entity types, extraction schemas** |   **✅**   |
| Entity Resolution         | Match extracted data to entities using fuzzy rules          |     ❌     |
| API & PDF Export          | Serve structured data, render filled PDFs                   |     ❌     |

Any AI agent, LLM, or automation system can use these configurations to:

1. **Read** a configuration to understand what documents a business handles
2. **Use** the JSON schemas as extraction instructions for any LLM (GPT, Gemini, Claude, …)
3. **Validate** extracted data against the schema's required fields and patterns
4. **Resolve entities** by following the match rules and field mappings
5. **Extend** the package by adding new verticals, countries, or document types

---

## Quick Start

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript → dist/
npm run generate     # Generate JSON configs → configs/ + documents/
npm run build:all    # Build + generate in one step
npm test             # Run tests
npm run lint         # ESLint check
npm run format       # Prettier formatting
```

## Publishing

```bash
# 1. Bump version in package.json
npm version patch    # 1.0.3 → 1.0.4 (or use minor/major)

# 2. Build + generate configs
npm run build

# 3. Publish to npm
npm publish --access public
```

---

## Repository Structure

```
src/
├── types.ts                      # Core type definitions (start here)
├── constants.ts                  # Shared enums (ReferenceType, date formats, …)
├── index.ts                      # Main entry point — exports everything
├── generate-all.ts               # Auto-discovers verticals + countries → JSON output
│
├── countries/                    # Country-specific document types & helpers (33 countries)
│   ├── it/                       # Italy — 69 document types
│   │   ├── documentTypes/        # One .ts file per document type
│   │   ├── fields.ts             # Shared field name constants
│   │   ├── matchHelpers.ts       # Fuzzy match sets (CF, catasto, …)
│   │   ├── helpers.ts            # Country-specific schema helpers
│   │   └── registry.ts           # Country metadata, ID patterns, references
│   ├── us/                       # United States — 14 document types
│   ├── at/, be/, bg/, …          # EU/EEA countries — 4 standard doc types each
│   └── ...                       # 33 countries total (EU 27 + CH, GB, IS, LI, NO, US)
│
├── factories/                    # Shared document type factories
│   ├── identity-card.factory.ts  # EU-standard Identity Card
│   ├── drivers-license.factory.ts
│   ├── residence-permit.factory.ts
│   └── passport.factory.ts       # (placeholder)
│
├── helpers/                      # JSON Schema field builders
│   └── schema.ts                 # Universal primitives (text, num, objectSchema, …)
│
└── verticals/                    # Business configurations by {business}/{country}
    ├── accountant/it/
    ├── car-dealership/it/
    ├── insurance/it/
    ├── real-estate/it/
    └── real-estate/us/

configs/                          # Generated vertical configs (npm run generate)
├── accountant/it.config.json
├── car-dealership/it.config.json
├── insurance/it.config.json
├── real-estate/it.config.json
└── real-estate/us.config.json

documents/                        # Generated document library (npm run generate)
├── it/                           # 69 individual JSON schemas
│   ├── doc-identity-card.json
│   ├── doc-fattura.json
│   └── ...
├── us/                           # 14 individual JSON schemas
│   ├── doc-drivers-license.json
│   ├── doc-purchase-agreement.json
│   └── ...
├── at/, be/, de/, fr/, …         # 4 standard schemas per EU country
└── ...                           # 33 countries total
```

Each vertical folder contains exactly 3 files:

| File               | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `documentTypes.ts` | What documents this business handles and what fields to extract |
| `entityTypes.ts`   | What business entities exist and how to match documents to them |
| `index.ts`         | Assembles the above into a single `BusinessConfiguration`       |

---

## Core Concepts

### 1. Document Types (`DocumentTypeDef`)

A document type defines a category of document (e.g., "Invoice", "Driver's License") and a **JSON Schema** describing the fields an AI should extract from it.

```typescript
{
    id: 'doc-fattura',
    name: 'Fattura',
    description: 'Invoice — issuer, recipient, line items, VAT',
    jsonSchema: objectSchema({
        numero: text('Invoice number'),
        data: date('Issue date'),
        totale: num('Total amount in EUR'),
    }, ['numero', 'data', 'totale']),
}
```

### 2. Entity Types (`EntityTypeDef`)

An entity type defines a business object (e.g., "Buyer", "Property", "Vehicle") that aggregates data from multiple documents. Each entity type specifies:

- **Data sources**: which document types contribute fields to this entity
- **Field mappings**: which extracted field maps to which entity field
- **Match fields**: how to determine if two documents refer to the same entity (fuzzy matching)
- **Conditional requirements**: documents that are only required under certain conditions

```typescript
{
    id: 'entity-buyer',
    name: 'Buyer',
    dataSources: [
        {
            docTypeId: 'doc-drivers-license',
            canCreateEntity: true,
            fieldMappings: [
                { sourceField: 'firstName', targetField: 'firstName',
                  matchFields: [{ field: 'firstName', fuzzyThreshold: 0.2 }] },
            ],
        },
    ],
}
```

### 3. Business Configuration (`BusinessConfiguration`)

The top-level object that bundles everything together:

```typescript
{
    id: 'REAL-ESTATE-US-DEFAULT',
    name: 'US Real Estate',
    description: '...',
    schemaVersion: 1,
    documentTypes: [...],      // DocumentTypeDef[]
    entityTypes: [...],        // EntityTypeDef[]
}
```

---

## How to Add a New Vertical

### Step 1: Create the directory

```
src/verticals/{business-name}/{country-code}/
```

Example: `src/verticals/law-firm/us/`

### Step 2: Create `documentTypes.ts`

Import helpers for your country and define each document type:

```typescript
import type { DocumentTypeDef } from '../../../types';
import { text, num, objectSchema, firstName, lastName, dateUS } from '../../../helpers/us';

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
    // ... more document types
];
```

### Step 3: Create `entityTypes.ts`

Define entities and how document fields map to them:

```typescript
import type { EntityTypeDef } from '../../../types';
import { DOC_IDS } from './documentTypes';

export const ENTITY_IDS = {
    CLIENT: 'entity-client',
} as const;

const nameMatch = () => [
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
                        sourceField: 'clientFirstName',
                        targetField: 'firstName',
                        matchFields: nameMatch(),
                    },
                    {
                        sourceField: 'clientLastName',
                        targetField: 'lastName',
                        matchFields: nameMatch(),
                    },
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
```

### Step 4: Create `index.ts`

Assemble and export the configuration:

```typescript
import type { BusinessConfiguration } from '../../../types';
import { documentTypes, DOC_IDS } from './documentTypes';
import { entityTypes, ENTITY_IDS } from './entityTypes';

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

### Step 5: Generate

Run `npm run generate` — the script auto-discovers all `verticals/{business}/{country}/index.ts` folders and writes JSON configs to `configs/`. No manual registration needed.

Optionally, add your config export to `src/index.ts` for TypeScript consumers.

---

## Helper Functions Reference

### Universal (`helpers/schema.ts`)

| Helper                                   | Creates                     | Example                                        |
| ---------------------------------------- | --------------------------- | ---------------------------------------------- |
| `text(desc)`                             | `{ type: 'string' }`        | `text('Full name')`                            |
| `num(desc)`                              | `{ type: 'number' }`        | `num('Total in EUR')`                          |
| `enumField(desc, values)`                | String with enum + nullable | `enumField('Status', ['active', 'closed'])`    |
| `email(desc)`                            | String with email format    | `email('Contact email')`                       |
| `objectSchema(props, required)`          | Nested object               | `objectSchema({ name: text('') }, ['name'])`   |
| `arrayOfObjects(props, required, desc?)` | Array of objects            | `arrayOfObjects({ item: text('') }, ['item'])` |

### Italian (`helpers/it.ts`)

Includes all universal helpers plus:

| Helper                 | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `date(desc?)`          | DD.MM.YYYY format (dots, never slashes)        |
| `nome()`               | Italian first name with naming convention note |
| `cognome()`            | Italian surname with naming convention note    |
| `codiceFiscale(desc?)` | 16-char alphanumeric with regex pattern        |
| `partitaIva(desc?)`    | 11-digit VAT number                            |
| `statoCivile(desc?)`   | Marital status enum                            |
| `targa(desc?)`         | Vehicle plate number                           |
| `telaio(desc?)`        | VIN / chassis number                           |

### US (`helpers/us.ts`)

Includes all universal helpers plus:

| Helper                | Description                                     |
| --------------------- | ----------------------------------------------- |
| `dateUS(desc?)`       | MM/DD/YYYY format                               |
| `firstName(desc?)`    | Given name                                      |
| `lastName(desc?)`     | Family name                                     |
| `ssn()`               | Social Security Number with XXX-XX-XXXX pattern |
| `ein(desc?)`          | Employer Identification Number                  |
| `currency(desc)`      | Numeric amount (USD, no $ sign)                 |
| `address(desc?)`      | Full US address (Street, City, State ZIP)       |
| `parcelNumber(desc?)` | Assessor Parcel Number / Tax ID                 |

---

## Available Configurations

| Config ID                   | Export Name             | Business              | Country | Doc Types | Entity Types |
| --------------------------- | ----------------------- | --------------------- | ------- | --------- | ------------ |
| `ACCOUNTANT-IT-DEFAULT`     | `accountantItConfig`    | Accountant / Tax Firm | Italy   | 14        | 3            |
| `CAR-DEALERSHIP-IT-DEFAULT` | `carDealershipItConfig` | Car Dealership        | Italy   | 16        | 4            |
| `INSURANCE-IT-DEFAULT`      | `insuranceItConfig`     | Insurance Agency      | Italy   | 15        | 4            |
| `REAL-ESTATE-IT-DEFAULT`    | `realEstateItConfig`    | Real Estate Agency    | Italy   | 29        | 4            |
| `REAL-ESTATE-US-DEFAULT`    | `realEstateUsConfig`    | Real Estate           | US      | 14        | 4            |

### Document Library

In addition to vertical configs, `npm run generate` produces a **document library** at `documents/{country}/{docId}.json` — individual JSON schema files for every document type in every country. This is useful for:

- **AI agents** that need a single document schema without loading an entire vertical config
- **Schema validation** tools that want to validate one document at a time
- **Documentation** generators that need per-document metadata

**33 countries** are included, covering EU 27 + CH, GB, IS, LI, NO, and the US.

---

## Usage

```typescript
import { realEstateUsConfig, allConfigurations } from '@piwi.ai/docschema';

// Use a specific configuration
console.log(realEstateUsConfig.documentTypes.map((dt) => dt.name));

// Find a configuration by ID
const config = allConfigurations.find((c) => c.id === 'REAL-ESTATE-US-DEFAULT');
```

## License

MIT
