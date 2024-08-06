"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  BiEnvelope,
  BiLinkAlt,
  BiMailSend,
  BiUser,
  BiXCircle,
} from "react-icons/bi";
import { InviteLinkDialog } from "@/components/team/dialogs/getInviteLink";
import { ResendInvite } from "@/components/team/dialogs/resendInvite";
import { RevokeInvite } from "@/components/team/dialogs/revokeInvite";

export const Invites = ({
  invites,
  setInvites,
  selected,
  setSelected,
  accessToken,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState(null);
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false);

  const onSelect = (id) => {
    if (selected.includes(id)) {
      // remove the id from selected array
      const filtered = selected.filter((memberId) => memberId !== id);
      return setSelected(filtered);
    }

    setSelected([...selected, id]);
  };

  return (
    <>
      {invites.map((invite, i) => (
        <div
          key={invite.id}
          className={`w-full flex justify-between items-center p-4 space-x-4 ${
            i === invites.length - 1 ? undefined : "border-b"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selected.includes(invite.id)}
              onCheckedChange={() => onSelect(invite.id)}
            />
            <Avatar className="h-8 w-8">
              <AvatarImage
                className="bg-zinc-200 dark:bg-foreground transition-all"
                src={invite.user?.avatar || undefined}
                alt="avatar"
              />
              <AvatarFallback>
                <p className="text-xs">{invite.email[0].toUpperCase()}</p>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-[13px]">{invite.email}</p>
              <p className="text-[13px] text-muted-foreground">
                {invite.role.split("")[0] + invite.role.slice(1).toLowerCase()}
              </p>
            </div>
          </div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <FiMoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="space-x-1.5"
                onSelect={() => {
                  setSelectedInvite(invite);
                  setIsResendDialogOpen(true);
                }}
              >
                <BiMailSend />
                <span>Resend invite</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="space-x-1.5"
                onSelect={() => {
                  setSelectedInvite(invite);
                  setIsLinkDialogOpen(true);
                }}
              >
                <BiLinkAlt />
                <span>Get invite link</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="space-x-1.5 text-red-600 hover:!text-red-600 hover:!bg-destructive/10"
                onSelect={() => {
                  setSelectedInvite(invite);
                  setIsRevokeDialogOpen(true);
                }}
              >
                <BiXCircle />
                <span>Revoke invite</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      <ResendInvite
        isOpen={isResendDialogOpen}
        setIsOpen={setIsResendDialogOpen}
        invite={selectedInvite}
        accessToken={accessToken}
      />
      <InviteLinkDialog
        isOpen={isLinkDialogOpen}
        setIsOpen={setIsLinkDialogOpen}
        invite={selectedInvite}
      />
      <RevokeInvite
        isOpen={isRevokeDialogOpen}
        setIsOpen={setIsRevokeDialogOpen}
        invite={selectedInvite}
        accessToken={accessToken}
        setInvites={setInvites}
      />
    </>
  );
};
