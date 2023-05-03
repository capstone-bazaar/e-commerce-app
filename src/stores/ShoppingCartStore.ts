import { create } from 'zustand';

interface CartState {
  itemCount: number;
  addItem: () => void;
  removeItem: () => void;
  initializeItemCount: (count: number) => void;
}

const useShoppingCartStore = create<CartState>()((set) => ({
  itemCount: 0,
  addItem: () => set((state) => ({ itemCount: state.itemCount + 1 })),
  removeItem: () => set((state) => ({ itemCount: state.itemCount - 1 })),
  initializeItemCount: (count: number) => set(() => ({ itemCount: count })),
}));

export default useShoppingCartStore;
