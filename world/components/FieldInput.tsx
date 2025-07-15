"use client";

import styles from "./FieldInput.module.css";
import { ReferenceInput } from "./ReferenceInput";

export function FieldInput({
  type,
  value,
  onChange,
  options,
  referenceType,
  list,
}: {
  type: string;
  value: unknown;
  onChange: (val: unknown) => void;
  options?: string[];
  referenceType?: string;
  list?: boolean;
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

  //TODO: Update to be object
  if (type === "json-editor") {
    return (
      <textarea
        className={styles.fieldInputTextarea}
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            onChange(JSON.parse(e.target.value));
          } catch {}
        }}
      />
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
