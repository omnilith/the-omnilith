"use client";

import { useEffect, useState } from "react";
import styles from "./FieldInput.module.css";

export function ReferenceInput({
  value,
  onChange,
  referenceType,
  list,
}: {
  value: unknown;
  onChange: (val: unknown) => void;
  referenceType?: string;
  list?: boolean;
}) {
  const [entities, setEntities] = useState<
    { id: string; essence?: { title?: string; label?: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (referenceType) {
      setLoading(true);
      fetch(`/api/get-entities/${referenceType}`)
        .then((res) => res.json())
        .then((data) => setEntities(data))
        .catch(() => setEntities([]))
        .finally(() => setLoading(false));
    }
  }, [referenceType]);

  if (loading) return <div>Loading references...</div>;

  if (list) {
    // Multi-select for references
    return (
      <select
        className={styles.fieldInputSelect}
        multiple
        value={Array.isArray(value) ? value.map(String) : []}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(
            (opt) => opt.value
          );
          onChange(selected);
        }}
      >
        {entities.map((entity) => (
          <option key={entity.id} value={entity.id}>
            {entity.essence?.title || entity.essence?.label || entity.id}
          </option>
        ))}
      </select>
    );
  }
  // Single select for references
  return (
    <select
      className={styles.fieldInputSelect}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select reference...</option>
      {entities.map((entity) => (
        <option key={entity.id} value={entity.id}>
          {entity.essence?.title || entity.essence?.label || entity.id}
        </option>
      ))}
    </select>
  );
}
