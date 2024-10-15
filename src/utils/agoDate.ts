const agoDate = (date: Date) => {
  const today = new Date();
  const then = new Date(date);
  then.setHours(then.getHours() + 9);

  const diffInMinutes = Math.floor((today.getTime() - then.getTime()) / 60000);
  if (diffInMinutes < 1) {
    return `방금 전`;
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
};

export default agoDate;
