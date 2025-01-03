import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { atom } from "jotai";

const excalidrawAtom = atom<ExcalidrawImperativeAPI | null>(null)

export default excalidrawAtom
