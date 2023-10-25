import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { Metadata } from "next";
import NextLink from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({
  searchParams: { status, orderBy, page },
}: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const order = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const statuses = Object.values(Status).includes(status) ? status : undefined;

  const pagination = parseInt(page) || 1;
  const pageSize = 10;
  const where = { status };
  const issues = await prisma.issue.findMany({
    where,
    orderBy: order,
    skip: (pagination - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { status, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && (
                  <ArrowUpIcon className=" inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination
        pageSize={pageSize}
        currentPage={pagination}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
