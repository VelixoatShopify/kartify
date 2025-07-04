import { LoaderFunctionArgs, redirect } from "@remix-run/node";

// This automatically redirects to /app when someone lands on /
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirect("/app");
};

export default function Index() {
  return null;  // Not needed because we're redirecting
}
