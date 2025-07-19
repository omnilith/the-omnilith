"use client";

import styles from "./FieldInput.module.css";
import { ReferenceInput } from "./ReferenceInput";
import { Entity } from "@core/entities/entityTypes";
import { EntityEditor } from "./EntityEditor";

export function FieldInput({
  type,
  value,
  onChange,
  options,
  referenceType,
  resolvedSubForm,
  list,
}: {
  type: string;
  value: unknown;
  onChange: (val: unknown) => void;
  options?: string[];
  referenceType?: string;
  list?: boolean;
  resolvedSubForm?: {
    form: Entity;
    fields: Array<{ field: Entity; required: boolean }>;
  };
}) {
  if (type === "text" || type === "file") {
    //TODO: handle file uploads
    return (
      <input
        className={styles.fieldInput}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (type === "number") {
    return (
      <input
        type="number"
        className={styles.fieldInput}
        value={value as number}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  if (type === "boolean") {
    return (
      <input
        type="checkbox"
        className={styles.fieldInput}
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }

  if (type === "select") {
    // If value is not set, default to first option
    const selectValue = (value ?? options?.[0]) as string;
    return (
      <select
        className={styles.fieldInputSelect}
        value={selectValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options?.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (type === "sub-form" && resolvedSubForm) {
    const isList = list === true;
    const entries = isList
      ? Array.isArray(value)
        ? value
        : typeof value === "object" && value !== null
        ? [value]
        : [{}]
      : [typeof value === "object" && value !== null ? value : {}];

    return (
      <div className={styles.subFormWrapper}>
        {entries.map((entry, idx) => (
          <EntityEditor
            key={idx}
            form={resolvedSubForm.form}
            fields={resolvedSubForm.fields}
            initialEssence={
              typeof entry === "object" && entry !== null
                ? (entry as Record<string, unknown>)
                : {}
            }
            onEssenceChange={(newVal) => {
              setTimeout(() => {
                const updated = [...entries];
                updated[idx] = newVal;
                onChange(updated);
              }, 0);
            }}
            noForm
          />
        ))}

        {list && (
          <button
            type="button"
            className={styles.subFormAddButton}
            onClick={() => {
              const next = isList
                ? [...entries, {} as Record<string, unknown>] // ✅ Always an object
                : [{}];
              onChange(next);
            }}
          >
            + Add Item
          </button>
        )}
      </div>
    );
  }

  if (type === "rich-text") {
    return (
      <textarea
        className={styles.fieldInputTextarea}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Markdown here..."
        rows={8}
        style={{ fontFamily: "monospace", width: "100%" }}
      />
    );
  }

  if (type === "reference") {
    return (
      <ReferenceInput
        value={value}
        onChange={onChange}
        referenceType={referenceType}
        list={list}
      />
    );
  }

  return <div>Unsupported field type: {type}</div>;
}
