import { redirect } from "next/navigation";
export default function Page() {
  // For a regular project there will be <Home/> page here.
  // But for this example I will simply redirect to the Products page straight away.
  redirect("/products");
}
