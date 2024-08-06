"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AvatarCard = ({ user, accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const onImageChange = async (e) => {
    // make sure the user has selected a file
    if (!e.target.files.length) return;
    const file = e.target.files[0];

    // make sure the file is an image
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }

    // make sure image is not too large
    const maxSize = 5 * 1024 * 1024; // 5mb
    if (file.size > maxSize) {
      return toast.error("Image size is too large");
    }

    // create a blob to preview the image in place of existing avatar
    const blob = URL.createObjectURL(file);
    user.avatar = blob;
    setPreviewImage(blob);
    setSelectedFile(file);
  };

  const onConfirm = async () => {
    if (!selectedFile) return toast.error("Please select a new image");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    const res = await fetch(`${baseUrl}/user/update-avatar`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    });

    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return toast.error(data);

    setIsLoading(false);
    router.refresh();
    toast.success(data);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between w-full">
        <CardTitle>Your avatar</CardTitle>
        <CardDescription>
          Click on your avatar to upload a new one.
        </CardDescription>
      </CardHeader>
      <CardContent className="justify-end">
        <Avatar
          htmlFor="avatar"
          className="h-16 w-16 cursor-pointer hover:opacity-80 transition-all"
          onClick={() => document.getElementById("avatar").click()}
        >
          <AvatarImage
            src={previewImage || user?.avatar}
            alt="your avatar"
            className="opacity-0 fade-in-short-delayed"
          />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="h-16 w-16 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <input
          onChange={onImageChange}
          id="avatar"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        <p className="text-[13px] text-muted-foreground">5mb maximum size.</p>
        <Button
          size="sm"
          className="w-[74px]"
          disabled={isLoading || !user}
          onClick={onConfirm}
        >
          {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
};
