import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // State management
  const [contracts, setContracts] = useState([]); // All contracts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;

  // Filter and search states
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch contract data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/contracts.json"); // Local mock data
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContracts(data); // Save contracts to state
      } catch (err) {
        setError(err.message); // Handle fetch error
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    fetchData();
  }, []);

  // Reset to first page when filters change
  useEffect(() => setCurrentPage(1), [statusFilter, riskFilter]);

  // Filter and search logic
  const filteredContracts = contracts.filter((c) => {
    const statusMatch = statusFilter ? c.status === statusFilter : true;
    const riskMatch = riskFilter ? c.risk === riskFilter : true;
    const searchMatch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.parties.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && riskMatch && searchMatch;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);

  // Adjust page if filter reduces number of results
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages, currentPage]);

  // Scroll to top when page changes
  useEffect(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [currentPage]
  );

  // Paginate results
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <h1 className="my-6 text-2xl sm:text-3xl font-semibold text-gray-900 text-center sm:text-left">
        Contracts
      </h1>

      {/* Filters Section */}
      <div className="mb-8 rounded-xl bg-white shadow-md border border-gray-100 px-4 py-6 sm:px-6 sm:py-8 max-w-full sm:max-w-5xl mx-auto">
        {/* Filters Header */}
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Filters
          </span>
        </div>

        {/* Status & Risk Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-12 border border-gray-300 bg-white px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/50 transition"
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Renewal Due">Renewal Due</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full h-12 border border-gray-300 bg-white px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/50 transition"
          >
            <option value="">Risk</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Search Input */}
        <form
          className="flex flex-col sm:flex-row gap-3 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search contracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-lg border border-gray-300 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 transition"
          />
        </form>
      </div>

      {/* Contracts Table */}
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        {loading ? (
          // Loading state
          <div className="flex items-center justify-center p-6 text-gray-500 h-48">
            Loading...
          </div>
        ) : error ? (
          // Error state
          <div className="flex items-center justify-center p-6 text-red-500 h-48">
            Error: {error}
          </div>
        ) : contracts.length === 0 ? (
          // No data
          <div className="flex items-center justify-center p-6 text-gray-500 h-48">
            No contracts yet.
          </div>
        ) : (
          // Table content
          <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
            <table className="min-w-full text-xs sm:text-sm text-gray-800">
              <thead className="hidden sm:table-header-group bg-gray-200 text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left font-medium">
                    Contract Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-medium">
                    Parties
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-medium">
                    Expiry Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-medium">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-medium">
                    Risk
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedContracts.map((c) => (
                  <tr
                    key={c.id}
                    className="block sm:table-row hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => navigate(`contracts/${c.id}`)} // Navigate to detail page
                  >
                    {/* Contract Name */}
                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <span className="sm:hidden font-semibold">
                        Contract:{" "}
                      </span>
                      {c.name}
                    </td>
                    {/* Parties */}
                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <span className="sm:hidden font-semibold">Parties: </span>
                      {c.parties}
                    </td>
                    {/* Expiry Date */}
                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <span className="sm:hidden font-semibold">Expiry: </span>
                      {new Date(c.expiry).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    {/* Status */}
                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <span className="sm:hidden font-semibold">Status: </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          c.status === "Active"
                            ? "text-green-700 bg-green-100"
                            : c.status === "Expired"
                            ? "text-gray-700 bg-gray-200"
                            : "text-yellow-800 bg-yellow-100"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    {/* Risk */}
                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <span className="sm:hidden font-semibold">Risk: </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          c.risk === "High"
                            ? "text-red-800 bg-red-100"
                            : c.risk === "Medium"
                            ? "text-yellow-800 bg-yellow-100"
                            : "text-green-800 bg-green-100"
                        }`}
                      >
                        {c.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
