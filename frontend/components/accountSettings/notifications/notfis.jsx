"use client";

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export const Notifs = ({ user, accessToken }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Select what notifications you would like to receive
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
