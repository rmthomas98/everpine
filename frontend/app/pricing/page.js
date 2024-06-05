import { Tiers } from "@/components/pricing/tiers";
import { Compare } from "@/components/pricing/compare";
import { StartForFree } from "@/components/startForFree";
import { Faqs } from "@/components/pricing/faq";
import { Features } from "@/components/pricing/features";

export const metadata = {
  title: "Pricing | Dreamist",
  description: "Choose the right plan for your needs.",
};

const PricingPage = () => {
  return (
    <div className="fade-in-short-delayed opacity-0">
      <Tiers />
      <Features />
      <Compare />
      <Faqs />
      <StartForFree />
    </div>
  );
};

export default PricingPage;
