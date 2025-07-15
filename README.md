npm install
npm run dev

Update json-editor to object. Every in-line object should be defined as a subform

Constraints can be errors or warning

When validating, validate against Form first then Contraints

{
"key": "fields",
"type": "object-array",
"subForm": "form-formField",
"label": "Fields"
}

semantic-core/
├── index.ts ← Entry point (exports everything)
├── validate/
│ ├── validateEntity.ts ← Validates an entity against its Form + Constraints
│ └── validateAgainstForm.ts ← Just field types, required, etc.
│ └── validateAgainstConstraints.ts
├── resolve/
│ ├── resolveEntityReferences.ts ← Semantic resolver
│ └── resolveFormFields.ts ← Attaches full FieldDefinitions to a Form
├── interpret/
│ └── getApplicableConstraints.ts ← Returns constraints that apply to this entity
├── types/
│ ├── Entity.ts
│ ├── Form.ts
│ ├── Constraint.ts
│ ├── ValidationResult.ts
├── utils/
│ └── getFieldDefinition.ts ← Utility for resolving field definition
│ └── getForm.ts ← Optional wrapper if needed for internal use

// validation
export { validateEntity } from "./validate/validateEntity";
export { validateAgainstForm } from "./validate/validateAgainstForm";
export { validateAgainstConstraints } from "./validate/validateAgainstConstraints";

// resolution
export { resolveEntityReferences } from "./resolve/resolveEntityReferences";
export { resolveFormFields } from "./resolve/resolveFormFields"; <- Needed to get field definitions to resolve entity references

// constraint logic
export { getApplicableConstraints } from "./interpret/getApplicableConstraints";

// types
export _ from "./types/Entity";
export _ from "./types/Form";
export _ from "./types/Constraint";
export _ from "./types/ValidationResult";
