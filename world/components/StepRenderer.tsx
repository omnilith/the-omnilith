import React, { useState } from "react";
import type { Step } from "./WorkflowRunner";
import { FieldInput } from "./FieldInput";

function StepRenderer({
  step,
  fieldValues,
  setFieldValue,
}: {
  step: Step;
  fieldValues?: Record<string, unknown>;
  setFieldValue?: (key: string, value: unknown) => void;
}) {
  const [verified, setVerified] = useState(false);

  if (step.action === "verify") {
    return (
      <div>
        <h3>{step.title}</h3>
        <p>{step.instructions}</p>
        <label style={{ display: "block", marginTop: "1rem" }}>
          <input
            type="checkbox"
            checked={verified}
            onChange={() => setVerified(!verified)}
          />
          I acknowledge that I have completed this step.
        </label>
      </div>
    );
  }

  if (step.action === "create" && step.fieldsToEdit) {
    return (
      <div>
        <h3>{step.title}</h3>
        <p>{step.instructions}</p>
        {step.fieldsToEdit.map((field) => (
          <div key={field.key} style={{ marginBottom: "1rem" }}>
            <label>
              {field.label}
              {field.required ? " *" : ""}
            </label>
            <FieldInput
              type={field.type}
              value={fieldValues?.[field.key]}
              onChange={(val: unknown) =>
                setFieldValue && setFieldValue(field.key, val)
              }
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3>{step.title}</h3>
      <p>{step.instructions}</p>
      {/* Add more logic here for different step actions if needed */}
    </div>
  );
}

export default StepRenderer;
