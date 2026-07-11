/**
 * authStore.ts
 *
 * Mock authentication store using Zustand.
 * All credential validation and session state is handled here.
 *
 * FUTURE MIGRATION:
 * Replace `loginWithCredentials` with a real API call:
 *   const res = await fetch('/api/v1/auth/login', { method: 'POST', body: ... })
 *   const { user, access_token } = await res.json()
 *   set({ user, isAuthenticated: true })
 *
 * The AuthState interface and UserProfile shape are designed to be
 * fully compatible with the planned FastAPI + PostgreSQL backend.
 */

import { create } from 'zustand'

// ─── Types ──────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'founder' | 'mentor'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatarInitials: string
  startupName?: string
  designation?: string
}

export interface AuthResult {
  success: boolean
  error?: string
}

// ─── Mock Credential Registry ────────────────────────────────────────────────
// FUTURE: Remove this and replace loginWithCredentials() with a real API call.

interface MockCredential {
  password: string
  profile: UserProfile
}

export const DEMO_ACCOUNTS = [
  {
    role: 'admin' as UserRole,
    email: 'admin@incubix.com',
    password: 'Admin@123',
    name: 'Marcus Vance',
    designation: 'Program Director',
  },
  {
    role: 'founder' as UserRole,
    email: 'founder@incubix.com',
    password: 'Founder@123',
    name: 'Alex Rivera',
    designation: 'CEO & Co-Founder, AeroLabs',
  },
  {
    role: 'mentor' as UserRole,
    email: 'mentor@incubix.com',
    password: 'Mentor@123',
    name: 'Dr. Sarah Chen',
    designation: 'Senior Advisor & Mentor',
  },
]

const MOCK_CREDENTIALS: Record<string, MockCredential> = {
  'admin@incubix.com': {
    password: 'Admin@123',
    profile: {
      id: 'usr_admin_001',
      name: 'Marcus Vance',
      email: 'admin@incubix.com',
      role: 'admin',
      avatarInitials: 'MV',
      designation: 'Program Director',
    },
  },
  'founder@incubix.com': {
    password: 'Founder@123',
    profile: {
      id: 'usr_founder_001',
      name: 'Alex Rivera',
      email: 'founder@incubix.com',
      role: 'founder',
      avatarInitials: 'AR',
      startupName: 'AeroLabs Technologies',
      designation: 'CEO & Co-Founder',
    },
  },
  'mentor@incubix.com': {
    password: 'Mentor@123',
    profile: {
      id: 'usr_mentor_001',
      name: 'Dr. Sarah Chen',
      email: 'mentor@incubix.com',
      role: 'mentor',
      avatarInitials: 'SC',
      designation: 'Senior Advisor & Mentor',
    },
  },
}

// ─── Auth Store ──────────────────────────────────────────────────────────────

interface AuthState {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  /**
   * Validates credentials against mock data.
   * FUTURE: Replace with POST /api/v1/auth/login
   */
  loginWithCredentials: (email: string, password: string) => Promise<AuthResult>
  /**
   * Direct role-based login for quick demo access (bypasses credential check).
   */
  loginAsRole: (role: UserRole) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  loginWithCredentials: async (email: string, password: string): Promise<AuthResult> => {
    set({ isLoading: true })

    // Simulate a realistic network delay (replace with real fetch in production)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const normalizedEmail = email.trim().toLowerCase()
    const record = MOCK_CREDENTIALS[normalizedEmail]

    if (!record) {
      set({ isLoading: false })
      return { success: false, error: 'No account found with this email address.' }
    }

    if (record.password !== password) {
      set({ isLoading: false })
      return { success: false, error: 'Incorrect password. Please try again.' }
    }

    set({ user: record.profile, isAuthenticated: true, isLoading: false })
    return { success: true }
  },

  loginAsRole: (role: UserRole) => {
    const emailMap: Record<UserRole, string> = {
      admin: 'admin@incubix.com',
      founder: 'founder@incubix.com',
      mentor: 'mentor@incubix.com',
    }
    const record = MOCK_CREDENTIALS[emailMap[role]]
    if (record) {
      set({ user: record.profile, isAuthenticated: true })
    }
  },

  logout: () => set({ user: null, isAuthenticated: false }),
}))
