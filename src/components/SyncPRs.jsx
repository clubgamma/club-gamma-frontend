import React, { useState } from "react";
import Global from '@/Global';

const SyncPRs = () => {
  const [syncStatus, setSyncStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncedPRs, setSyncedPRs] = useState([]);

  const handleSyncPRs = async () => {
    setLoading(true);
    setSyncStatus("");

    try {
      const synceResponse = await Global.httpGet("/api/users/sync-prs");

      if (response.ok) {
        setSyncedPRs(synceResponse);
        setSyncStatus("PRs synced successfully!");
      } else if (response.status === 429) {
        setSyncStatus("You are being rate-limited. Please try again later.");
      } else {
        setSyncStatus("Failed to sync PRs. Please try again.");
      }
    } catch (error) {
      setSyncStatus("An error occurred while syncing PRs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Sync Your Pull Requests
      </h2>

      <button
        onClick={handleSyncPRs}
        disabled={loading}
        className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out ${
          loading
            ? "bg-[#3d2c2c] hover:bg-[#4e3535] cursor-not-allowed"
            : "bg-[#523d3d] hover:bg-[#4e3535] border-[#4e3535] hover:bg-brown-600"
        }`}
      >
        {loading ? "Syncing PRs..." : "Sync PRs"}
      </button>

      {syncStatus && (
        <p
          className={`mt-3 text-lg ${
            syncStatus.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {syncStatus}
        </p>
      )}

      {syncedPRs.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold mb-2">Synced Pull Requests:</h3>
          <ul className="list-disc list-inside text-white">
            {syncedPRs.map((pr, index) => (
              <li key={index} className="text-lg text-yellow-50">
                {pr.title} - #{pr.number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SyncPRs;
