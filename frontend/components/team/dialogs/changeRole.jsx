"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const roles = [
  {
    value: "OWNER",
    label: "Owner",
    description: "Full access to the entire team",
  },
  {
    value: "MEMBER",
    label: "Member",
    description: "Create QR Codes, links, and pages",
  },
  {
    value: "VIEWER",
    label: "Viewer",
    description: "Read-only access to content",
  },
];

export const ChangeRole = ({
  accessToken,
  teamId,
  member,
  isOpen,
  setIsOpen,
  setMembers,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setRole(member?.role);
  }, [isOpen]);

  const onUpdateRole = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/members/update-role`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, roleId: member?.id, role }),
    });

    if (!res.ok) {
      setIsLoading(false);
      return toast.error("Failed to update role");
    }

    const { members } = await res.json();
    // get role of user
    const userRole = members.find((m) => m.user.id === userId).role;
    if (userRole !== "OWNER") return window?.location.assign("/dashboard");
    setMembers(members);
    setIsOpen(false);
    setIsLoading(false);
    toast.success("Role updated successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change member role</DialogTitle>
          <DialogDescription className="text-[13px]">
            You are about to change the role for {member?.user.email}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          {roles.map((item) => (
            <div
              onClick={() => setRole(item.value)}
              key={item.value}
              className={`py-2 px-3 border rounded-lg w-full cursor-pointer flex items-center justify-between transition-all ${
                role === item.value
                  ? "border-foreground"
                  : "hover:border-foreground/30"
              }`}
            >
              <div>
                <p className="text-[13px]">{item.label}</p>
                <p className="text-muted-foreground text-xs">
                  {item.description}
                </p>
              </div>
              <div
                className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                  role === item?.value && "shadow-inner"
                } transition-all`}
              >
                <div
                  className={`bg-foreground rounded-full transition-all ${
                    role === item.value
                      ? "h-1.5 w-1.5 opacity-100"
                      : "h-0 w-0 opacity-0"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onUpdateRole}
            disabled={isLoading || member?.role === role}
            className="w-[74px]"
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
