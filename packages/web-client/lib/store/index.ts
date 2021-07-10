import { baseURL, isDev } from '@/global';
import { ChangeEventHandler, MouseEventHandler } from 'react';
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
        selectedSingleURLDataID: '',
        selectedURLDataIDs: [] as string[],
      },
      (set) => ({
        setSelectedSingleURLDataID: (id: string) =>
          set(() => ({ selectedSingleURLDataID: id })),
        resetURLDataStore: () =>
          set(() => ({ selectedSingleURLDataID: '', selectedURLDataIDs: [] })),

        addDataID: (id: string) =>
          set(({ selectedURLDataIDs }) => ({
            selectedURLDataIDs: [...selectedURLDataIDs, id],
          })),

        removeDataID: (id: string) =>
          set(({ selectedURLDataIDs }) => ({
            selectedURLDataIDs: [...selectedURLDataIDs].filter(
              (selID) => selID !== id
            ),
          })),
      })
    ),
    { name: 'url-data-store', getStorage: () => sessionStorage }
  )
);

export const useCreateLinkStore = createStore(
  persist(
    combine(
      {
        generatedCode: '',
      },
      (set) => ({
        reset: () =>
          set(() => ({
            generatedCode: '',
          })),

        setGeneratedCode: (code: string) => set({ generatedCode: code }),

        fetchUUID: async (
          refURL: string,
          enabled: boolean,
          title?: string,
          expireAt?: number
        ) => {
          const { uid } = useUserDataStore.getState();

          await axios
            .post(`${baseURL}/api/generateAuthenticatedUUID`, {
              uid,
              enabled,
              ref_url: refURL,
              title: title || title === '' ? 'No Title' : title,
              expire_at: expireAt,
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
            });
        },
      })
    ),
    {
      name: 'create-link-drawer',
      getStorage: () => sessionStorage,
    }
  )
);

export const useDeleteStore = createStore(
  combine(
    {
      itemID: '',
    },
    (set) => ({
      setItemID: (itemID: string) => set({ itemID }),
    })
  )
);

export const useBulkActionStore = createStore(
  combine(
    {
      operation: undefined as 'delete' | 'enable' | 'disable' | undefined,
    },
    (set) => ({
      setBulkOperation: (operation?: 'delete' | 'enable' | 'disable') =>
        set({ operation }),
    })
  )
);
