import { createLabel, deleteLabel, updateLabel } from "@/api/labelsApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Settings2Icon } from "lucide-react";
import { useState } from "react";

function LabelSettingsPopup({ labels }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["userLabels"],
    mutationFn: deleteLabel,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userLabels"] }),
  });
  const [showAddLabelPopup, setShowAddLabelPopup] = useState(false);
  const [labelContent, setLabelContent] = useState(null);
  function resetPopup() {
    setShowAddLabelPopup(false);
    setLabelContent(null);
  }
  function handleEditPopup(labelValues) {
    setShowAddLabelPopup(true);
    setLabelContent(labelValues);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Settings2Icon />
      </DialogTrigger>
      <DialogContent>
        {showAddLabelPopup ? (
          <AddLabelPopup resetPopup={resetPopup} currentValues={labelContent} />
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <div>These are current labels</div>
            </div>
            <div className="flex flex-col gap-2">
              {labels?.map((val) => (
                <div key={val.id} className="group flex gap-10">
                  <div>{val.name}</div>
                  <div>This is a description</div>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      className="text-blue-500 hover:underline"
                      data-id={`${val.id}`}
                      onClick={() => handleEditPopup(val)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteMutation.mutate(val.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button onClick={() => setShowAddLabelPopup(true)}>
                Add a label
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LabelSettingsPopup;

function AddLabelPopup({ resetPopup, currentValues = null }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["userLabels"],
    mutationFn: createLabel,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userLabels"] }),
  });
  const updateMutation = useMutation({
    mutationKey: ["userLabels"],
    mutationFn: updateLabel,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userLabels"] }),
  });
  const [name, setName] = useState(currentValues ? currentValues.name : "");
  const [color, setColor] = useState(
    currentValues ? currentValues.color : "#000000"
  );
  const [prompt, setPrompt] = useState("");
  const [description, setDescription] = useState("");

  const handleAddLabel = () => {
    const labelData = {
      name,
      color,
      //   prompt,
      //   description,
    };
    if (currentValues) {
      // then edit
      updateMutation.mutate({ labelId: currentValues.id, updates: labelData });
    } else {
      mutate(labelData);
    }
    resetPopup();
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-xl bg-white p-4 shadow">
      <ArrowLeft onClick={resetPopup} />
      <h2 className="text-xl font-semibold text-gray-800">Add New Label</h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-8 w-12 rounded border-2 border-gray-300"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Prompt
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
          rows={3}
        />
      </div>

      <div className="text-right">
        <button
          onClick={handleAddLabel}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
