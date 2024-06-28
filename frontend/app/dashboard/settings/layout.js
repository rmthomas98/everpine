import { SettingsNav } from "@/components/accountSettings/settingsNav";
import { Separator } from "@/components/ui/separator";

const SettingsLayout = async ({ children }) => {
  return (
    <div>
      <div className="px-4 py-6 opacity-0 fade-in-short-delayed">
        <div className="flex items-center space-x-2">
          {/*<BiCog className="text-xl" />*/}
          <h1 className="text-xl font-bold">Account settings</h1>
        </div>
      </div>
      <div className="pr-4 opacity-0 fade-in-short-delayed">
        <Separator />
      </div>
      <div className="flex space-x-8 py-6 px-4">
        <SettingsNav />
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
