"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Globe,
  Tags,
  Info,
  Building2,
  Home,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/about", label: "About Us", icon: Info },
  { href: "/admin/trusted-companies", label: "Trusted Companies", icon: Building2 },
  { href: "/admin/content", label: "Page Content", icon: Settings },
];

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#0072BB] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          title={collapsed ? "View Site" : undefined}
        >
          <Globe className="w-5 h-5 shrink-0" />
          {!collapsed && <span>View Site</span>}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-64"
        } hidden lg:flex bg-[#0a0a0a] border-r border-white/10 min-h-screen flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-bold text-white truncate">Flaminco</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        </div>
        <NavList collapsed={collapsed} />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4">
        <h2 className="text-base font-bold text-white">Flaminco Admin</h2>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-300 hover:text-white transition-colors p-2"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[#0a0a0a] border-r border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white truncate">Flaminco</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <NavList collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
