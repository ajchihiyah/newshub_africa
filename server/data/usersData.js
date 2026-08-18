// NewsHub Africa - Editorial & Writer Credentials Store
import crypto from 'crypto';

export const USERS = [
  {
    id: "usr_admin_01",
    email: "admin@newshub-africa.com",
    aliases: ["admin", "aj.chihiyah@gmail.com", "ashley@newshub-africa.com"],
    password: "Admin@NewsHub2026!",
    fallbackPassword: "admin",
    name: "Ashley Jordan Chihiya",
    role: "admin",
    title: "Editor-in-Chief & Lead Pan-African Director",
    department: "Executive Editorial Board",
    avatar: "/Ashley Jordan Chihiya.jpg",
    bio: "Chief editorial executive overseeing pan-African intelligence, cross-border trade, macroeconomic bourses, and continental news distribution.",
    permissions: [
      "write_articles",
      "upload_articles",
      "edit_articles",
      "delete_articles",
      "manage_events",
      "manage_site_settings",
      "full_admin"
    ]
  },
  {
    id: "usr_writer_01",
    email: "writer1@newshub-africa.com",
    aliases: ["writer1", "writer1@newshub.africa"],
    password: "Writer1@2026!",
    fallbackPassword: "writer1",
    name: "Writer 1",
    role: "writer",
    title: "Staff Writer",
    department: "Editorial Newsroom",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Staff Writer account ready for custom configuration.",
    permissions: [
      "write_articles",
      "upload_articles"
    ]
  },
  {
    id: "usr_writer_02",
    email: "writer2@newshub-africa.com",
    aliases: ["writer2", "writer2@newshub.africa"],
    password: "Writer2@2026!",
    fallbackPassword: "writer2",
    name: "Writer 2",
    role: "writer",
    title: "Staff Writer",
    department: "Editorial Newsroom",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Staff Writer account ready for custom configuration.",
    permissions: [
      "write_articles",
      "upload_articles"
    ]
  },
  {
    id: "usr_writer_03",
    email: "writer3@newshub-africa.com",
    aliases: ["writer3", "writer3@newshub.africa"],
    password: "Writer3@2026!",
    fallbackPassword: "writer3",
    name: "Writer 3",
    role: "writer",
    title: "Staff Writer",
    department: "Editorial Newsroom",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    bio: "Staff Writer account ready for custom configuration.",
    permissions: [
      "write_articles",
      "upload_articles"
    ]
  }
];

// Active sessions in-memory map (token -> user payload)
export const activeSessions = new Map();

// Helper to authenticate user
export function authenticateUser(identifier, password) {
  if (!identifier || !password) return null;
  const cleanId = identifier.trim().toLowerCase();
  const cleanPw = password.trim();

  const user = USERS.find(u =>
    u.email.toLowerCase() === cleanId ||
    u.aliases.some(a => a.toLowerCase() === cleanId)
  );

  if (!user) return null;

  if (user.password === cleanPw || user.fallbackPassword === cleanPw) {
    const token = `nh_sess_${crypto.randomBytes(24).toString('hex')}`;
    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      title: user.title,
      department: user.department,
      avatar: user.avatar,
      permissions: user.permissions,
      token,
      loginAt: new Date().toISOString()
    };
    activeSessions.set(token, sessionUser);
    return sessionUser;
  }

  return null;
}

// Validate session token
export function validateSession(token) {
  if (!token) return null;
  return activeSessions.get(token) || null;
}

// Destroy session
export function invalidateSession(token) {
  if (!token) return false;
  return activeSessions.delete(token);
}
