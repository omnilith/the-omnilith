"use client";

import { useEffect, useState } from "react";
import styles from "./FieldInput.module.css";

export function FieldInput({
  type,
  value,
  onChange,
  options,
  referenceType,
}: {
  type: string;
  value: unknown;
  onChange: (val: unknown) => void;
  options?: string[];
  referenceType?: string;
}) {
  // Always declare hooks at the top level
  const [entities, setEntities] = useState<
    { id: string; essence?: { name?: string; label?: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "reference" && referenceType) {
      console.log("Fetching entities for reference type:", referenceType);
      setLoading(true);
      fetch(`/api/get-entities/${referenceType}`)
        .then((res) => res.json())
        .then((data) => setEntities(data))
        .catch(() => setEntities([]))
        .finally(() => setLoading(false));
    }
  }, [type, referenceType]);

  if (type === "text") {
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
    return (
      <select
        className={styles.fieldInputSelect}
        value={value as string}
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
    if (loading) return <div>Loading references...</div>;
    return (
      <select
        className={styles.fieldInputSelect}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select reference...</option>
        {entities.map((entity) => (
          <option key={entity.id} value={entity.id}>
            {entity.essence?.name || entity.essence?.label || entity.id}
          </option>
        ))}
      </select>
    );
  }

  return <div>Unsupported field type: {type}</div>;
}
