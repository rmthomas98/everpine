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
    <div className="flex h-screen min-h-[500px] fade-in-short-delayed opacity-0">
      <div className="w-3/4 h-full p-4">
        <div className="relative z-10 w-fit">
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
        </div>
        <div className="w-full h-full flex items-center relative top-[-25px]">
          <SignUpForm />
        </div>
      </div>
      <div className="w-1/2 h-full bg-gradient-to-br from-blue-950 via-purple-950 to-orange-950 dark:from-blue-200 dark:via-purple-200 dark:to-orange-200 p-4 relative">
        <div className="flex w-full justify-end">
          <Link
            href="/sales"
            passHref
            className="flex items-center text-[13px] font-medium text-background hover:underline z-10"
          >
            Contact sales
            <HiMiniArrowRight className="ml-1" size={15} />
          </Link>
        </div>
        <div className="h-full flex flex-col justify-center relative top-[-20px] min-[1160px]:pl-20 max-[1160px]:pl-6 transition-all duration-300">
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
