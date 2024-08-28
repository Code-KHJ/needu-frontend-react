const stripHtml = (html: string | undefined | null) => {
  if (!html) {
    return "";
  }
  const noTags = html.replace(/<[^>]*>?/gm, "");
  const noEntities = noTags.replace(/&[^;]+;/gm, "");
  return noEntities;
};

export default stripHtml;
