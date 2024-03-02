import {
  Completion,
  CompletionContext,
  snippetCompletion,
} from "@codemirror/autocomplete";
import { syntaxTree } from "@codemirror/language";
import {
  ComponentConfig,
  Components,
} from "../constants/dynamic-course-components";

const generateParamsList = (params: ComponentConfig["params"]) => {
  return params.map((param) => {
    return `\t"${param.paramName}": ${param.paramAutocomplete || "${" + param.paramName + "}"}`;
  });
};

const generateCompleteValue = (
  componentName: string,
  componentConfig: ComponentConfig
) => {
  const params = generateParamsList(componentConfig.params);
  params.unshift(`\t"componentType": "${componentName}"`);
  if (componentConfig.hasChildren) params.push(`\t"children": []`);

  return `{\n${params.join(",\n")}\n}`;
};

const generateSnippetInfo = (completionValue: string) => {
  return () => {
    const node = document.createElement("div");
    node.appendChild(
      document.createTextNode("Will generate the following JSON object:")
    );
    node.appendChild(document.createElement("br"));
    node.appendChild(document.createElement("br"));

    const pre = document.createElement("pre");
    pre.appendChild(document.createTextNode(completionValue));
    node.appendChild(pre);

    return {
      dom: node,
      destroy: () => {
        node.remove();
      },
    };
  };
};

const componentOptions = Object.entries(Components).map(
  ([componentName, componentConfig]) => {
    const completeValue = generateCompleteValue(componentName, componentConfig);

    return snippetCompletion(completeValue, {
      label: componentName,
      detail: `(${componentConfig.component.name})`,
      type: "class",
      info: generateSnippetInfo(completeValue),
    });
  }
);

const isValidPosition = (ctx: CompletionContext) => {
  const syntax = syntaxTree(ctx.state);
  const currentNode = syntax.resolve(ctx.pos);

  if (currentNode.name !== "Array") {
    return false;
  }

  const propertyNameNode = currentNode.prevSibling;

  if (propertyNameNode) {
    const propertyName = ctx.state.sliceDoc(
      propertyNameNode.from,
      propertyNameNode.to
    );

    return propertyName === '"children"' || propertyName === '"components"';
  }

  return false;
};

export const componentSnippets = (ctx: CompletionContext) => {
  const word = ctx.matchBefore(/\b\w*$/);

  if (!isValidPosition(ctx)) return null;

  // only show all options if the user explicitly requests it
  if (!ctx.explicit && (!word || word.from === word.to)) return null;

  const options: Completion[] = componentOptions;
  return { from: word?.from ?? ctx.pos, options, filter: true };
};
