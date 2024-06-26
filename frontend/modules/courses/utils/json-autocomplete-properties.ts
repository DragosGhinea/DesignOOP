import { getPresentPropertyNames } from "./json-syntax-tree-helper";
import {
  Completion,
  CompletionContext,
  snippetCompletion,
} from "@codemirror/autocomplete";
import { syntaxTree } from "@codemirror/language";
import { SyntaxNode } from "@lezer/common";
import {
  ComponentConfig,
  Components,
  CourseParameters,
} from "../constants/dynamic-course-components";
import { v4 as uuidv4 } from "uuid";

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
        info: param.description,
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

// it detects if an object is in the right position to be a component
// used for autocomplete of the componentType property itself
const mightBeComponent = (ctx: CompletionContext, currentNode: SyntaxNode) => {
  const parentNode = currentNode.parent;

  if (parentNode == null || parentNode.name !== "Array") {
    return false;
  }

  const propertyNameNode = parentNode.prevSibling;

  if (propertyNameNode) {
    const propertyName = ctx.state.sliceDoc(
      propertyNameNode.from,
      propertyNameNode.to
    );

    return propertyName === '"children"' || propertyName === '"components"';
  }

  return false;
};

const optionsPerComponent = Object.entries(Components).reduce(
  (acc, [componentName, componentConfig]) => {
    acc[componentName] = generateOptions(componentConfig);
    return acc;
  },
  {} as { [key: string]: Completion[] }
);

const componentTypes = Object.keys(Components).map((componentName) => {
  return snippetCompletion(`"componentType": "${componentName}"`, {
    label: '"componentType"',
    detail: `"${componentName}"`,
  });
});

const optionsCourse = CourseParameters.map((param) => {
  return snippetCompletion(
    `"${param.paramName}": ${param.paramAutocomplete || "${" + param.paramName + "}"}`,
    {
      label: param.paramName,
      detail: `(${param.paramType})`,
      info: param.description,
    }
  );
});

// if the cursor is inside a property, will return the object node that contains it
const ensureOutsideProperty = (componentNode: SyntaxNode) => {
  if (!componentNode) return null;

  if (componentNode.name === "Property") {
    return componentNode.parent;
  }

  if (componentNode.name === "PropertyName") {
    return componentNode.parent?.parent;
  }

  return componentNode;
};

export const propertyAutocomplete = (ctx: CompletionContext) => {
  const word = ctx.matchBefore(/\b\w*$/);

  if (!ctx.explicit && (!word || word.from === word.to)) return null;

  const initialNode = syntaxTree(ctx.state).resolve(ctx.pos); // might be a property
  const componentNode = ensureOutsideProperty(initialNode);
  if (!componentNode) return null;

  let componentType = null;
  if (componentNode.name === "Component") {
    const componentTypeValueNode = componentNode.getChild(
      "ComponentTypeProperty"
    )!.lastChild!;

    if (componentTypeValueNode.name === "String")
      componentType = ctx.state.sliceDoc(
        componentTypeValueNode.from + 1,
        componentTypeValueNode.to - 1
      );
  }

  let options: Completion[];

  // if it is not a component, it might be a course prop
  if (!componentType) {
    // if it is not the root, it is not a course, but might still be in the right position to be a component
    if (componentNode.parent?.name !== "JsonText") {
      if (mightBeComponent(ctx, componentNode)) {
        return {
          from: word?.from ?? ctx.pos,
          options: componentTypes,
          filter: true,
        };
      } else return null;
    }

    const usedParams = getPresentPropertyNames(ctx.state.doc, componentNode);
    options = optionsCourse.filter(
      (option) => !usedParams.includes(option.label)
    );
  } else {
    const usedParams = getPresentPropertyNames(ctx.state.doc, componentNode);
    options = optionsPerComponent[componentType].filter(
      (option) => !usedParams.includes(option.label)
    );

    // it needs to be put separately from the generated values so the uuid changes on each autocomplete
    if (!usedParams.includes("contentTable"))
      options.push(
        snippetCompletion(
          `"contentTable": {\n\t"title": "${componentType}",\n\t"id": "${uuidv4()}"\n}`,
          {
            label: "contentTable",
            detail: `Jumping to this component`,
          }
        )
      );
  }

  let from = word?.from ?? ctx.pos;

  if (initialNode !== componentNode) {
    from = initialNode.from;
    options = options.map((option) => {
      return {
        ...option,
        label: `"${option.label}"`,
      };
    });
  }

  return {
    from,
    options,
    filter: true,
  };
};
