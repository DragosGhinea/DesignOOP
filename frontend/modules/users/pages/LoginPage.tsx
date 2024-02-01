import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import LeftDownBlob from "../components/blobs/LeftDownBlob";
import RightUpBlob from "../components/blobs/RightUpBlob";
import { ShieldIcon, Undo2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const callbackUrl = (searchParams.callbackUrl as string) ?? "/";

  return (
    <>
      <LeftDownBlob className="absolute bottom-0 left-0 size-[50%] fill-blue-light dark:fill-blue-dark2" />
      <RightUpBlob className="absolute right-0 top-0 size-[50%] fill-blue-light dark:fill-blue-dark2" />
      <div className="flex size-full items-center justify-center">
        <Card className="relative flex w-full flex-col items-center shadow-dark-100 dark:shadow-none md:w-[30%]">
          <CardHeader className="flex flex-row items-center justify-stretch gap-5">
            <CardTitle className="grow">Login</CardTitle>
            <CardDescription className="border-l-[1px] pl-3">
              If you want to access your progress stats and activity, you need
              to be authenticated.
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
