import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/issues/new/loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <Loading />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
