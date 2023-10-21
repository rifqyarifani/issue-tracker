"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { schema } from "@/app/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof schema>;

interface Props {
  issue: Issue;
}

const IssueForm = async ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className=" max-w-xl">
        {error && (
          <Callout.Root color="red" className=" mb-3">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form
          className=" space-y-3"
          onSubmit={handleSubmit(async (data) => {
            try {
              setLoading(true);
              await axios.post("/api/issues", data);
              router.push("/issues");
              setLoading(false);
            } catch (error) {
              setLoading(false);
              setError("An unexpected error occured.");
            }
          })}
        >
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder={`Title`}
              {...register("title")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder={`Description`} {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={loading}>
            Submit New Issue {loading && <Spinner />}
          </Button>
        </form>
      </div>
    </>
  );
};

export default IssueForm;