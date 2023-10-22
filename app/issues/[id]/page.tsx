import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOption";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  if (typeof id !== "string") {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <>
      <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
        <Box className=" md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction={"column"} gap={"4"}>
              <AssigneeSelect />
              <EditIssueButton issue={issue} />
              <DeleteIssueButton issue={issue} />
            </Flex>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default IssueDetailPage;
