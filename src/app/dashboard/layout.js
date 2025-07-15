import FabMenu from "../components/FabMenu";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">
        {" "}
        {/* Add padding to prevent content from being hidden behind FAB */}
        {children}
        <FabMenu />
      </div>
    </div>
  );
}
