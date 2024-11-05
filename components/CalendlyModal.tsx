import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { InlineWidget } from "react-calendly";
import Card from "./TypographyCard";
import { Typography } from "./Typography";
import { CopyButton } from "./CopyButton";

interface DialogDefaultProps {
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
}

export function DialogDefault({ open, handleOpen }: DialogDefaultProps) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="flex flex-col justify-center items-center bg-pakistan-green p-8"
    >
      <Card styles="flex flex-col text-center gap-4 max-w-md items-center mt-2">
        <Typography>
          I can always be reached at{" "}
          <CopyButton copyText="mitchellkellywalters@gmail.com" />
        </Typography>

        <Typography className="max-w-sm">
          If you would like to schedule a meeting, please use the link below.
        </Typography>
      </Card>
      <DialogBody className="w-full p-0">
        <div className=" w-full max-w-full">
          <InlineWidget url="https://calendly.com/mitchellkellywalters/30min" />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => {
            handleOpen(false);
          }}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
