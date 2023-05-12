import React from "react";
import { Helmet } from "react-helmet";

type Props = React.HTMLAttributes<HTMLDivElement> & { title?: string };
export default function HelmetLayout({ title = "Selamat datang", children }: Props) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}
