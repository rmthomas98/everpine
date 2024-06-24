import { SettingsNav } from "@/components/accountSettings/settingsNav";

const SettingsLayout = ({ children }) => {
  return (
    <div className="flex space-x-8">
      <SettingsNav />
      {children}
    </div>
  );
};

export default SettingsLayout;
