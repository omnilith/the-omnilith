"use client";

import { useState } from "react";
import StepRenderer from "./StepRenderer";

type FieldDefinition = {
  key: string;
  type: string;
  label: string;
  required?: boolean;
};

export type Step = {
  id: string;
  title: string;
  instructions?: string;
  targetEntityType?: string;
  fieldsToEdit?: FieldDefinition[];
  action: string; // e.g. "create", "edit", "create-multiple"
};

type Process = {
  id: string;
  title: string;
  description: string;
  executionMode: string;
  steps: string[];
  targetEntityType?: Record<string, unknown>;
};

type Props = {
  process: Process;
  steps: Step[];
};

function WorkflowRunner({ process, steps }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // State to hold all field values for all steps
  const [allFieldValues, setAllFieldValues] = useState<
    Record<string, Record<string, unknown>>
  >({});
  const currentStep = steps[currentStepIndex];

  const currentFieldValues = allFieldValues[currentStep.id] || {};

  const setFieldValue = (key: string, value: unknown) => {
    setAllFieldValues((prev) => ({
      ...prev,
      [currentStep.id]: {
        ...prev[currentStep.id],
        [key]: value,
      },
    }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const buildTargetEntity = () => {
    const targetEntityType = process.targetEntityType as {
      type?: string;
      essence?: {
        name?: string;
        fields?: Array<{ key: string; [k: string]: unknown }>;
      };
    };
    const essence = targetEntityType.essence;
    if (!essence || !essence.fields) return null;
    const fieldsDef = essence.fields;
    // Flatten all field values from all steps into one object
    const mergedFields: Record<string, unknown> = {};
    Object.values(allFieldValues).forEach((fields) => {
      Object.entries(fields).forEach(([key, value]) => {
        mergedFields[key] = value;
      });
    });
    // Build the essence object from the fields definition, merging user input
    const finalEssence: Record<string, unknown> = {};
    fieldsDef.forEach((fieldDef) => {
      const key = fieldDef.key;
      finalEssence[key] = mergedFields.hasOwnProperty(key)
        ? mergedFields[key]
        : fieldDef.default ?? null;
    });
    // Get the type from targetEntityType.type or essence.name
    const type = essence.name;
    return {
      type,
      essence: finalEssence,
    };
  };

  // Submit handler for saving entity
  const handleSubmit = async () => {
    const targetEntity = buildTargetEntity();
    if (!targetEntity) return;
    try {
      const res = await fetch("/api/save-entity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetEntity),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Entity saved!");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div>
      <h2>{process.title}</h2>
      <p>{process.description}</p>
      <div>
        <StepRenderer
          step={currentStep}
          fieldValues={currentFieldValues}
          setFieldValue={setFieldValue}
        />
        <div style={{ marginTop: "1rem" }}>
          <button onClick={goToPrevStep} disabled={currentStepIndex === 0}>
            Previous
          </button>
          <button
            onClick={goToNextStep}
            disabled={currentStepIndex === steps.length - 1}
            style={{ marginLeft: "0.5rem" }}
          >
            Next
          </button>
          {currentStepIndex === steps.length - 1 && (
            <button style={{ marginLeft: "0.5rem" }} onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkflowRunner;
