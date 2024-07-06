import { BlindType } from '@/common/BlindType';
import React from 'react';

interface BlindCommentProps {
  type: number;
}

const BlindComment: React.FC<BlindCommentProps> = ({ type }) => {
  const blindType = BlindType;

  const comments = [
    '', //정상
    '', //정상
    // 일반신고 임시중지
    `<li style="list-style: disc;">
      사용자 신고 절차에 따라 임시 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
    //권리침해신고 임시중지
    `<li style="list-style: disc;">
      권리침해신고 절차에 따라 정보통신망법에 의거하여 임시 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      방송통신위원회의 최종 판단 전까지 게시 중단 처리가 됩니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
    //운영진 결정 임시중지
    `<li style="list-style: disc;">
      NEEDU 운영 정책에 의거하여 임시 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
    // 일반신고 영구중지
    `<li style="list-style: disc;">
      사용자 신고 절차에 따라 영구 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
    //권리침해신고 영구중지
    `<li style="list-style: disc;">
      권리침해신고 절차에 따라 정보통신망법에 의거하여 영구 게시 중단
      처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
    //운영진 결정 영구중지
    `<li style="list-style: disc;">
      NEEDU 운영 정책에 의거하여 영구 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
  ];
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div
      style={{
        background: '#d9d9d9',
        border: '1px solid #d9d9d9',
        borderRadius: '5px',
        padding: '20px',
      }}
    >
      <h5 style={{ textAlign: 'center' }}>게시가 중단된 리뷰입니다.</h5>
      <div style={{ marginTop: '40px' }}>
        <span>
          <h5 style={{ display: 'inline', marginRight: '8px' }}>
            게시 중단 사유
          </h5>
          {blindType.find((item) => item.index === type)?.reason}로 인한 게시
          중단
        </span>
        <ul
          style={{
            marginTop: '8px',
            paddingLeft: '20px',
            listStyleType: 'disc',
          }}
        >
          <li
            dangerouslySetInnerHTML={createMarkup(
              blindType.find((item) => item.index === type)?.comment
            )}
          ></li>

          {/* {comment[type]} */}
        </ul>
      </div>
    </div>
  );
};

export default BlindComment;
