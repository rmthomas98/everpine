import { SettingsNav } from "@/components/accountSettings/settingsNav";

const SettingsLayout = async ({ children }) => {
  return (
    <div>
      <div className="px-4 py-6 border-b opacity-0 fade-in-short-delayed">
        <div className="flex items-center space-x-2">
          {/*<BiCog className="text-xl" />*/}
          <h1 className="text-xl font-bold">Account settings</h1>
        </div>
      </div>
      <div className="flex space-x-8 p-4">
        <SettingsNav />
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
