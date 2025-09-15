import React, { useState, useRef, useEffect } from "react";

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]); // Store uploaded files
  const fileInputRef = useRef(null); // Ref for hidden file input

  // Reset files when modal closes
  useEffect(() => {
    if (!isOpen) setFiles([]);
  }, [isOpen]);

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Handle file selection
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      status: "uploading",
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach((f) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% success rate
        setFiles((prev) =>
          prev.map((file) =>
            file.id === f.id
              ? { ...file, status: isSuccess ? "success" : "error" }
              : file
          )
        );
      }, 2000 + Math.random() * 2000);
    });
  };

  // Handle drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current.click();

  // Do not render modal if it's closed
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[95%] max-w-lg p-4 sm:p-6">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          Upload Files
        </h2>

        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={openFileDialog}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md py-10 px-4 flex flex-col items-center justify-center text-sm sm:text-base text-gray-500 hover:border-blue-500 transition-colors"
        >
          <p className="text-center">Drag & drop files here or tap to browse</p>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* File List */}
        <ul className="mt-4 max-h-48 sm:max-h-60 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
          {files.length ? (
            files.map(({ id, name, status }) => (
              <li
                key={id}
                className="flex items-center justify-between py-2 text-sm"
              >
                <span className="truncate">{name}</span>
                {status === "uploading" && (
                  <span className="text-yellow-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full animate-ping bg-yellow-500"></span>
                    Uploading…
                  </span>
                )}
                {status === "success" && (
                  <span className="text-green-600">✓ Success</span>
                )}
                {status === "error" && (
                  <span className="text-red-600">✗ Failed</span>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic py-2 text-center">
              No files uploaded yet.
            </li>
          )}
        </ul>

        {/* Close Button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Tailwind keyframes for fade animation */}
      <style>
        {`
          @keyframes fade {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          .animate-fade {
            animation: fade 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default UploadModal;
