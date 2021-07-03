import createStore from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useModalData = createStore(
  persist(
    combine(
      {
        signInOnOpen: () => {},
        signUpOnOpen: () => {},
        isSignInOpen: false,
        isSignUpOpen: false,
      },
      (set) => ({
        setSignInOnOpen: (signInOnOpen: () => void) =>
          set(() => ({ signInOnOpen })),

        setSignUpOnOpen: (signUpOnOpen: () => void) =>
          set(() => ({ signUpOnOpen })),

        toggleSignUp: () =>
          set(({ isSignUpOpen }) => ({ isSignUpOpen: !isSignUpOpen })),

        toggleSignIn: () =>
          set(({ isSignInOpen }) => ({ isSignInOpen: !isSignInOpen })),
      })
    ),
    { name: 'modal-store', getStorage: () => sessionStorage }
  )
);
