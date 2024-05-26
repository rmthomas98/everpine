import { Tiers } from "@/components/pricing/tiers";

const PricingPage = () => {
  return (
    <div className="p-4">
      <div className="max-w-[1000px] mx-auto fade-in-short-delayed opacity-0">
        <Tiers />
      </div>
    </div>
  );
};

export default PricingPage;
