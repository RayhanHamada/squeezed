import { baseURL, isDev } from '@/global';
import {
  GenerateAnonUUIDBody,
  GenerateAnonUUIDResponse,
  GenerateAuthenticatedUUIDBody,
  GenerateAuthenticatedUUIDResponse,
  UpdateUsernameBody,
} from '@/lib/api-typings';
import { fb } from '@/lib/firebase-client';
import { urlRegex } from '@/lib/utils';
import { ChangeEventHandler } from 'react';
import axios from 'redaxios';
import createStore from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

export const useTryItStore = createStore(
  persist(
    combine({}, (set) => ({
      fetchAnonURL: async (refURL: string) => {
        return await axios
          .post<GenerateAnonUUIDResponse>(`${baseURL}/api/generateAnonUUID`, {
            ref_url: refURL,
          } as GenerateAnonUUIDBody)
          .then(async (res) => {
            const { uuid_code: uuidCode } = res.data;
            return uuidCode;
          })
          .catch((err) => {
            if (isDev) {
              console.log(err);
            }
          });
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
    })),
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
      (set, get) => ({
        setUsername: (username: string) => set(() => ({ username })),
        setUID: (uid: string) => set(() => ({ uid })),
        updateAll: (all: { [K in 'username' | 'uid' | 'email']?: string }) =>
          set((state) => ({
            username: all.username ?? state.username,
            email: all.email ?? state.email,
            uid: all.uid ?? state.uid,
          })),

        updateUsername: async (username: string) => {
          const uid = get().uid;
          await axios
            .post(`${baseURL}/api/updateUsername`, {
              username,
              uid,
            } as UpdateUsernameBody)
            .then(() => {
              set(() => ({ username }));
            })
            .catch((err) => {
              if (isDev) {
                console.error(err);
              }
            });
        },

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
              title: !title || title === '' ? 'No Title' : title,
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

export const useEditLinkStore = createStore(
  devtools(
    combine(
      {
        currentURLID: '',
      },
      (set) => ({
        setCurrentURLID: (id: string) => set({ currentURLID: id }),
        reset: () => set({ currentURLID: '' }),
      })
    ),
    'edit-link-store'
  )
);

export const usePasswordChangeStore = createStore(
  devtools(
    combine(
      {
        resetRequestEnabled: true,
      },
      (set) => ({
        disableSendResetCodeTemporary() {
          set({ resetRequestEnabled: false });

          const time = 30000;

          setTimeout(() => {
            set({ resetRequestEnabled: true });
          }, time);
        },

        async sendPasswordChangeRequest() {
          const { email } = useUserDataStore.getState();
          let success = false;
          await fb
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              success = true;
            })
            .catch((err) => {
              if (isDev) {
                console.error(err);
              }
              success = false;
            });

          return success;
        },
      })
    )
  )
);
