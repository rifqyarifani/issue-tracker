import { Status } from "@prisma/client";
import React from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const container: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <>
      <Flex gap={"4"}>
        {container.map((item) => (
          <Card key={item.label}>
            <Flex gap={"1"} direction={"column"}>
              <Link
                href={`/issues?status=${item.status}`}
                className=" text-sm font-medium"
              >
                {item.label}
              </Link>
              <Text size={"5"} className=" font-bold">
                {item.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default IssueSummary;
