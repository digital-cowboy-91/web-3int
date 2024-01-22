import { ReactNode } from "react";
import { create } from "zustand";

export interface TModalConfig {
  node: ReactNode;
  show: boolean;
}

interface StoreModal {
  config: TModalConfig;
  hide: () => void;
  setConfig: (config: TModalConfig) => void;
}

export const useStoreModal = create<StoreModal>((set) => ({
  config: {
    node: undefined,
    show: false,
  },
  hide: () => set((s) => ({ config: { ...s.config, show: false } })),
  setConfig: (config) => set(() => ({ config })),
}));
