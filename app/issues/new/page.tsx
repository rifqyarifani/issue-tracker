import React from "react";
import IssueForm from "../_components/IssueForm";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

const NewIssuePage = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default NewIssuePage;
