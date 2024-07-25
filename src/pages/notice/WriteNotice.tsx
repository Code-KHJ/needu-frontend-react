import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Write.module.scss";
import TextEditor from "@/components/TextEditor";
import type { Editor } from "@toast-ui/react-editor";
import communityApi from "@/apis/community";
import { HookCallback } from "node_modules/@toast-ui/editor/types/editor";
import { useUser } from "@/contexts/UserContext";
import Button from "@/components/elements/Button";
import { useNavigate } from "react-router-dom";
import { NoticeCreateDto } from "@/interface/Notice";
import noticeApi from "@/apis/notice";

const WriteNotice = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (user.authority !== 100) {
      navigate("/");
    }
    setValues({
      ...values,
      user_id: user.id,
    });
  }, [user]);

  const [values, setValues] = useState<NoticeCreateDto>({
    user_id: 0,
    title: "",
    markdown: "",
    html: "",
    is_show: false,
  });
  const handleValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, checked } = e.target;
    if (name == "is_show") {
      setValues({
        ...values,
        [name]: checked,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const handleEditor = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    const html = editorRef.current?.getInstance().getHTML();
    setValues({
      ...values,
      markdown: markdown,
      html: html,
    });
  };
  const handleImage = useCallback(
    async (blob: Blob, callback: HookCallback) => {
      const formData = new FormData();
      formData.append("image", blob);

      const response = await communityApi.uploadImage(formData);

      if (response.status !== 201) {
        if (response.status === 413) {
          alert("파일 용량이 5MB를 초과하여 업로드에 실패하였습니다.");
          return;
        } else {
          alert("오류가 발생했습니다.");
          return;
        }
      }
      const imageUrl = response.data.imageUrl;
      callback(imageUrl, "image");
    },
    []
  );

  const [valid, setValid] = useState({
    user_id: false,
    title: false,
    markdown: false,
    html: false,
  });
  useEffect(() => {
    setValid({
      user_id: values.user_id > 0,
      title: values.title !== "",
      markdown: values.markdown !== "",
      html: values.html !== "",
    });
  }, [values]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(valid).every((value) => value);
    setIsSubmitDisabled(!isSubmit);
  }, [values, valid]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmed = confirm("공지사항을 등록하시겠습니까?");
    if (confirmed) {
      const response = await noticeApi.createNotice(values);
      if (response.status !== 201) {
        alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      alert("공지사항이 작성되었습니다.");
      navigate(`/notice/${response.data.notice.id}`);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.write_wrap}>
      <div className={styles.info}>
        <h1>공지사항</h1>
        <p className="body1">NEEDU 공지사항을 작성해주세요.</p>
      </div>
      <form className={styles.form_wrap}>
        <div className={styles.content_title}>
          <div className={styles.title}>
            <h4>제목</h4>
            <input
              name="title"
              type="text"
              className={`${valid.title ? styles.valid : ""}`}
              placeholder="제목을 입력해주세요."
              value={values.title}
              onChange={handleValue}
            ></input>
          </div>
          <div className={styles.is_show}>
            <h4>공개</h4>
            <div>
              <input
                name="is_show"
                type="checkbox"
                checked={values.is_show}
                onChange={handleValue}
              ></input>
              <label>지금부터 노출합니다.</label>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.guide}>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-d7cb722b6a6247d38594aff27c31c036?pvs=4"
              target="_blank"
            >
              커뮤니티 가이드 보기
              <img
                src="/src/assets/images/ico_ext.png"
                style={{
                  width: "17px",
                  verticalAlign: "bottom",
                  marginLeft: "10px",
                }}
              />
            </a>
          </div>
          <TextEditor
            editorRef={editorRef}
            placeholder="공지사항을 작성해주세요."
            initialValue=" "
            handleImage={handleImage}
            onChange={handleEditor}
          />
        </div>
        <div className={styles.btn_wrap}>
          <button className={styles.cancel} onClick={handleCancel}>
            취소
          </button>
          <Button
            children="등록"
            className={`${
              isSubmitDisabled === false
                ? "btn_condition_true"
                : "btn_condition_false"
            }`}
            style={{ minWidth: "110px", height: "60px" }}
            isDisabled={isSubmitDisabled}
            onClick={handleSubmit}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default WriteNotice;
