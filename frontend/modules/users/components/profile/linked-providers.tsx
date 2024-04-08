import React from "react";
import { LinkedProvider as LinkedProviderType } from "../../types/linked-provider";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { capitalize } from "@/lib/string-utils";

const LinkedProvider = ({
  linkedProvider,
}: {
  linkedProvider: LinkedProviderType;
}) => {
  const date = new Date(linkedProvider.linkedAtDateInSeconds * 1000);
  const linkedAtDateInSeconds = date.toDateString();
  const providerName = capitalize(linkedProvider.provider);
  return (
    <Card className="flex flex-col gap-2 p-5">
      <CardTitle>{providerName}</CardTitle>
      <CardDescription>
        First connection on {linkedAtDateInSeconds}
      </CardDescription>
    </Card>
  );
};

const LinkedProviders = ({
  linkedProviders,
}: {
  linkedProviders: LinkedProviderType[];
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="h5-typography inline-block font-bold">Linked Providers</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {linkedProviders.map((linkedProvider) => {
          return (
            <LinkedProvider
              linkedProvider={linkedProvider}
              key={linkedProvider.provider}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LinkedProviders;
