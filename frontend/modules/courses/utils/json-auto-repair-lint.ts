import { Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";

export const jsonParseLinter =
  (setJsonString: any) =>
  (view: EditorView): Diagnostic[] => {
    const jsonString = view.state.doc.toString();
    try {
      JSON.parse(jsonString);
      setJsonString("");
    } catch (e: any) {
      console.log(e);
      const positionMatch = (e.message ?? "").match(/at position (\d+)/);
      const from = positionMatch ? parseInt(positionMatch[1]) : 0;
      const to = positionMatch
        ? parseInt(positionMatch[1])
        : view.state.doc.length;

      setJsonString(jsonString);
      return [
        {
          from,
          to,
          message: e.message,
          severity: "error",
        },
      ];
    }
    return [];
  };
