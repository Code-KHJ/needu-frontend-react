import React, { useCallback, useRef } from "react";
import styles from "./Write.module.scss";
import TextEditor from "@/components/TextEditor";
import type { Editor } from "@toast-ui/react-editor";

const WriteFree = () => {
  const editorRef = useRef<Editor>(null);

  const onClick = useCallback(() => {
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();
    const html = editorRef.current.getInstance().getHTML();

    console.log(markdown);
    console.log(html);
  }, []);

  return (
    <>
      <div style={{ width: "80%", margin: "50px auto" }}>
        <div className={styles.write_wrap}>WriteFree</div>
        <TextEditor
          editorRef={editorRef}
          placeholder="테스트"
          initialValue="테스트밸류"
          height="500px"
          // onChangeEditor={}
        />
        <button onClick={onClick}>click</button>
      </div>
    </>
  );
};

export default WriteFree;
