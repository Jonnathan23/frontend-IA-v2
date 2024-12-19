import { create } from "zustand";
import { createPredictionSlice, PredictionSliceType } from "./predictionSlice";
import { devtools } from "zustand/middleware";

export const useAppStore = create<PredictionSliceType>()(devtools((...a) => ({
    ...createPredictionSlice(...a),
})))