"use client";

export function FieldInput({
  type,
  value,
  onChange,
  options,
}: {
  type: string;
  value: unknown;
  onChange: (val: unknown) => void;
  options?: string[];
}) {
  if (type === "text") {
    return (
      <input
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (type === "number") {
    return (
      <input
        type="number"
        value={value as number}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  if (type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }

  if (type === "select") {
    return (
      <select
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
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Markdown here..."
        rows={8}
        style={{ fontFamily: "monospace", width: "100%" }}
      />
    );
  }

  return <div>Unsupported field type: {type}</div>;
}
