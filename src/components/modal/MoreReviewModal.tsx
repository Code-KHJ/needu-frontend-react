import ico_pen_blue from "@/assets/images/ico_pen_blue.png";
import ico_pen_green from "@/assets/images/ico_pen_green.png";
import ico_reply_blue from "@/assets/images/ico_reply_blue.png";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./Modal";
import styles from "./Modal.module.scss";

interface MoreReviewModalProps {
  modalOpen: boolean;
  closeModal: () => void;
}

const MoreReviewModal: React.FC<MoreReviewModalProps> = ({
  modalOpen,
  closeModal,
}) => {
  const navigate = useNavigate();

  return (
    <ModalComponent title="" modalOpen={modalOpen} closeModal={closeModal}>
      <div>
        <h3 style={{ textAlign: "center" }}>더 많은 리뷰를 보고 싶으신가요?</h3>
        <div style={{ marginTop: "8px", textAlign: "center" }}>
          <p>니쥬에 기여하시면</p>
          <p>
            <strong>모든 리뷰를 무제한</strong>으로 볼 수 있어요!
          </p>
        </div>
        <ul className={styles.more_review_action_ul}>
          <li
            style={{
              backgroundColor: "#eeefff",
              cursor: "pointer",
            }}
            onClick={() => navigate("/review/working/write")}
          >
            <div>
              <img src={ico_pen_blue} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <h4>전현직 리뷰 작성</h4>
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #6295f5",
                    borderRadius: "200px",
                    padding: "4px 16px",
                  }}
                >
                  <h4 style={{ color: "#6269f5" }}>1개 이상</h4>
                </div>
              </div>
              <p>사회복지기관/시설의 근무 경험을 공유해주세요</p>
            </div>
          </li>
          <li
            style={{
              backgroundColor: "rgba(65, 208, 37, 0.1)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/review/training/write")}
          >
            <div>
              <img src={ico_pen_green} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <h4>실습 리뷰 작성</h4>
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #41D025",
                    borderRadius: "200px",
                    padding: "4px 16px",
                  }}
                >
                  <h4 style={{ color: "#31A21A" }}>1개 이상</h4>
                </div>
              </div>
              <p>사회복지 현장실습 경험을 후배들과 나눠주세요</p>
            </div>
          </li>
          <li
            style={{
              backgroundColor: "rgba(160, 192, 255, 0.2)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/community")}
          >
            <div>
              <img src={ico_reply_blue} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <h4>커뮤니티 글 작성</h4>
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #8199d6",
                    borderRadius: "200px",
                    padding: "4px 16px",
                  }}
                >
                  <h4 style={{ color: "#8199d6" }}>1개 이상</h4>
                </div>
              </div>
              <p>사회복지 관련 정보나 궁금한 점을 자유롭게 올려보세요</p>
            </div>
          </li>
        </ul>
        <p style={{ marginTop: "30px", textAlign: "center" }}>
          원하는 방식을 선택해서 참여해보세요!
        </p>
      </div>
    </ModalComponent>
  );
};

export default MoreReviewModal;
