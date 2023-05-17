import { ListBreadInterface, listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";

type Props = React.HTMLAttributes<HTMLDivElement> & { title?: string; breads?: ListBreadInterface[] };
export default function HelmetLayout({ title = "Selamat datang", breads, children }: Props) {
  const setBreads = useSetRecoilState(listBreadCrumbAtom);
  useEffect(() => {
    breads && setBreads(breads);
    return () => {};
  }, [breads]);
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}
