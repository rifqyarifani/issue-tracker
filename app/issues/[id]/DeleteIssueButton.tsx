import { Issue } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issue: Issue;
}

const DeleteIssueButton = ({ issue }: Props) => {
  return (
    <Button color="red">
      <Link
        href={`/issues/${issue.id}/delete`}
        className=" flex items-center gap-1"
      >
        {" "}
        <TrashIcon />
        Delete Issue
      </Link>
    </Button>
  );
};

export default DeleteIssueButton;
