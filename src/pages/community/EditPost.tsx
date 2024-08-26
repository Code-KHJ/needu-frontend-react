import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Write.module.scss";
import TextEditor from "@/components/TextEditor";
import type { Editor } from "@toast-ui/react-editor";
import communityApi from "@/apis/community";
import Button from "@/components/elements/Button";
import { useUser } from "@/contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CommunityEditDto } from "@/interface/Community";
import { HookCallback } from "node_modules/@toast-ui/editor/types/editor";
import ico_ext from "@/assets/images/ico_ext.png";
import { useConfirm } from "@/contexts/ConfirmContext";

interface Topic {
  id: string;
  topic: string;
  description: string;
}

//@ts-ignore
const EditPost = ({ type }) => {
  const pathname = useLocation().pathname.split("/");
  const postId = parseFloat(pathname[pathname.length - 1]);
  //@ts-ignore
  const { user } = useUser();
  const { customConfirm } = useConfirm();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [values, setValues] = useState<CommunityEditDto>({
    id: 0,
    user_id: 0,
    title: "",
    markdown: "",
    html: "",
    topic_id: 0,
  });
  const [initialValue, setInitialValue] = useState<string>("");
  useEffect(() => {
    if (!postId) {
      navigate("/");
      return;
    }
    const getTopic = async () => {
      const response: any = await communityApi.getTopic(type);
      if (response.status === 200) {
        setTopics(response.data);
      }
    };
    const getPost = async (postId: number) => {
      const response: any = await communityApi.getPostForEdit(postId);
      if (response.status !== 200) {
        navigate("/");
      }
      if (type !== response.data.type) {
        alert("존재하지 않는 게시글입니다.");
        navigate("/");
      }

      setValues({
        ...values,
        id: response.data.post_id,
        user_id: response.data.user_id,
        title: response.data.title,
        topic_id: response.data.topic_id,
      });
      setInitialValue(response.data.content);
    };

    getTopic();
    getPost(postId);
  }, [user, postId]);

  const handleValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "topic_id") {
      setValues({
        ...values,
        [name]: parseFloat(value),
      });
      return;
    }
    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {
    handleEditor();
  }, [initialValue]);
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

      const response: any = await communityApi.uploadImage(formData);

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
    topic_id: false,
  });
  useEffect(() => {
    setValid({
      user_id: values.user_id > 0,
      title: values.title !== "",
      markdown: values.markdown !== "",
      html: values.html !== "",
      topic_id: values.topic_id > 0,
    });
  }, [values]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(valid).every((value) => value);
    setIsSubmitDisabled(!isSubmit);
  }, [values, valid]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmed = await customConfirm("게시물을 수정하시겠습니까?");
    if (confirmed) {
      const response: any = await communityApi.updatePost(values);
      if (response.status !== 200) {
        if (response.status === 400 && response.data.msg === "Invalid title") {
          alert(
            "제목에 부절절한 표현이 포함되어 있습니다. 수정 후 다시 시도해주세요."
          );
          return;
        }
        if (
          response.status === 400 &&
          response.data.msg === "Invalid content"
        ) {
          alert(
            "내용에 부절절한 표현이 포함되어 있습니다. 수정 후 다시 시도해주세요."
          );
          return;
        }
        alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      alert("게시글이 수정되었습니다.");
      if (type === 1) {
        navigate(`/community/free/${response.data.post.id}`);
      }
      if (type === 2) {
        navigate(`/community/question/${response.data.post.id}`);
      }
    }
  };
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.write_wrap}>
      <div className={styles.info}>
        <h1>{type === 1 ? "자유게시판" : type === 2 ? "질문&답변" : ""}</h1>
        <p className="body1">
          NEEDU 커뮤니티에서 지역과 기관을 넘는 집단지성을 경험해보세요.
        </p>
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
          <div className={styles.topic}>
            <h4>토픽</h4>
            <select
              name="topic_id"
              className={`${valid.topic_id ? styles.valid : ""}`}
              value={values.topic_id}
              onChange={handleValue}
            >
              <option value={0} disabled hidden>
                토픽을 선택해주세요.
              </option>
              {topics.map((topic) => (
                <option value={parseFloat(topic.id)} key={topic.id}>
                  {topic.topic} | {topic.description}
                </option>
              ))}
            </select>
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
                src={ico_ext}
                style={{
                  width: "17px",
                  verticalAlign: "bottom",
                  marginLeft: "10px",
                }}
              />
            </a>
          </div>
          {initialValue && (
            <TextEditor
              editorRef={editorRef}
              placeholder=" "
              initialValue={initialValue}
              handleImage={handleImage}
              onChange={handleEditor}
            />
          )}
        </div>
        <div className={styles.btn_wrap}>
          <button className={styles.cancel} onClick={handleCancel}>
            취소
          </button>
          <Button
            children="수정"
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

export default EditPost;
