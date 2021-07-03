import createStore from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useModalData = createStore(
  persist(
    combine(
      {
        signInOnOpen: () => {},
      },
      (set, get) => ({
        setSignInOnOpen: (signInOnOpen: () => void) =>
          set(() => ({ signInOnOpen })),
      })
    ),
    { name: 'modal-store', getStorage: () => sessionStorage }
  )
);
