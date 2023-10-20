"use client";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Callout, TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState("");
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
              await axios.post("/api/issues", data);
              router.push("/issues");
            } catch (error) {
              setError("An unexpected error occured.");
            }
          })}
        >
          <TextField.Root>
            <TextField.Input placeholder="Title" {...register("title")} />
          </TextField.Root>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <Button>Submit New Issue</Button>
        </form>
      </div>
    </>
  );
};

export default NewIssuePage;