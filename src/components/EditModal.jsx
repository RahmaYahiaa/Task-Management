import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function EditModal({
  show,
  onClose,
  onSave,
  title,
  description,
  modalTitle,
}) {
  const { state } = useContext(AppContext);
  const { darkMode } = state;

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }
    onSave(editTitle.trim(), editDescription.trim());
    onClose();
  };

  if (!show) return null;

  return (
    // Overlay
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        style={{
          backgroundColor: darkMode ? "#1f2937" : "#ffffff",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          transition: "all 0.3s",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: darkMode ? "#f9fafb" : "#212529",
          }}
        >
          {modalTitle}
        </h3>

        {/* Title Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: darkMode ? "#f9fafb" : "#212529",
            }}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              backgroundColor: darkMode ? "#374151" : "#ffffff",
              color: darkMode ? "#f9fafb" : "#212529",
              borderColor: darkMode ? "#4b5563" : "#dee2e6",
            }}
            autoFocus
          />
        </div>

        {/* Description Textarea */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: darkMode ? "#f9fafb" : "#212529",
            }}
          >
            Description
          </label>
          <textarea
            className="form-control"
            rows="4"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            style={{
              backgroundColor: darkMode ? "#374151" : "#ffffff",
              color: darkMode ? "#f9fafb" : "#212529",
              borderColor: darkMode ? "#4b5563" : "#dee2e6",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            onClick={onClose}
            className="btn btn-outline-secondary"
            style={{
              borderColor: darkMode ? "#6b7280" : "#6c757d",
              color: darkMode ? "#9ca3af" : "#6c757d",
            }}
          >
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-success">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
