"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiLinkAlt, BiCopy, BiCheck } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const InviteLinkDialog = ({ invite, isOpen, setIsOpen }) => {
  const [isCopied, setIsCopied] = useState(false);

  const url = `${baseUrl}/invite?token=${invite?.token}`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Invitation link</DialogTitle>
          <DialogDescription className="text-[13px]">
            Share this link with {invite?.email} to invite them to your team.
            This is their unique invitation link and will not work for anyone
            else.
          </DialogDescription>
        </DialogHeader>
        <div className="relative flex items-center">
          <BiLinkAlt size={14} className="absolute left-3" />
          <Input className="pl-8 h-[34px]" value={url} readOnly />
          <Button
            size="sm"
            onClick={onCopy}
            className="p-0 h-[34px] w-[34px] flex items-center justify-center relative shrink-0 ml-2"
          >
            <BiCheck
              size={16}
              className={`${
                isCopied ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } transition-all absolute duration-200`}
            />
            <BiCopy
              size={14}
              className={`${
                isCopied ? "opacity-0 scale-0" : "opacity-100 scale-100"
              } transition-all absolute duration-200`}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
