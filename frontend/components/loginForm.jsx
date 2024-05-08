"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Image = dynamic(() => import("next/image"), { ssr: false });

export const LoginForm = () => {
  return <div>Login form</div>;
};
