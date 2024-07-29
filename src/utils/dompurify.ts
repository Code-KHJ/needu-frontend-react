import DOMPurify from "dompurify";

const dompurify = (html: string) => {
  const result = DOMPurify.sanitize(html);
  return result;
};

export default dompurify;
