import { Issue } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issue: Issue;
}

const EditIssueButton = ({ issue }: Props) => {
  return (
    <Button>
      <Link
        href={`/issues/${issue.id}/edit`}
        className=" flex items-center gap-1"
      >
        {" "}
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
