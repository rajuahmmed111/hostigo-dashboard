import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch, IoChevronBack, IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from 'react-icons/fi';

function SubscriptionPlans() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [statusFilter, setStatusFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showViewModal = (plan) => {
    setSelectedPlan(plan);
    setIsViewModalOpen(true);
  };

  const handleViewCancel = () => {
    setIsViewModalOpen(false);
    setSelectedPlan(null);
  };

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Basic Plan",
      price: "$9.99",
      duration: "1 month",
      features: "Basic features, limited access",
      status: "Active",
      users: 150,
    },
    {
      key: "2",
      name: "Premium Plan",
      price: "$29.99",
      duration: "1 month",
      features: "All features, priority support",
      status: "Active",
      users: 89,
    },
    {
      key: "3",
      name: "Pro Plan",
      price: "$49.99",
      duration: "1 month",
      features: "Advanced features, dedicated support",
      status: "Inactive",
      users: 45,
    },
    {
      key: "4",
      name: "Enterprise Plan",
      price: "$99.99",
      duration: "1 month",
      features: "Custom features, 24/7 support",
      status: "Active",
      users: 12,
    },
  ]);

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
      render: (value) => (
        <span className="font-medium">{value}</span>
      ),
    },
    { 
      title: "Price", 
      dataIndex: "price", 
      key: "price" 
    },
    { 
      title: "Duration", 
      dataIndex: "duration", 
      key: "duration" 
    },
    { 
      title: "Features", 
      dataIndex: "features", 
      key: "features",
      render: (features) => (
        <span className="text-sm text-gray-600 max-w-xs truncate block" title={features}>
          {features}
        </span>
      )
    },
    { 
      title: "Users", 
      dataIndex: "users", 
      key: "users",
      render: (users) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {users} users
        </span>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 
          status === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button className="" onClick={() => openDelete(record)}>
            <FiTrash2 className="h-5 w-5 text-red-600 cursor-pointer rounded-md" />
          </button>
          <button className="" onClick={() => showViewModal(record)}>
            <FiEdit2 className="text-blue-600 w-5 h-5 cursor-pointer rounded-md" />
          </button>
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    return dataSource.filter((r) => {
      const matchStatus = statusFilter ? r.status === statusFilter : true;
      const matchQuery = q
        ? [r.name, r.price, r.duration, r.features, r.status]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchStatus && matchQuery;
    });
  }, [dataSource, statusFilter, searchQuery]);

  const openDelete = (row) => {
    setSelectedPlan(row);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    // Handle plan deletion logic here
    setDataSource(dataSource.filter(item => item.key !== selectedPlan.key));
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

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
        <h1 className="text-white text-xl sm:text-2xl font-bold">Subscription Plans</h1>
        
        {/* Mobile search */}
        <div className="relative w-full md:hidden mt-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plans..."
            className="w-full bg-white text-[#0D0D0D] placeholder-gray-500 pl-10 pr-3 py-2 rounded-md focus:outline-none"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        
        <div className="ml-0 md:ml-auto flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plans..."
              className="bg-white text-[#0D0D0D] placeholder-[#111827] pl-10 pr-3 py-2 rounded-md focus:outline-none"
            />
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111827]" />
          </div>
          
          <Select
            placeholder="Filter by status"
            allowClear
            onChange={setStatusFilter}
            className="w-full md:w-40"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
          />
          
          <button
            onClick={() => navigate('/add-subscription-plan')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Add Plan</span>
          </button>
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
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          rowClassName="hover:bg-gray-50 cursor-pointer"
        />
        
        {/* Delete Plan Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-[#111827]">Delete Plan</h1>
            <p className="text-xl text-center mt-5">
              {selectedPlan
                ? `Are you sure you want to delete ${selectedPlan.name}?`
                : "Are you sure you want to delete this plan?"}
            </p>
            <div className="text-center py-5 w-full flex justify-center gap-3">
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>

        {/* View/Edit Plan Modal */}
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
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPlan.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    selectedPlan.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
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
                    console.log('Edit plan:', selectedPlan);
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
