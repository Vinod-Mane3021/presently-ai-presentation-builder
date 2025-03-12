import { Slide } from "@/types/slides";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SlideState = {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
};

export const useSlideStore = create<SlideState>()(
  persist(
    (set) => ({
      slides: [],
      setSlides: (slides) => set({ slides }),
    }),
    {
      name: "slides-storage",
      partialize: ({ slides }) => ({ slides }),
    }
  )
);
