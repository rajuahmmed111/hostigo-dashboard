import { ConfigProvider, Modal, Table, Input, Button } from "antd";
import { useState } from "react";
import {
  IoChevronBack,
  IoEyeOutline,
  IoSearch,
  IoAddOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetAllSubscriptionPlansQuery,
  useSearchSubscriptionPlansQuery,
} from "../../redux/api/subscrition";

function SubscriptionPlans() {
  const navigate = useNavigate();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // API calls
  const { data: plansData, isLoading } = useGetAllSubscriptionPlansQuery();
  const { data: searchData } = useSearchSubscriptionPlansQuery(searchQuery);

  console.log("plansData", plansData);
  console.log("searchData", searchData);

  // Use search data if available, otherwise use all plans data
  const dataSource =
    searchData?.data ||
    plansData?.data?.map((plan) => ({
      key: plan.id,
      name: plan.name || "Unknown Plan",
      price: `${plan.price?.currency || "$"}${plan.price?.amount || 0}`,
      duration: plan.duration || "Unknown Duration",
      features: plan.features || "No features specified",
      status:
        plan.status === "ACTIVE"
          ? "Active"
          : plan.status === "INACTIVE"
          ? "Inactive"
          : "Unknown",
      users: plan.userCount || 0,
      originalData: plan,
    })) ||
    [];

  const showViewModal = (plan) => {
    setSelectedPlan(plan);
    setIsViewModalOpen(true);
  };

  const handleViewCancel = () => {
    setIsViewModalOpen(false);
    setSelectedPlan(null);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      width: 70,
      render: (_, _r, index) => index + 1,
    },
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "Active"
              ? "bg-green-100 text-green-800"
              : status === "Inactive"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => showViewModal(record)}
            title="View Plan Details"
          >
            <IoEyeOutline className="text-blue-600 w-5 h-5 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-blue-600 px-4 md:px-5 py-3 rounded-md mb-3 flex flex-wrap md:flex-nowrap items-start md:items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-90 transition"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl sm:text-2xl font-bold">
          Subscription Plans
        </h1>

        {/* Search Bar */}
        <div className="ml-0 md:ml-auto flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
          <div className="relative">
            <Input
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
              prefix={<IoSearch className="text-gray-400" />}
            />
          </div>
          <Button
            type="primary"
            onClick={() => navigate("/add-subscription-plan")}
            className="flex items-center gap-2 whitespace-nowrap"
            icon={<IoAddOutline className="w-5 h-5" />}
          >
            <span>Add Plan</span>
          </Button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#00c0b5",
            },
            Pagination: {
              colorPrimaryBorder: "#111827",
              colorBorder: "#111827",
              colorPrimaryHover: "#111827",
              colorTextPlaceholder: "#111827",
              itemActiveBgDisabled: "#111827",
              colorPrimary: "#111827",
            },
            Table: {
              headerBg: "#f9fafb",
              headerColor: "#000000",
              cellFontSize: 14,
              headerSplitColor: "#f9fafb",
              colorTextHeading: "#000000",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          rowClassName="hover:bg-gray-50 cursor-pointer"
        />

        {/* View Plan Details Modal */}
        <Modal
          open={isViewModalOpen}
          centered
          onCancel={handleViewCancel}
          footer={null}
          width={800}
        >
          {selectedPlan && (
            <div className="relative">
              {/* Header with blue gradient */}
              <div className="bg-blue-600 p-6 -m-6 mb-6 rounded-t-lg">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedPlan.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPlan.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : selectedPlan.status === "Inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedPlan.status}
                  </span>
                  <span className="text-white/90">
                    {selectedPlan.users} users
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-500 text-sm">Plan Name</div>
                  <div className="text-lg font-semibold">
                    {selectedPlan.name}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-500 text-sm">Price</div>
                  <div className="text-lg font-semibold">
                    {selectedPlan.price}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-500 text-sm">Duration</div>
                  <div className="text-lg font-semibold">
                    {selectedPlan.duration}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-500 text-sm">Active Users</div>
                  <div className="text-lg font-semibold">
                    {selectedPlan.users} users
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm md:col-span-2">
                  <div className="text-gray-500 text-sm">Features</div>
                  <div className="text-lg font-semibold">
                    {selectedPlan.features}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 gap-3">
                <button
                  onClick={handleViewCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit functionality
                    console.log("Edit plan:", selectedPlan);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default SubscriptionPlans;
