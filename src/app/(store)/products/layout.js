import Sidebar from "@/components/Sidebar";
export default function Layout({ store }) {
  return (
    <>
      <Sidebar />
      <main className="flex gap-8 flex-1 px-8 pb-16">{store}</main>
    </>
  );
}
