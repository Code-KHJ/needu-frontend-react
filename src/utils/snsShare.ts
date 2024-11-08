const fbShare = (url: string) => {
  return window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "페이스북 공유하기"
  );
};

const xShare = (url: string) => {
  const text = "X 공유하기";
  return window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "페이스북 공유하기"
  );
};

const kakaoShare = (title: string, url: string) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY);
    }

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        imageUrl:
          "https://github.com/Code-KHJ/needu-frontend-react/blob/main/src/assets/images/img_share_kakao.jpeg?raw=true",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      // social: {
      //   likeCount: likeCnt,
      //   commentCount: commentCnt,
      // },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
};

const copyClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    alert("클립보드에 링크가 복사되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

export { copyClipboard, fbShare, kakaoShare, xShare };
