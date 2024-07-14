import { SignUpForm } from "@/components/signUp/signUpForm";
import { ThemedLogo } from "@/components/themedLogo";
import Link from "next/link";
import { HiMiniArrowRight, HiMiniQrCode } from "react-icons/hi2";
import { BiBarChart, BiBrain, BiGlobe, BiLinkAlt } from "react-icons/bi";

const plans = ["professional", "business", "enterprise"];
const cycle = ["month", "annual"];

const SignupPage = async ({ searchParams }) => {
  const { plan, billing } = searchParams;

  return (
    <div className="flex h-screen min-h-[600px]">
      <div className="w-3/4 h-full px-4 pb-4 pt-2 max-[860px]:w-full">
        {/*<div className="relative z-10 flex justify-between items-center bottom-1 max-[860px]:bottom-0 max-[860px]:mx-[-16px] border-b border-transparent max-[860px]:border-border max-[860px]:px-4 pb-2">*/}
        {/*  <Link href="/" passHref>*/}
        {/*    <ThemedLogo />*/}
        {/*  </Link>*/}
        {/*  <Link*/}
        {/*    href="/signin"*/}
        {/*    className="text-[13px] hover:underline font-medium dark:font-normal"*/}
        {/*  >*/}
        {/*    Sign in*/}
        {/*  </Link>*/}
        {/*</div>*/}
        <SignUpForm plan={plan} billing={billing} />
      </div>
      <div className="w-1/2 h-full bg-gradient-to-br from-blue-950 via-fuchsia-950 to-orange-950 dark:from-blue-200 dark:via-fuchsia-200 dark:to-orange-200 p-4 relative max-[860px]:hidden">
        {/*<div className="flex w-full justify-end">*/}
        {/*  <Link*/}
        {/*    href="/sales"*/}
        {/*    passHref*/}
        {/*    className="flex items-center text-[13px] font-medium text-background hover:underline z-10"*/}
        {/*  >*/}
        {/*    Contact sales*/}
        {/*  </Link>*/}
        {/*</div>*/}
        <div className="h-full flex flex-col justify-center relative min-[1160px]:pl-20 max-[1160px]:pl-6 transition-all duration-300 fade-in-short-delayed opacity-0">
          <div>
            <h1 className="text-background text-2xl font-bold max-w-[320px] min-w-[320px]">
              Spacemon is the ultimate tool for your business
            </h1>
            <div className="items-center flex space-x-2 mt-4">
              <BiBrain className="text-background" size={18} />
              <p className="text-background/90 text-sm dark:font-medium">
                Artificial intelligence
              </p>
            </div>
            <div className="items-center flex space-x-2 mt-3">
              <HiMiniQrCode className="text-background" size={18} />
              <p className="text-background/90 text-sm dark:font-medium">
                Stunning QR Codes
              </p>
            </div>
            <div className="items-center flex space-x-2 mt-3">
              <BiLinkAlt className="text-background" size={18} />
              <p className=" text-sm text-background/90 dark:font-medium">
                Branded short links
              </p>
            </div>
            <div className="items-center flex space-x-2 mt-3">
              <BiGlobe className="text-background" size={18} />
              <p className="text-background/90 text-sm dark:font-medium">
                Beautiful pages
              </p>
            </div>
            <div className="items-center flex space-x-2 mt-3">
              <BiBarChart className="text-background" size={18} />
              <p className="text-background/90 text-sm dark:font-medium">
                Detailed analytics
              </p>
            </div>
          </div>
        </div>
        {/*<div className="absolute bottom-4">*/}
        {/*  <p className="text-sm text-background font-medium">*/}
        {/*    Create an account and join other businesses that trust Spacemon to*/}
        {/*    grow their brand. Get started today!*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default SignupPage;
