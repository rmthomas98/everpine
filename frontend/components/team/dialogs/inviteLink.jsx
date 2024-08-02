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

export const InviteLinkDialog = ({ invite, isOpen, setIsOpen }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/invite?token=${invite.token}&email=${invite.email}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invitation link</DialogTitle>
          <DialogDescription className="text-[13px]">
            Share this link with {invite?.email} to invite them to your team.
            This is their unique invitation link and will not work for anyone
            else.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between rounded-lg p-1.5 border bg-accent/20">
          <div className="flex items-center space-x-2 ml-1 max-w-[280px]">
            <BiLinkAlt size={14} className="shrink-0" />
            <p className="text-[13px] truncate">{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/invite?token=${invite?.token}&email=${invite?.email}`}</p>
          </div>
          <Button
            size="sm"
            onClick={onCopy}
            className="p-0 h-8 w-8 flex items-center justify-center relative"
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
