import WorkflowRunner from "@world/components/WorkflowRunner";

const process = {
  id: "process-create-form",
  title: "Create a Form",
  description: "Guided creation of a new form",
  executionMode: "guided",
  targetEntityType: {
    id: "form-Form",
    type: "Form",
    essence: {
      fields: [
        { key: "title", type: "text", label: "Title", required: true },
        {
          key: "description",
          type: "text",
          label: "Description",
          required: true,
        },
      ],
      description: "Defines the schema of a form",
      name: "Form",
    },
  },
  steps: ["step1", "step2"],
};

const steps = [
  {
    id: "step-1",
    title: "Define Form Purpose",
    instructions: "Write down notes about the form's purpose.",
    action: "verify",
  },
  {
    id: "step-2",
    title: "Add Title and Description",
    fieldsToEdit: [
      { key: "title", type: "text", label: "Title", required: true },
      {
        key: "description",
        type: "text",
        label: "Description",
        required: true,
      },
    ],
    action: "create",
  },
];

function Page() {
  return <WorkflowRunner process={process} steps={steps} />;
}

export default Page;
