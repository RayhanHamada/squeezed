import { baseURL, isDev } from '@/global';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import axios from 'redaxios';
import createStore from 'zustand';
import { combine, persist } from 'zustand/middleware';
import { urlRegex } from '../utils';

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

export const useTryItStore = createStore(
  persist(
    combine(
      {
        refURL: '',
        shortenedURL: '',
        isRefURLValid: true,
        isFetching: false,
        isError: false,
        errorMsg: '',
        expanded: false,
      },
      (set, get) => ({
        toggleExpanded: (
          e: Parameters<MouseEventHandler<HTMLButtonElement>>[0]
        ) => {
          e.preventDefault();
          set((state) => ({ expanded: !state.expanded }));
        },

        fetchAnonURL: async () => {
          set(() => ({ isFetching: true }));

          const realURL = get().refURL;

          await axios
            .post(`${baseURL}/api/generateAnonUUID`, {
              url: realURL,
            })
            .then(async (res) => {
              set(() => ({ isFetching: false }));

              const json = res.data;
              console.log(json);
              const uuidCode = json.uuid_code as string;
              set(() => ({ shortenedURL: `sqzd.xyz/${uuidCode}` }));
            })
            .catch((err) => {
              if (isDev) {
                console.log(err);
              }
              set(() => ({ isFetching: false, isError: true }));
            });

          if (get().isError) {
            setTimeout(() => {
              set(() => ({ isError: false }));
            }, 1000);
          }
        },

        onTextBoxChange: (
          e: Parameters<ChangeEventHandler<HTMLTextAreaElement>>[0]
        ) => {
          const refURL = e.target.value;

          if (!urlRegex.test(refURL)) {
            set(() => ({ isRefURLValid: false }));
            return;
          }

          set(() => ({ isRefURLValid: true, refURL: refURL }));
        },
      })
    ),
    {
      name: 'try-it-store',
      getStorage: () => sessionStorage,
    }
  )
);

export const useSignUpStore = createStore(
  combine(
    {
      isLoading: false,
      isError: false,
      loadingMsg: '',
    },
    (set) => ({
      goSignUp: async (username: string, email: string, password: string) => {
        set(() => ({ isLoading: true, loadingMsg: 'Please wait...' }));

        await axios
          .post(`${baseURL}/api/createUser`, {
            username,
            email,
            password,
          })
          .then(() => {
            set(() => ({
              loadingMsg: 'Success creating user',
            }));

            setTimeout(() => {
              set(() => ({ isLoading: false, loadingMsg: '' }));
            }, 3000);
          })
          .catch((err) => {
            if (isDev) {
              console.log(err);
            }

            set(() => ({ isError: true, loadingMsg: 'Failed creating user' }));

            setTimeout(() => {
              set(() => ({ isLoading: false, isError: false, loadingMsg: '' }));
            }, 3000);
          });
      },
    })
  )
);
