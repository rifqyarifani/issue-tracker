import LatestIssue from "./LatestIssue";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <LatestIssue />
    </>
  );
}
