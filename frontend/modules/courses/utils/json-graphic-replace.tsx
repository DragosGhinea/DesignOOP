import {
  Decoration,
  EditorState,
  EditorView,
  StateField,
  WidgetType,
} from "@uiw/react-codemirror";
import { syntaxTree } from "@codemirror/language";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// https://discuss.codemirror.net/t/decoration-replace-side/3682/5

const findGraphicRanges = (state: EditorState) => {
  const ranges: { from: number; to: number }[] = [];

  syntaxTree(state)
    .cursor()
    .iterate((node) => {
      if (node.name === "GraphicProperty") {
        const propertyValue = node.node.lastChild;
        if (propertyValue && propertyValue.name === "String") {
          if (
            state.doc
              .sliceString(propertyValue.from + 1, propertyValue.to - 1)
              .startsWith(".")
          ) {
            ranges.push({
              from: propertyValue.from,
              to: propertyValue.to,
            });
          }
        }
      }
    });

  return ranges;
};

class GraphicWidget extends WidgetType {
  to: number;
  from: number;

  constructor(from: number, to: number) {
    super();
    this.to = to;
    this.from = from;
  }

  toDOM(view: EditorView) {
    const span = document.createElement("span");
    span.onclick = () => {
      toast(
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => {
              navigator.clipboard.readText().then((text) => {
                const toDisplay =
                  text.length > 25
                    ? text.slice(0, 20) +
                      "......." +
                      text.slice(text.length - 5)
                    : text;

                view.dispatch({
                  changes: {
                    from: this.from,
                    to: this.to,
                    insert: `".${text}"`,
                  },
                });
                toast.success("Graphic pasted from clipboard: " + toDisplay);
              });
            }}
          >
            Set graphic from clipboard
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const newTab = window.open(`/courses/graphic/editor`);

              if (newTab) {
                newTab.sessionStorage.setItem(
                  "course-graphic-editor",
                  view.state.sliceDoc(this.from + 2, this.to - 1)
                );
              }
            }}
          >
            Open in editor
          </Button>
        </div>,
        {
          position: "top-center",
        }
      );
      // toast("GraphicObject clicked", {
      //   action: {
      //     label: "Take graphic from clipboard",
      //     onClick: () => {
      //       navigator.clipboard.readText().then((text) => {
      //         const toDisplay =
      //           text.length > 25
      //             ? text.slice(0, 20) + "......." + text.slice(text.length - 5)
      //             : text;

      //         view.dispatch({
      //           changes: {
      //             from: this.from,
      //             to: this.to,
      //             insert: `".${text}"`,
      //           },
      //         });
      //         toast.success("Graphic pasted from clipboard: " + toDisplay);
      //       });
      //     },
      //   },
      //   cancel: {
      //     label: "Open in editor",
      //     onClick: () => {
      //       toast.error("GraphicObject clicked canceled");
      //     },
      //   },
      //   position: "top-center",
      //   style: {
      //     width: "150%"
      //   }
      // });
    };
    span.className =
      "bg-slate-100 p-1 rounded-sm cursor-pointer dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200";
    span.innerText = "[GraphicObject]";
    return span;
  }

  destroy(dom: HTMLElement): void {
    dom.remove();
  }
}

export const graphicWidgets = StateField.define({
  create() {
    return Decoration.none;
  },
  update(value, transaction) {
    if (!transaction.docChanged) {
      return value;
    }

    const ranges = findGraphicRanges(transaction.state);
    const newDecos = ranges.map((range) =>
      Decoration.replace({
        widget: new GraphicWidget(range.from, range.to),
        block: false,
      }).range(range.from, range.to)
    );

    return Decoration.set(newDecos, false);
  },
  provide: (f) => EditorView.decorations.from(f),
});
