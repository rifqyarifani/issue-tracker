import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import prisma from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <div className=" mb-5">
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((data) => (
            <Table.Row key={data.id}>
              <Table.RowHeaderCell>
                {data.title}{" "}
                <div className=" block md:hidden">{data.status}</div>
              </Table.RowHeaderCell>
              <Table.Cell className=" hidden md:table-cell">
                {data.status}
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

export default IssuesPage;
