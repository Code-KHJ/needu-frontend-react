import { HashtagList } from '@/common/HashtagList';

export default function Hashtag(hashtagArray: Array<number>) {
  const hashtagList = HashtagList.working;

  const hashtagItem = hashtagArray.map((item) => {
    return hashtagList.find((hashtag) => hashtag.no === item).content;
  });

  return hashtagItem;
}
