import { X } from "lucide-react";

const EvidenceDrawer = ({ open, onClose, evidence }) => {
  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h4 className="text-lg font-semibold text-gray-800">Evidence</h4>
        <button
          onClick={onClose}
          aria-label="Close evidence drawer"
          className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto">
        {evidence.length > 0 ? (
          evidence.map((ev, index) => (
            <div
              key={index}
              className="border border-gray-200 p-3 rounded-md shadow-sm"
            >
              <p className="text-sm font-medium text-gray-800">{ev.source}</p>
              <p className="text-sm text-gray-600 mt-1">{ev.snippet}</p>
              <p className="text-xs text-gray-400 mt-2">
                Relevance: {Math.round(ev.relevance * 100)}%
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No evidence available.</p>
        )}
      </div>
    </div>
  );
};

export default EvidenceDrawer;
