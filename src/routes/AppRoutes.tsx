import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ProtectedRoute } from './ProtectedRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Login } from '@/features/auth/Login'
import { AdminDashboard } from '@/features/dashboard/AdminDashboard'
import { FounderDashboard } from '@/features/dashboard/FounderDashboard'
import { MentorDashboard } from '@/features/dashboard/MentorDashboard'
import { StubPage } from '@/components/ui/StubPage'

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={`/${user?.role}/dashboard`} replace />
            : <Login />
        }
      />

      {/* ─── Admin Routes ─── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="programs" element={
          <StubPage
            title="Incubation Programs"
            description="Create cohorts, configure application forms, and manage program timelines."
            phase="Phase 3 — Applications Pipeline"
          />
        } />
        <Route path="applications" element={
          <StubPage
            title="Application Evaluations"
            description="Review submitted startup applications, assign scores, and manage admission decisions."
            phase="Phase 3 — Applications Pipeline"
          />
        } />
        <Route path="mentors" element={
          <StubPage
            title="Mentor Directory"
            description="Browse, onboard mentors, and assign them to specific startups in your program."
            phase="Phase 4 — Mentorship"
          />
        } />
        <Route path="announcements" element={
          <StubPage
            title="Broadcast Announcements"
            description="Send targeted announcements to founders, mentors, or the entire cohort."
            phase="Phase 5 — Communications"
          />
        } />
      </Route>

      {/* ─── Founder Routes ─── */}
      <Route
        path="/founder"
        element={
          <ProtectedRoute allowedRole="founder">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/founder/dashboard" replace />} />
        <Route path="dashboard" element={<FounderDashboard />} />
        <Route path="profile" element={
          <StubPage
            title="Startup Profile"
            description="Manage your venture's public profile, team members, and key metrics."
            phase="Phase 2 — Profiles & Onboarding"
          />
        } />
        <Route path="milestones" element={
          <StubPage
            title="Milestone Kanban Board"
            description="Track your incubation sprint milestones with a visual Kanban board and upload completion proofs."
            phase="Phase 4 — Progress Tracking"
          />
        } />
        <Route path="meetings" element={
          <StubPage
            title="Meeting Scheduler"
            description="Browse your mentor's available office hours and schedule a session."
            phase="Phase 4 — Scheduling"
          />
        } />
        <Route path="documents" element={
          <StubPage
            title="Document Vault"
            description="Upload and manage pitch decks, certificates, financial plans, and incorporation docs."
            phase="Phase 5 — Document Management"
          />
        } />
      </Route>

      {/* ─── Mentor Routes ─── */}
      <Route
        path="/mentor"
        element={
          <ProtectedRoute allowedRole="mentor">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/mentor/dashboard" replace />} />
        <Route path="dashboard" element={<MentorDashboard />} />
        <Route path="startups" element={
          <StubPage
            title="Assigned Startups"
            description="View and interact with all startups currently under your mentorship guidance."
            phase="Phase 4 — Mentorship"
          />
        } />
        <Route path="availability" element={
          <StubPage
            title="Office Hours & Availability"
            description="Configure your weekly availability slots so founders can book sessions with you."
            phase="Phase 4 — Scheduling"
          />
        } />
      </Route>

      {/* ─── Wildcard redirect ─── */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? `/${user?.role}/dashboard` : '/login'} replace />}
      />
    </Routes>
  )
}

export default AppRoutes
