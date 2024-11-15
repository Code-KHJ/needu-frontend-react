import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";

const dompurify = (html: string | undefined) => {
  if (!html) return "";

  const linkOptions = {
    defaultProtocol: "https",
    target: "_blank",
  };
  const autolinked = linkifyHtml(html, linkOptions);
  const formattedText = autolinked.replace(/\n/g, "<br>");
  const result = DOMPurify.sanitize(formattedText, {
    ADD_ATTR: ["target"], // target 속성을 허용
  });
  return result;
};

const extractTextFromHTML = (html: string | undefined) => {
  const sanitizedHtml = dompurify(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHtml, "text/html");
  return doc.body.textContent || "";
};

export { dompurify, extractTextFromHTML };
