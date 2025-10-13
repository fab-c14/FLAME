import { useSelector } from 'react-redux';

export default function useUserRole() {
  const raw = useSelector((s) => s.auth?.user);

  // Sometimes the token-decoded payload is nested { user: { ... } }
  const user = raw && raw.user ? raw.user : raw || null;

  const roleRaw =
    user?.role || user?.userType || user?.type || (user && user.payload && user.payload.role) || '';
  const role = String(roleRaw || '').toLowerCase();

  return {
    user,
    role,
    isStudent: role === 'student',
    isTeacher: role === 'teacher' || role === 'instructor' || role === 'admin',
  };
}
