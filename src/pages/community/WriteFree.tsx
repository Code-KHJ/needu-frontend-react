import React from "react";
import styles from "./Write.module.scss";
import TextEditor from "@/components/TextEditor";

const WriteFree = () => {
  return (
    <>
      <div className={styles.write_wrap}>WriteFree</div>
      <TextEditor
        // editorRef={null}
        // placeholder="테스트"
        // initialValue="테스트밸류"
        height="500px"
        // onChangeEditor={}
      />
    </>
  );
};

export default WriteFree;
