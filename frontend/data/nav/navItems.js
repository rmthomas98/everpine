import { HiMiniQrCode } from "react-icons/hi2";
import {
  BiBarChart,
  BiBarChartAlt2,
  BiBrain,
  BiGlobe,
  BiLinkAlt,
} from "react-icons/bi";
import { FiBarChart2 } from "react-icons/fi";

export const products = [
  {
    title: "Artificial intelligence (AI)",
    description: "Explore what's possible",
    icon: <BiBrain />,
    href: "/products/ai",
  },
  {
    title: "QR codes",
    description: "Spark curiosity like never before",
    icon: <HiMiniQrCode />,
    href: "/products/qr-codes",
  },
  {
    title: "Custom links",
    description: "Shorten and brand links",
    icon: <BiLinkAlt />,
    href: "/products/custom-links",
  },
  {
    title: "Landing pages",
    description: "Showcase your product or service",
    icon: <BiGlobe />,
    href: "/products/landing-pages",
  },
  {
    title: "Analytics",
    description: "Find your best performers",
    icon: <BiBarChart />,
    href: "/products/analytics",
  },
];
