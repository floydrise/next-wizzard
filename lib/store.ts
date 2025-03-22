import { atom, createStore } from "jotai";

export const scoreAtom = atom(0);
export const levelAtom = atom("lvl1");
export const store = createStore();