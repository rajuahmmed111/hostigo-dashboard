/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { IoMenu, IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useGetMyProfileQuery } from "../../redux/api/authApi";
import { useGetAllNotificationsQuery } from "../../redux/api/notification";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: profileData } = useGetMyProfileQuery();
  const { data: notificationsData } = useGetAllNotificationsQuery();

  // Calculate unread notifications count
  const unreadCount =
    notificationsData?.data?.data?.filter((notif) => !notif.read).length || 0;

  return (
    <div className="sticky top-0 z-30 w-full px-5 py-3 bg-gray-50">
      <header className="shadow-sm rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
        <div className="flex justify-between items-center px-5 md:px-10 h-[80px]">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="p-2 rounded hover:opacity-80 focus:outline-none"
          >
            <IoMenu className="w-8 h-8 text-blue-600" />
          </button>
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate("/notifications")}
              className="relative p-2 rounded-full border border-blue-600 hover:bg-white/60 transition cursor-pointer"
            >
              <IoNotificationsOutline className="w-6 h-6 text-blue-600" />
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] px-1 leading-none">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </button>

            {/* Profile */}
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={
                  profileData?.data?.profileImage ||
                  "https://avatar.iran.liara.run/public/31"
                }
                className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
                alt="User Avatar"
                onError={(e) => {
                  e.target.src = "https://avatar.iran.liara.run/public/31";
                }}
              />
              <div>
                <h3 className="hidden md:block text-blue-600 text-lg font-semibold">
                  {profileData?.data?.fullName || user?.name || "Mr. Admin"}
                </h3>
                <p className="text-blue-600 text-lg font-semibold">
                  {profileData?.data?.role || user?.role || "Admin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;