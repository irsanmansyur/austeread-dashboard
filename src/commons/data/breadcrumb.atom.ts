import { atom } from "recoil";
export interface ListBreadInterface {
  text: string;
  url?: string | null;
}
export const listBreadCrumbAtom = atom<ListBreadInterface[]>({
  key: "listBreadCrumbAtom",
  default: [], // default value (aka initial value)
});
