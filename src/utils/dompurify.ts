import DOMPurify from "dompurify";

const dompurify = (html: string) => {
  const result = DOMPurify.sanitize(html);
  return result;
};

const extractTextFromHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(dompurify(html), "text/html");
  return doc.body.textContent || "";
};

export { dompurify, extractTextFromHTML };
