"use client";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Callout, Text, TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/app/schema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import delay from "delay";

type IssueForm = z.infer<typeof schema>;

const NewIssuePage = async () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  await delay(2000);
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
            <TextField.Input placeholder="Title" {...register("title")} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
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

export default NewIssuePage;
