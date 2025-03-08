import Sidebar from "@/components/Sidebar";
export default function Layout({ store }) {
  return (
    <main className="flex ">
      <Sidebar />
      {store}
    </main>
  );
}
