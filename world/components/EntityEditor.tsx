"use client";

import { useState } from "react";
import { FieldInput } from "./FieldInput";
import { Entity } from "@core/entities/entityTypes";
import styles from "./EntityEditor.module.css";

export function EntityEditor({
  form,
  fields,
  initialEssence = {},
}: {
  form: Entity;
  fields: Entity[];
  initialEssence?: Record<string, unknown>;
}) {
  const [essence, setEssence] = useState(initialEssence);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: string, value: unknown) => {
    setEssence((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/save-entity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.essence.name,
          essence,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Entity saved!");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.entityEditorForm}>
      <h2>{String(form.essence.name)}</h2>

      {fields.map((field) => {
        const def = field.essence;
        const value = essence[def.key as string] ?? def.default ?? "";
        return (
          <div key={String(def.key)} className={styles.entityEditorField}>
            <label className={styles.entityEditorLabel}>
              {String(def.label)}
              {def.required ? " *" : ""}
            </label>
            <FieldInput
              type={def.type as string}
              value={value}
              onChange={(val) => update(def.key as string, val)}
              options={
                Array.isArray(def.options)
                  ? (def.options as string[])
                  : undefined
              }
            />
          </div>
        );
      })}

      <button
        type="submit"
        className={styles.entityEditorButton}
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
