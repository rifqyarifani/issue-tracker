import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams: { status } }: Props) => {
  const statuses = Object.values(Status).includes(status) ? status : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: statuses,
    },
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>
                <Link href={`/issues/${data.id}`}>{data.title}</Link>
                <div className=" block md:hidden">
                  <IssueStatusBadge status={data.status} />
                </div>
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                <IssueStatusBadge status={data.status} />
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                {data.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// export const dynamic = "force-dynamic";
// export const revalidate = 0

export default IssuesPage;
