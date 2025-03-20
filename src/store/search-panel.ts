import {create} from "zustand"

interface SearchPanel {
    isOpen: boolean
    setSearchPanelStatus: (props: boolean) => void 
}

export const useSearchPanelStore = create<SearchPanel>((set) => ({
    isOpen: false,
    setSearchPanelStatus: (props: boolean) => set((state) => ({ isOpen: props })),
}))