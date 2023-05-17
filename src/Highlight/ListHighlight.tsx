import { listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import HelmetLayout from "@/layouts/HelmetLayout";
import { useAuth } from "@/context/auth";
import { AppInterface } from "@/commons/interface/app";
import { ButtonCustom, InputCustom } from "@/components/form";
import Loading from "@/components/loader/Loading";
export function ListHighlight() {
  const { useAxios, api } = useAuth();
  const [{ data, loading, error: errorLoadCategory }, refetchCategory] = useAxios<{ data: AppInterface.HightLightWordQuery[] }>({ url: "/hightlightNews" }, { manual: true });
  const [{ data: dataPut, loading: loadingPut, error: errorPut }, refetchPut] = useAxios({ url: "/hightlightNews", method: "PUT" }, { manual: true, autoCancel: false });
  const setBreads = useSetRecoilState(listBreadCrumbAtom);
  useEffect(() => {
    setBreads([{ text: "News" }]);
    refetchCategory();
    return () => {};
  }, []);

  const [hightlights, setHighlights] = useState(data?.data || []);
  useEffect(() => {
    data?.data && setHighlights(data.data);
    return () => {};
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hightlights.map(async (h) => {
      await refetchPut({ data: h });
    });
  };
  return (
    <HelmetLayout title="Manage Highlight News">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Manage Highlight News</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <Loading />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="my-6 shadow rounded bg-white p-5 max-w-2xl mx-auto">
              {hightlights.map((v, i) => {
                return (
                  <InputCustom
                    key={i}
                    label={`Highligh ${1 + i}`}
                    onChange={(e) => {
                      const newHighlights = hightlights.map((h) => {
                        if (h.id == v.id) h.word_query = e.target.value;
                        return h;
                      });
                      setHighlights(newHighlights);
                    }}
                    value={v.word_query}
                  />
                );
              })}
              <div className="mt-4">
                <ButtonCustom disabled={loadingPut} type="submit" className="w-full">
                  Save Changes
                </ButtonCustom>
              </div>
            </form>
          )}
        </div>
      </div>
    </HelmetLayout>
  );
}
