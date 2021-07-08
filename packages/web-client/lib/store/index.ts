import { baseURL, isDev } from '@/global';
import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';
import axios from 'redaxios';
import createStore from 'zustand';
import { combine, persist } from 'zustand/middleware';
import {
  GenerateAnonUUIDBody,
  GenerateAnonUUIDResponse,
  GenerateAuthenticatedUUIDBody,
  GenerateAuthenticatedUUIDResponse,
} from '../api-typings';
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
        uuidCode: '',
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

          const { refURL } = get();

          await axios
            .post(`${baseURL}/api/generateAnonUUID`, {
              ref_url: refURL,
            } as GenerateAnonUUIDBody)
            .then(async (res) => {
              set(() => ({ isFetching: false }));

              const { uuid_code } = res.data as GenerateAnonUUIDResponse;

              set(() => ({ uuidCode: uuid_code! }));
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

export const useUserDataStore = createStore(
  persist(
    combine(
      {
        username: '',
        uid: '',
        email: '',
      },
      (set) => ({
        setUsername: (username: string) => set(() => ({ username })),
        setUID: (uid: string) => set(() => ({ uid })),
        updateAll: (all: { [K in 'username' | 'uid' | 'email']?: string }) =>
          set((state) => ({
            username: all.username ?? state.username,
            email: all.email ?? state.email,
            uid: all.uid ?? state.uid,
          })),

        reset: () =>
          set(() => ({
            username: '',
            uid: '',
            email: '',
          })),
      })
    ),
    {
      name: 'user-store',
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

export const useURLDataStore = createStore(
  persist(
    combine(
      {
        selectedURLDataID: '',
      },
      (set) => ({
        setSelectedURLDataID: (id: string) =>
          set(() => ({ selectedURLDataID: id })),
        reset: () => set(() => ({ selectedURLDataID: '' })),
      })
    ),
    { name: 'url-data-store', getStorage: () => sessionStorage }
  )
);

export const useCreateLinkStore = createStore(
  persist(
    combine(
      {
        createLinkTitle: '',
        createLinkRefURL: '',
        createLinkExpire: undefined as number | undefined,
        currentNumberInput: 1,
        isRefURLValid: true,
        radioState: '1' as '1' | '2',
        enabled: true,
        isFetching: false,
        isError: false,
        generatedCode: '',
      },
      (set, get, api) => ({
        setCreateLinkTitle: (linkTitle: string) =>
          set(() => ({ createLinkTitle: linkTitle })),

        reset: () =>
          set(() => ({
            createLinkTitle: '',
            createLinkRefURL: '',
            createLinkExpire: undefined,
            isRefURLValid: true,
            radioState: '1',
            enabled: true,
            generatedCode: '',
          })),

        onTextBoxChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
          const refURL = e.target.value;

          if (!urlRegex.test(refURL)) {
            set(() => ({ isRefURLValid: false }));
            return;
          }

          set(() => ({ isRefURLValid: true, createLinkRefURL: refURL }));
        },

        radioOnChange: (val: '1' | '2') =>
          set(({ currentNumberInput }) => ({
            radioState: val,
            createLinkExpire: val === '1' ? undefined : currentNumberInput,
          })),

        onTitleChange: (e: ChangeEvent<HTMLInputElement>) =>
          set(() => ({ createLinkTitle: e.target.value })),

        onNumberInputChange: (_e: string, e2: number) =>
          set(() => ({
            currentNumberInput: e2,
            createLinkExpire: e2,
          })),

        toggleEnabled: (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          e.target.blur();
          set((state) => ({ enabled: !state.enabled }));
        },

        fetchUUID: async () => {
          set(() => ({ isFetching: true }));

          const {
            createLinkTitle,
            enabled,
            createLinkRefURL,
            createLinkExpire,
          } = get();

          const { uid } = useUserDataStore.getState();

          await axios
            .post(`${baseURL}/api/generateAuthenticatedUUID`, {
              uid,
              enabled,
              ref_url: createLinkRefURL,
              title: createLinkTitle,
              expire_at: createLinkExpire,
            } as GenerateAuthenticatedUUIDBody)
            .then((res) => {
              const { uuid_code } =
                res.data as GenerateAuthenticatedUUIDResponse;

              set(() => ({ generatedCode: uuid_code! }));
            })
            .catch((err) => {
              if (isDev) {
                console.log(err);
              }

              set(() => ({ isError: true }));

              setTimeout(() => {
                set(() => ({ isError: false }));
              }, 1000);
            });

          set(() => ({ isFetching: false }));
        },
      })
    ),
    {
      name: 'create-link-drawer',
      getStorage: () => sessionStorage,
    }
  )
);
