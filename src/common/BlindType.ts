export const BlindType = [
  { index: 1, type: '정상', reason: '정상', comment: '' },
  {
    index: 2,
    type: '임시 중지',
    reason: '일반 신고',
    comment: `
    <li style="list-style: disc;">
      사용자 신고 절차에 따라 임시 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
  },
  {
    index: 3,
    type: '임시 중지',
    reason: '권리 침해 신고',
    comment: `
    <li style="list-style: disc;">
      권리침해신고 절차에 따라 정보통신망법에 의거하여 임시 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      방송통신위원회의 최종 판단 전까지 게시 중단 처리가 됩니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>
  `,
  },
  {
    index: 4,
    type: '임시 중지',
    reason: '운영 정책 위반',
    comment: `
    <li style="list-style: disc;">
      NEEDU 운영 정책에 의거하여 임시 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>
  `,
  },
  {
    index: 5,
    type: '영구 중지',
    reason: '일반 신고',
    comment: `
    <li style="list-style: disc;">
      사용자 신고 절차에 따라 영구 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>
  `,
  },
  {
    index: 6,
    type: '영구 중지',
    reason: '권리 침해 신고',
    comment: `
    <li style="list-style: disc;">
      권리침해신고 절차에 따라 정보통신망법에 의거하여 영구 게시 중단
      처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>`,
  },
  {
    index: 7,
    type: '영구 중지',
    reason: '운영 정책 위반',
    comment: `
    <li style="list-style: disc;">
      NEEDU 운영 정책에 의거하여 영구 게시 중단 처리된 게시물입니다.
    </li>
    <li style="list-style: disc;">
      제3자의 권리 침해를 예방하고 회원님을 법적 분쟁으로부터 보호하기
      위한 조치인 점 양해 부탁드립니다.
    </li>
  `,
  },
];
