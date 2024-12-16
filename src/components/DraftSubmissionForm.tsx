import DraftForm from "./draft/DraftForm";

export default function DraftSubmissionForm() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Submit Your Draft</h2>
      <DraftForm />
    </div>
  );
}