import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { HookCallback } from "node_modules/@toast-ui/editor/types/editor";

interface TextEditorProps {
  editorRef: React.RefObject<Editor> | null;
  initialValue?: string;
  placeholder?: string;
  handleImage?: (blob: Blob, callback: HookCallback) => Promise<void>;
  onChange: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  editorRef,
  placeholder = "",
  initialValue = " ",
  handleImage,
  onChange,
}) => {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];
  const colorSyntaxOptions = {
    preset: [
      "#181818",
      "#282828",
      "#383838",
      "#585858",
      "#b8b8b8",
      "#d8d8d8",
      "#e8e8e8",
      "#f8f8f8",
      "#df200f",
      "#f76e0a",
      "#ffd400",
      "#3d9512",
      "#2424e1",
      "#1f1f99",
      "#6b24b3",
      "#994910",
    ],
  };
  let height = "350px";
  if (window.innerWidth >= 1280) {
    height = "650px";
  }

  return (
    <Editor
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      hideModeSwitch={true}
      plugins={[[colorSyntax, colorSyntaxOptions]]}
      toolbarItems={toolbarItems}
      ref={editorRef}
      initialValue={initialValue}
      placeholder={placeholder}
      hooks={{
        addImageBlobHook: handleImage,
      }}
      onChange={onChange}
      height={height}
      autofocus={false}
    />
  );
};

export default TextEditor;
