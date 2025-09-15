import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClauseCard from "../components/ClauseCard";
import InsightItem from "../components/InsightItem";
import EvidenceDrawer from "../components/EvidenceDrawer";

const ContractDetails = () => {
  // Get the contract ID from the URL
  const { id } = useParams();

  // State to hold contract data
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // For opening evidence drawer

  // Fetch contract data on component mount or when `id` changes
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch(`/contracts/${id}.json`); // Load mock contract file
        if (!res.ok) throw new Error("Failed to fetch contract");
        const data = await res.json();
        setContract(data); // Save contract data in state
      } catch (err) {
        console.error("Error fetching contract:", err);
        setError(true); // Show error state
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchContract();
  }, [id]);

  // Show loading message
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 font-medium">
        Loading contract details...
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Something went wrong while loading the contract.
      </div>
    );
  }

  // Show if no contract found
  if (!contract) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        No contract data available.
      </div>
    );
  }

  // Destructure contract details
  const {
    name,
    parties,
    start,
    expiry,
    status,
    risk,
    clauses = [],
    insights = [],
    evidence = [],
  } = contract;

  return (
    <div className="space-y-8">
      {/* Contract Summary Section */}
      <section className="bg-white p-6 rounded-md shadow border">
        <header>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-600">{parties}</p>
        </header>

        {/* Contract Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Start Date:</span> {start}
          </div>
          <div>
            <span className="font-medium">Expiry Date:</span> {expiry}
          </div>
          <div
            className={`font-medium ${
              status === "Active"
                ? "text-green-600"
                : status === "Renewal Due"
                ? "text-yellow-600"
                : status === "Expired"
                ? "text-gray-500"
                : "text-gray-700"
            }`}
          >
            <span className="mr-1">Status:</span> {status}
          </div>
          <div>
            <span className="font-medium">Risk Score:</span> {risk}
          </div>
        </div>
      </section>

      {/* Clauses Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Clauses</h3>
        {clauses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {clauses.map((clause, index) => (
              <ClauseCard key={index} clause={clause} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No clauses available.</p>
        )}
      </section>

      {/* Insights */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          AI Insights
        </h3>
        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <InsightItem key={index} insight={insight} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No insights generated.</p>
        )}
      </section>

      {/* Button to View Evidence */}
      <div className="pt-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-5 py-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-900 transition-colors"
        >
          View Supporting Evidence
        </button>
      </div>

      {/* Slide-in Drawer with Evidence */}
      <EvidenceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        evidence={evidence}
      />
    </div>
  );
};

export default ContractDetails;
