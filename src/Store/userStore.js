import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  fetchUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
} from '../api/useApi'

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      loading: false,
      error: null,

      fetchUsers: async () => {
        set({ loading: true })
        try {
          const data = await fetchUsersApi()
          set({ users: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },

      addUser: async (user) => {
        const newUser = await addUserApi(user)
        set((state) => ({ users: [...state.users, newUser] }))
      },

      updateUser: async (id, updatedUser) => {
        const user = await updateUserApi(id, updatedUser)
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? user : u)),
        }))
      },

      deleteUser: async (id) => {
        await deleteUserApi(id)
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }))
      },
    }),
    {
      name: 'user-storage', // key in localStorage
      getStorage: () => localStorage,
    }
  )
)
