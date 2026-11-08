import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import StudioDetailsClient from "./StudioDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default  async function StudioDetailsClient({
  id,
}: {
  id: string;
}) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const callbackURL = `/studios/${encodeURIComponent(id)}`;

    redirect(
      `/auth/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`
    );
  }

  return <StudioDetailsClient id={id} />;
}