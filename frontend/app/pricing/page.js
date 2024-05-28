import { Tiers } from "@/components/pricing/tiers";
import { Compare } from "@/components/pricing/compare";

const PricingPage = () => {
  return (
    <div className="p-4">
      <div className="max-w-[1200px] mx-auto fade-in-short-delayed opacity-0">
        <Tiers />
        <Compare />
      </div>
    </div>
  );
};

export default PricingPage;
