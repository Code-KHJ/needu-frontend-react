import React, { useCallback, useRef } from 'react';
import styles from './Write.module.scss';
import TextEditor from '@/components/TextEditor';
import type { Editor } from '@toast-ui/react-editor';
import communityApi from '@/apis/community';
import { HookCallback } from 'node_modules/@toast-ui/editor/types/editor';

const WriteFree = () => {
  const editorRef = useRef<Editor>(null);

  const onClick = useCallback(() => {
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();
    const html = editorRef.current.getInstance().getHTML();

    console.log(markdown);
    console.log(html);
  }, []);

  const handleImage = useCallback(
    async (blob: Blob, callback: HookCallback) => {
      const formData = new FormData();
      formData.append('image', blob);

      const response = await communityApi.uploadImage(formData);
      console.log(response);
      if (response.data.status !== 201) {
        alert('오류가 발생했습니다.');
        return;
      }
      const imageUrl = response.data.imageUrl;
      callback(imageUrl, 'image');
    },
    []
  );
  return (
    <>
      <div style={{ width: '80%', margin: '50px auto' }}>
        <div className={styles.write_wrap}>WriteFree</div>
        <TextEditor
          editorRef={editorRef}
          placeholder="테스트"
          initialValue="테스트밸류"
          height="500px"
          handleImage={handleImage}
          // onChangeEditor={}
        />
        <button onClick={onClick}>click</button>
      </div>
    </>
  );
};

export default WriteFree;
