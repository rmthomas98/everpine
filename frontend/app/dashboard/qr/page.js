import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const QRCodes = async () => {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <div className="fade-in-short-delayed opacity-0">
      <h1>QR Codes</h1>
    </div>
  );
};

export default QRCodes;
