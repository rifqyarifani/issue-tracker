import prisma from "@/prisma/client";
import React from "react";
import { Card, Heading, Table, Flex, Avatar } from "@radix-ui/themes";
import IssueStatusBadge from "./components/IssueStatusBadge";
import Link from "next/link";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading size={"4"} mb={"5"}>
        Latest Issue
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  <Flex>
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback="?"
                      radius="full"
                    />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
