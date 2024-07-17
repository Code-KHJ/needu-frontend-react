import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

interface TextEditorProps {
  // editorRef: React.RefObject<Editor> | null;
  // handleImage?: () => void;
  initialValue?: string;
  placeholder?: string;
  height?: string;
  // onChangeEditor: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  // editorRef,
  // handleImage,
  placeholder = "안내내용",
  initialValue = "",
  height = "300px",
  // onChangeEditor,
}) => {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  return (
    <Editor
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      hideModeSwitch={true}
      plugins={[colorSyntax]}
      toolbarItems={toolbarItems}
      // ref={editorRef}
      initialValue={initialValue}
      placeholder={placeholder}
      height={height}
      // onChange={onChangeEditor}
    />
  );
};

export default TextEditor;
