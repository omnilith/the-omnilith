import React from "react";
import { Entity } from "@core/entities/entityTypes";
import styles from "./ListRenderer.module.css";

interface FieldDef {
  essence: {
    key: string;
    label: string;
  };
}

interface ListRendererProps {
  view: Entity;
  entities: Entity[];
}

export const ListRenderer: React.FC<ListRendererProps> = ({
  view,
  entities,
}) => {
  const fields: FieldDef[] = Array.isArray(view.essence.fields)
    ? view.essence.fields
    : [];

  return (
    <div className={styles.listRenderer}>
      <h2 className={styles.listRendererTitle}>{String(view.essence.title)}</h2>
      <ul className={styles.listRendererList}>
        {entities.map((entity, idx) => {
          const essence = entity.essence || {};
          return (
            <li key={entity.id || idx} className={styles.listRendererItem}>
              <ul className={styles.listRendererFields}>
                {fields.map((field) => {
                  const key = field.essence.key;
                  const label = field.essence.label || key;
                  const value = essence[key] ?? "";
                  const isList = Array.isArray(value);
                  return (
                    <li key={String(key)} className={styles.listRendererField}>
                      <strong className={styles.listRendererLabel}>
                        {String(label)}:
                      </strong>{" "}
                      {isList ? (
                        <ul style={{ margin: "0.5em 0 0 1em", padding: 0 }}>
                          {value.map((item: string | number, i: number) => (
                            <li
                              key={i}
                              style={{
                                color: "#0ff8fc",
                                fontWeight: 500,
                                marginBottom: "0.25em",
                              }}
                            >
                              {String(item)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        String(value)
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
