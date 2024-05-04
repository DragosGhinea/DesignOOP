export const extractTableOfContents = (
  json: any,
  result: { title: string; id: string; depth: number }[],
  depth: number = 0
) => {
  let depthToUse = depth;

  if ("contentTable" in json) {
    result.push({
      title: json.contentTable.title,
      id: json.contentTable.title,
      depth,
    });
    depthToUse = depth + 1;
  }

  if ("children" in json) {
    for (const child of json.children) {
      extractTableOfContents(child, result, depthToUse);
    }
  }
};

export const extractTableOfContentsFromJSON = (
  json: any,
  result: { title: string; id: string; depth: number }[]
) => {
  if (json === undefined) {
    return;
  }

  if ("components" in json) {
    for (const component of json.components) {
      extractTableOfContents(component, result);
    }
  }
};
