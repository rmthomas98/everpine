"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const roles = [
  {
    value: "owner",
    label: "Owner",
    description: "Full access to the entire team",
  },
  {
    value: "member",
    label: "Member",
    description: "Create QR Codes, links, and pages",
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Read-only access to content",
  },
];

export const AddMember = ({
  accessToken,
  members,
  setMembers,
  seats,
  setInvites,
  setActiveTab,
  teamId,
  search,
}) => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");

  const onSubmit = async (values) => {
    if (!role) return toast.error("Please select a role");
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/members/invite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, role, teamId }),
    });

    setIsLoading(false);
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data);
    }

    const { invites } = await res.json();
    setInvites(invites);
    setRole("");
    reset();
    toast.success("Invitation sent");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add member</CardTitle>
        <CardDescription>Invite a new member to your team</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            placeholder="Email address..."
            disabled={seats === 1}
            {...register("email", { required: true })}
          />
          <Select
            disabled={seats === 1}
            onValueChange={(value) => setRole(value)}
            value={role}
          >
            <SelectTrigger>
              {role
                ? role.split("")[0].toUpperCase() + role.slice(1)
                : "Select role..."}
            </SelectTrigger>
            <SelectContent>
              {roles.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  <div>
                    <p className="text-[13px] -mb-0.5">{item.label}</p>
                    <p className="text-muted-foreground text-[12px] mt-0">
                      {item.description}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        {seats === 1 ? (
          <p className="text-muted-foreground text-[13px]">
            <Link
              href="/subscribe?plan=professional"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Upgrade
            </Link>
            &nbsp;to access this feature
          </p>
        ) : (
          <p className="text-[13px] text-muted-foreground">
            Learn more about&nbsp;
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              team members
            </Link>
          </p>
        )}
        <Button
          size="sm"
          disabled={seats === 1}
          className={`w-[58px]`}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <CgSpinner className="animate-spin" /> : "Invite"}
        </Button>
      </CardFooter>
    </Card>
  );
};
