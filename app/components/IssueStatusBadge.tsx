import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      color={
        status === "OPEN"
          ? "red"
          : status === "IN_PROGRESS"
          ? "violet"
          : "green"
      }
    >
      {status}
    </Badge>
  );
};

export default IssueStatusBadge;
