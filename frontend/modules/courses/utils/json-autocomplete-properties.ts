import { getComponentType, getPresentPropertyNames } from "./json-syntax-tree";
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

const generateOptions = (componentConfig: ComponentConfig) => {
  const params = componentConfig.params.map((param) => {
    return snippetCompletion(
      `"${param.paramName}": ${param.paramAutocomplete || "${" + param.paramName + "}"}`,
      {
        label: param.paramName,
        detail: `(${
          "paramType" in param
            ? param.paramType
            : param.literalValues.join(" | ")
        })`,
        info: param.description
      }
    );
  });

  if (componentConfig.hasChildren) {
    params.push(
      snippetCompletion(`"children": []`, {
        label: "children",
        detail: "Component[]",
      })
    );
  }

  return params;
};

const optionsPerComponent = Object.entries(Components).reduce(
  (acc, [componentName, componentConfig]) => {
    acc[componentName] = generateOptions(componentConfig);
    return acc;
  },
  {} as { [key: string]: Completion[] }
);

export const propertyAutocomplete = (ctx: CompletionContext) => {
  const word = ctx.matchBefore(/\b\w*$/);

  if (!ctx.explicit && (!word || word.from === word.to)) return null;

  const componentNode = syntaxTree(ctx.state).resolve(ctx.pos);
  const componentType = getComponentType(ctx.state.doc, componentNode);

  if (!componentType) return null;

  let options: Completion[] = optionsPerComponent[componentType];

  const usedParams = getPresentPropertyNames(ctx.state.doc, componentNode);
  options = options.filter((option) => !usedParams.includes(option.label));

  return {
    from: word?.from ?? ctx.pos,
    options,
    filter: true,
  };
};
