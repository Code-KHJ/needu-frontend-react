import React, { useState } from 'react';
import ModalComponent from './Modal';

const ReportModal = () => {
  return (
    <ModalComponent title="신고" modalOpen={true} type="">
      <div>
        <div>
          <h4 style={{ cursor: 'pointer' }}>
            일반신고
            <img
              src="/src/assets/images/arrow_right.png"
              style={{ width: '8px', marginLeft: '8px' }}
            />
          </h4>
          <div style={{ marginTop: '20px', padding: '0 8px' }}>
            <p>
              게시글로 인해 불쾌감을 느껴 적절한 조치를 원하신다면 니쥬
              운영진에게 알려주세요.
            </p>
            <p style={{ color: '#aaa' }}>
              아래 사유들이 해당하며, 신고된 게시글은 운영진의 판단에 따라
              조치가 취해집니다.
            </p>
            <p style={{ color: '#aaa' }}>
              - 욕설/모욕/차별/비하적 발언, 광고/불법성 홍보, 사생활 침해, 사칭
              및 기타 부적절한 내용 등
            </p>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <h4 style={{ cursor: 'pointer' }}>
            권리침해 신고
            <img
              src="/src/assets/images/ico_ext.png"
              style={{
                width: '17px',
                marginLeft: '8px',
                verticalAlign: 'bottom',
              }}
            />
          </h4>
          <div style={{ marginTop: '20px', padding: '0 8px' }}>
            <p>
              게시글로 인해 사생활 침해/명예 훼손 및 저작권 침해를 받으셨다면,
              권리침해 신고를 해주세요.
            </p>
            <p style={{ color: '#aaa' }}>
              방송통신위원회에 신고하는 절차를 안내드리며, 방송통신위원회의 심의
              절차에 따라 처리됩니다.
            </p>
            <p style={{ color: '#aaa' }}>
              (구글 폼을 통해 접수, 캡처본 등 상세 서류 제출 필수)
            </p>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ReportModal;
