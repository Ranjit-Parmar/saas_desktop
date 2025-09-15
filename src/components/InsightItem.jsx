const InsightItem = ({ insight }) => {
  const riskStyles = {
    Low: {
      text: "text-green-700",
      bg: "bg-green-100",
    },
    Medium: {
      text: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    High: {
      text: "text-red-700",
      bg: "bg-red-100",
    },
  };

  const { text = "text-gray-700", bg = "bg-gray-100" } =
    riskStyles[insight.risk] || {};

  return (
    <div className={`p-4 rounded-md border border-gray-200 ${bg}`}>
      <p className={`font-medium ${text}`}>{insight.message}</p>
      <span
        className={`mt-2 inline-block text-xs font-semibold px-2 py-0.5 rounded ${text} bg-white border border-opacity-20`}
        aria-label={`${insight.risk} risk level`}
      >
        {insight.risk} Risk
      </span>
    </div>
  );
};

export default InsightItem;
