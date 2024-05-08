import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import LeftDownBlob from "../components/blobs/left-down-blob";
import RightUpBlob from "../components/blobs/right-up-blob";
import { AlertTriangleIcon, ShieldIcon, Undo2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "../components/forms/login-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const callbackUrl = (searchParams.callbackUrl as string) ?? "/";
  const error = searchParams.error as string | undefined;

  return (
    <>
      <LeftDownBlob className="absolute bottom-0 left-0 size-[50%] fill-blue-light dark:fill-blue-dark2" />
      <RightUpBlob className="absolute right-0 top-0 size-[50%] fill-blue-light dark:fill-blue-dark2" />
      <div className="flex size-full flex-col items-center justify-center gap-5">
        {error && (
          <Alert
            variant="destructive"
            className="bg-light-900 dark:bg-light-700 md:w-[30%]"
          >
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Error: {error}</AlertTitle>
            <AlertDescription>
              There was an error while trying to authenticate you. Please try
              again.
            </AlertDescription>
          </Alert>
        )}
        <Card className="relative flex w-[85%] flex-col items-center shadow-dark-100 dark:shadow-none md:w-[60%] lg:w-[40%]">
          <CardHeader className="flex flex-row items-center justify-stretch gap-5">
            <CardTitle className="grow">Login</CardTitle>
            <CardDescription className="border-l-[1px] pl-3 font-semibold">
              You do not need to create an account to use the application.
              Accounts are currently used for admin purposes, but in the future
              they will be used to save your progress.
            </CardDescription>
          </CardHeader>
          <Separator className="mb-10 mt-5 flex h-[3px] w-[90%] items-center justify-center">
            <div className="inline rounded-full bg-muted p-2">
              <ShieldIcon className="size-10" />
            </div>
          </Separator>
          <LoginForm />
          <CardFooter className="mt-5 w-full">
            <Link href={callbackUrl} className="w-full">
              <Button
                className="flex w-full items-center gap-3"
                variant="outline"
              >
                <Undo2Icon className="size-4" /> Go back without logging
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
