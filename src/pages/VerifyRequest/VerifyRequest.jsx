import { useState } from "react";
import {
  useGetAllShowUserInfoQuery,
  useUpdateUserInfoStatusMutation,
} from "../../redux/api/showUserInfo";
import { message } from "antd";

const VerifyRequest = () => {
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, verified
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const {
    data: userInfoData,
    isLoading,
    error,
    refetch,
  } = useGetAllShowUserInfoQuery("");

  console.log(userInfoData, "userInfoData");
  console.log(error, "error");

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

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedRequest(null);
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
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4">
          Error loading requests: {error?.status || "Unknown error"}
        </div>
        <button
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const allRequests = userInfoData?.data?.data || [];
  const requests = allRequests.filter((req) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "pending") return !req.isShow;
    if (statusFilter === "verified") return req.isShow;
    return false;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Requests
        </h1>
        <p className="text-gray-600">
          Property owner requested to view Service Provider&apos;s secure info
        </p>

        {/* Filter Toggle */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-md font-medium">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending Only</option>
              <option value="verified">Verified Only</option>
            </select>
          </div>
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
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  PROVIDER
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  PROPERTY OWNER
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  CREATED DATE
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500 bg-gray-50"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-600 mb-1">
                        No verification requests found
                      </p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your filter settings
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                requests.map((request, index) => (
                  <tr
                    key={request.id}
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      index === 0 ? "border-t border-gray-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={
                            request.provider?.profileImage ||
                            "https://avatar.iran.liara.run/public/28"
                          }
                          alt={request.provider?.fullName || "Provider"}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.provider?.fullName || "Unknown Provider"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={
                            request.user?.profileImage ||
                            "https://avatar.iran.liara.run/public/28"
                          }
                          alt={request.user?.fullName || "Property Owner"}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.user?.fullName || "Unknown Owner"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border ${
                          request.isShow
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            request.isShow ? "bg-green-400" : "bg-yellow-400"
                          }`}
                        ></span>
                        {request.isShow ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View Details
                        </button>
                        {!request.isShow && (
                          <button
                            onClick={() => handleUpdateStatus(request.id)}
                            disabled={isUpdating}
                            className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUpdating ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Updating...
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Update
                              </>
                            )}
                          </button>
                        )}
                        {request.isShow && (
                          <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Request Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Provider Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Service Provider
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <img
                        src={
                          selectedRequest.provider?.profileImage ||
                          "https://avatar.iran.liara.run/public/28"
                        }
                        alt={selectedRequest.provider?.fullName || "Provider"}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedRequest.provider?.fullName ||
                            "Unknown Provider"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedRequest.provider?.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedRequest.provider?.role}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Contact Number:
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.provider?.contactNumber ||
                          "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Address:
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.provider?.address || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Country:
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.provider?.country || "Not provided"}
                      </p>
                    </div>
                    {selectedRequest.provider?.passportOrNID &&
                      selectedRequest.provider.passportOrNID.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            ID Documents:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedRequest.provider.passportOrNID.map(
                              (doc, index) => (
                                <img
                                  key={index}
                                  src={doc}
                                  alt={`ID Document ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-80"
                                  onClick={() => window.open(doc, "_blank")}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Property Owner Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Property Owner
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <img
                        src={
                          selectedRequest.user?.profileImage ||
                          "https://avatar.iran.liara.run/public/28"
                        }
                        alt={selectedRequest.user?.fullName || "Property Owner"}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedRequest.user?.fullName || "Unknown Owner"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedRequest.user?.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedRequest.user?.role}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Contact Number:
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.user?.contactNumber || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Address:
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.user?.address || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Country:
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.user?.country || "Not provided"}
                      </p>
                    </div>
                    {selectedRequest.user?.passportOrNID &&
                      selectedRequest.user.passportOrNID.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            ID Documents:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedRequest.user.passportOrNID.map(
                              (doc, index) => (
                                <img
                                  key={index}
                                  src={doc}
                                  alt={`ID Document ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-80"
                                  onClick={() => window.open(doc, "_blank")}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Request Info */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Request Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Request ID:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedRequest.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Created Date:
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedRequest.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status:</p>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border ${
                        selectedRequest.isShow
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          selectedRequest.isShow
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      ></span>
                      {selectedRequest.isShow ? "Verified" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyRequest;
