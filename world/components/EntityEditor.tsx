"use client";

import { useEffect, useRef, useState } from "react";
import { FieldInput } from "./FieldInput";
import { Entity } from "@core/entities/entityTypes";
import styles from "./EntityEditor.module.css";

interface EnrichedField {
  field: Entity;
  required: boolean;
  resolvedSubForm?: Entity & {
    _resolvedFields?: EnrichedField[];
  };
}

export function EntityEditor({
  form,
  fields,
  initialEssence = {},
  id,
  onEssenceChange,
  noForm = false,
}: {
  form: Entity;
  fields: EnrichedField[];
  initialEssence?: Record<string, unknown>;
  id?: string;
  onEssenceChange?: (essence: Record<string, unknown>) => void;
  noForm?: boolean;
}) {
  const [essence, setEssence] = useState(initialEssence);
  const [submitting, setSubmitting] = useState(false);

  const didMount = useRef(false);

  useEffect(() => {
    if (!noForm && onEssenceChange && didMount.current) {
      onEssenceChange(essence);
    } else {
      didMount.current = true;
    }
  }, [essence, onEssenceChange, noForm]);

  const update = (key: string, value: unknown) => {
    setEssence((prev) => {
      const next = { ...prev, [key]: value };
      if (onEssenceChange) onEssenceChange(next);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/save-entity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(id ? { id } : {}),
          type: form.essence.title,
          essence,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Entity saved!");
      setEssence({});
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderFields = () => (
    <>
      {!noForm && <h2>{String(form.essence.title)}</h2>}

      {fields.map((field) => {
        const def = field.field.essence;
        const key = def.key as string;
        const value = essence[key] ?? def.default ?? "";

        return (
          <div key={key} className={styles.entityEditorField}>
            <label className={styles.entityEditorLabel}>
              {String(def.label)}
              {field.required ? " *" : ""}
            </label>

            <FieldInput
              type={def.type as string}
              value={value}
              onChange={(val) => update(key, val)}
              options={
                Array.isArray(def.options)
                  ? (def.options as string[])
                  : undefined
              }
              referenceType={
                def.type === "reference" && def.referenceType
                  ? String(def.referenceType)
                  : undefined
              }
              list={def.list === true}
              resolvedSubForm={
                def.type === "sub-form" && field.resolvedSubForm
                  ? {
                      form: field.resolvedSubForm,
                      fields: field.resolvedSubForm._resolvedFields || [],
                    }
                  : undefined
              }
            />
          </div>
        );
      })}
    </>
  );

  return noForm ? (
    <div className={styles.entityEditorForm}>{renderFields()}</div>
  ) : (
    <form onSubmit={handleSubmit} className={styles.entityEditorForm}>
      {renderFields()}
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
