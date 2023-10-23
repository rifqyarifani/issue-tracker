import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div>Hello World!</div>
      <Pagination
        itemCount={80}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
