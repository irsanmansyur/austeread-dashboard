import { atom } from "recoil";
export interface ListBreadInterface {
  name: string;
  url?: string | null;
}
export const userAtom = atom<ListBreadInterface | null>({
  key: "userAtom",
  default: null, // default value (aka initial value)
});
