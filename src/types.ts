/**
 * Self-contained type definitions for business schema configurations.
 *
 * These types define the structure of document types, entity types, and
 * cross-document validation rules for AI-powered document processing.
 * They are intentionally decoupled from any specific platform implementation.
 */

// ─── Document Types ─────────────────────────────────────────────────────────

/** Official reference link for a document type */
export interface DocumentReference {
    /** Display label (e.g. 'Agenzia delle Entrate — Modello F24') */
    title: string;
    /** Full URL to the reference */
    url: string;
    /** Content type hint for UI rendering */
    type?: 'documentation' | 'schema' | 'regulation' | 'specification';
}

/**
 * Defines a type of document that can be processed by the system.
 * Each document type has a JSON schema that specifies what data
 * the AI should extract from documents of this type.
 */
export interface DocumentTypeDef {
    /** Unique identifier (e.g. 'doc-identita', 'doc-fattura') */
    id: string;
    /** Human-readable name */
    name: string;
    /** Description of what this document type represents */
    description?: string;
    /** JSON Schema defining the extractable fields */
    jsonSchema: Record<string, any>;
    /**
     * If true, extraction returns an array of objects.
     * Useful for documents containing data about multiple entities
     * (e.g. an ID document listing multiple people).
     */
    isArrayExtraction?: boolean;
    /** Official references — government docs, XML/JSON schemas, regulatory links */
    references?: DocumentReference[];
}

// ─── Entity Types ───────────────────────────────────────────────────────────

/** How to match a document's extracted field to an entity field */
export interface MatchFieldConfig {
    /** Field name to match on (e.g. 'codiceFiscale', 'nome') */
    field: string;
    /** Fuzzy matching threshold (0 = exact match, 1 = anything). Default: 0 */
    fuzzyThreshold?: number;
    /** Comparison operator for condition edges */
    operator?: 'equals' | 'contains' | 'exists';
    /** Value to compare against for condition edges */
    value?: string;
}

/** Maps a field from extracted document data to an entity field */
export interface EntityFieldMapping {
    /** Path in the document's extracted data (e.g. 'venditori.nome') */
    sourceField: string;
    /** Field name on the entity (e.g. 'nome') */
    targetField: string;
    /** How to match this document to an existing entity */
    matchFields?: MatchFieldConfig[];
}

/**
 * Defines which document type provides data for an entity type.
 * Used for entity aggregation — merging data from multiple documents
 * into unified entity records.
 */
export interface EntityDataSource {
    /** Document type ID that provides data */
    docTypeId: string;
    /** If true, this document is always required for the entity */
    isRequired?: boolean;
    /** Field-level mappings from document → entity */
    fieldMappings: EntityFieldMapping[];
    /** If true, this document can create new entities (vs. only enriching existing) */
    canCreateEntity?: boolean;
    /** If false, this data source is ignored during aggregation and validation (default: true) */
    enabled?: boolean;
}

/** A condition that triggers a document requirement */
export interface DocumentCondition {
    /** Document type to evaluate the condition against */
    sourceDocTypeId: string;
    /** Field path in the source document (supports dot notation) */
    field: string;
    /** Comparison operator */
    operator: 'equals' | 'contains' | 'exists';
    /** Value to compare against (not needed for 'exists') */
    value?: string;
}

/**
 * Defines when a particular document type is required for an entity.
 * Supports conditional logic — e.g. "require death certificate if
 * marital status contains 'vedov'" (widowed).
 */
export interface ConditionalRequirement {
    /** Required document type ID */
    docTypeId: string;
    /** Fields used to match documents to entities. Empty = folder-level check. */
    matchFields?: MatchFieldConfig[];
    /**
     * Conditions that trigger this requirement.
     * Empty/undefined = always required.
     * Multiple conditions = OR logic (any match triggers the requirement).
     */
    conditions?: DocumentCondition[];
    /** If false, this requirement is skipped during validation (default: true) */
    enabled?: boolean;
}

/**
 * Defines an entity type that aggregates data from multiple documents.
 * For example, a "Seller" entity might combine data from ID documents,
 * contact forms, and purchase agreements.
 */
export interface EntityTypeDef {
    /** Unique identifier (e.g. 'entity-venditore') */
    id: string;
    /** Human-readable name */
    name: string;
    /** Icon name for UI rendering */
    icon?: string;
    /** Color hex code for UI rendering */
    color?: string;
    /** Ordered list of entity field names for display purposes */
    fieldOrder?: string[];
    /** Document types that provide data for this entity (aggregation config) */
    dataSources?: EntityDataSource[];
    /** Documents required for each entity of this type (validation config) */
    conditionalRequirements?: ConditionalRequirement[];
    /** Display order for UI rendering (lower = shown first). Defaults to 0. */
    displayOrder?: number;
}

// ─── Business Configuration ─────────────────────────────────────────────────

/**
 * A complete business configuration for a specific vertical.
 * This is the top-level structure of a *.config.json file.
 */
export interface BusinessConfiguration {
    /** Unique identifier (e.g. 'REAL-ESTATE-IT-DEFAULT') */
    id: string;
    /** Human-readable name (e.g. 'Real Estate Italy') */
    name: string;
    /** Description of the business vertical */
    description: string;
    /** Schema version for forward compatibility */
    schemaVersion: number;
    /** Document type definitions with extraction schemas */
    documentTypes: DocumentTypeDef[];
    /** Entity type definitions with aggregation and validation rules */
    entityTypes: EntityTypeDef[];
}

