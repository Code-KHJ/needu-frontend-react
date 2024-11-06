import React from "react";
import { Helmet } from "react-helmet-async";

interface HelmetProps {
  title: string | null;
  description: string;
}
const helmets: React.FC<HelmetProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title || "사회복지 커뮤니티, NEEDU"}</title>
      <meta property="og:title" content={title || "사회복지 커뮤니티, NEEDU"} />
      <meta
        name="twitter:title"
        content={title || "사회복지 커뮤니티, NEEDU"}
      />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default helmets;
