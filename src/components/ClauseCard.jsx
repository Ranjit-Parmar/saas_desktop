const ClauseCard = ({ clause }) => {
  const { title, summary, confidence } = clause;

  return (
    <div className="p-5 bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="text-base font-semibold text-gray-800">
        {title || "Untitled Clause"}
      </h4>

      {summary ? (
        <p className="text-sm text-gray-600 mt-2">{summary}</p>
      ) : (
        <p className="text-sm italic text-gray-400 mt-2">No summary available.</p>
      )}

      <p className="mt-3 text-xs text-gray-500">
        Confidence: {Math.round(confidence * 100)}%
      </p>
    </div>
  );
};

export default ClauseCard;
