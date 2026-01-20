import { useState } from "react";
import {
  useGetAllShowUserInfoQuery,
  useUpdateUserInfoStatusMutation,
} from "../../redux/api/showUserInfo";
import { message } from "antd";

const VerifyRequest = () => {
  const [showOnlyFalse, setShowOnlyFalse] = useState(true);

  const {
    data: userInfoData,
    isLoading,
    error,
    refetch,
  } = useGetAllShowUserInfoQuery(showOnlyFalse ? "?isShow=false" : "");

  const [updateUserInfoStatus, { isLoading: isUpdating }] =
    useUpdateUserInfoStatusMutation();

  const handleUpdateStatus = async (id) => {
    try {
      await updateUserInfoStatus(id).unwrap();
      message.success("Status updated successfully");
      refetch();
    } catch {
      message.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading verification requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">
          Error loading requests: {error.message}
        </div>
      </div>
    );
  }

  const requests = userInfoData?.data?.data || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Requests
        </h1>

        {/* Filter Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyFalse}
              onChange={(e) => setShowOnlyFalse(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Show only pending requests</span>
          </label>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Total Requests
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {requests.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-orange-600">
              {requests.filter((req) => !req.isShow).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Verified</h3>
            <p className="text-2xl font-bold text-green-600">
              {requests.filter((req) => req.isShow).length}
            </p>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Owner ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No verification requests found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.providerId.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.propertyOwnerId.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          request.isShow
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.isShow ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!request.isShow && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(request.id, request.isShow)
                          }
                          disabled={isUpdating}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? "Updating..." : "Verify"}
                        </button>
                      )}
                      {request.isShow && (
                        <span className="text-green-600 text-sm font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerifyRequest;
