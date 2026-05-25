import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function PageWrapper({ children }) {
  return (
    // flex-col для мобилок, md:flex-row для ПК
    <div className="flex flex-col md:flex-row min-h-screen bg-transparent transition-colors duration-500 pb-24 md:pb-0">
      <Sidebar />

      {/* Отступы меньше на мобилках (p-4), стандартные на ПК (md:p-8) */}
      <div className="flex-1 p-4 md:p-8 transition-all duration-500 ease-in-out w-full max-w-full overflow-hidden">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
