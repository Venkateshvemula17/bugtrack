import { useMemo, useState } from "react";
import {
  Activity, AlertCircle, ArrowDown, ArrowUp, Bell, Bug, CheckCircle2,
  ChevronDown, CircleHelp, Clock3, Filter, LayoutDashboard, LogOut,
  Menu, Plus, Search, Settings, ShieldCheck, SlidersHorizontal, Sparkles,
  Users, X, Zap
} from "lucide-react";

const initialBugs = [
  { id: "BUG-1042", title: "Login button stays disabled after valid input", project: "Web App", severity: "Critical", status: "Open", assignee: "VK", color: "violet", updated: "12 min ago" },
  { id: "BUG-1041", title: "Dashboard chart overflows on small screens", project: "Dashboard", severity: "High", status: "In Progress", assignee: "AM", color: "blue", updated: "38 min ago" },
  { id: "BUG-1040", title: "Password reset email link expires too early", project: "Authentication", severity: "High", status: "Open", assignee: "SR", color: "rose", updated: "1 hour ago" },
  { id: "BUG-1039", title: "Search results do not update after clearing filters", project: "Web App", severity: "Medium", status: "In Progress", assignee: "VK", color: "violet", updated: "2 hours ago" },
  { id: "BUG-1038", title: "Incorrect date format in activity history", project: "Dashboard", severity: "Low", status: "Resolved", assignee: "JD", color: "amber", updated: "Yesterday" },
  { id: "BUG-1037", title: "Profile avatar missing fallback image", project: "Settings", severity: "Low", status: "Resolved", assignee: "AM", color: "blue", updated: "Yesterday" },
];

const severityStyles = {
  Critical: "severity-critical",
  High: "severity-high",
  Medium: "severity-medium",
  Low: "severity-low",
};
const statusStyles = {
  Open: "status-open",
  "In Progress": "status-progress",
  Resolved: "status-resolved",
};

function App() {
  const [bugs, setBugs] = useState(initialBugs);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All issues");
  const [showCreate, setShowCreate] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [form, setForm] = useState({ title: "", project: "Web App", severity: "Medium", description: "" });
  const [notice, setNotice] = useState("");

  const filteredBugs = useMemo(() => bugs.filter((bug) => {
    const matchesQuery = [bug.id, bug.title, bug.project, bug.assignee].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All issues" || bug.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [bugs, query, statusFilter]);

  const counts = {
    open: bugs.filter((b) => b.status === "Open").length,
    progress: bugs.filter((b) => b.status === "In Progress").length,
    resolved: bugs.filter((b) => b.status === "Resolved").length,
    critical: bugs.filter((b) => b.severity === "Critical" && b.status !== "Resolved").length,
  };

  function createBug(event) {
    event.preventDefault();
    if (!form.title.trim()) return;
    const nextNumber = Math.max(1042, ...bugs.map((b) => Number(b.id.replace("BUG-", "")) || 0)) + 1;
    setBugs([{ id: `BUG-${nextNumber}`, title: form.title.trim(), project: form.project, severity: form.severity, status: "Open", assignee: "VK", color: "violet", updated: "Just now" }, ...bugs]);
    setForm({ title: "", project: "Web App", severity: "Medium", description: "" });
    setShowCreate(false);
    setNotice("Issue created in this preview. Connect Supabase to save it permanently.");
    window.setTimeout(() => setNotice(""), 4500);
  }

  function cycleStatus(id) {
    const order = ["Open", "In Progress", "Resolved"];
    setBugs((current) => current.map((bug) => bug.id === id
      ? { ...bug, status: order[(order.indexOf(bug.status) + 1) % order.length], updated: "Just now" }
      : bug));
    setNotice("Status updated in this preview. Connect Supabase to persist changes.");
    window.setTimeout(() => setNotice(""), 4500);
  }

  return (
    <div className="app-shell">
      {mobileNav && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Bug size={20} strokeWidth={2.4} /></div>
          <span className="brand-name">bugtrack<span>.</span></span>
          <button className="icon-button sidebar-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <button className="workspace-switch">
          <div className="workspace-avatar">A</div>
          <div className="workspace-copy"><strong>Acme Studio</strong><span>Free workspace</span></div>
          <ChevronDown size={15} className="muted-icon" />
        </button>
        <div className="nav-label">WORKSPACE</div>
        <nav className="nav-list">
          <button className="nav-item active"><LayoutDashboard size={17} /><span>Overview</span></button>
          <button className="nav-item" onClick={() => setStatusFilter("All issues")}><Bug size={17} /><span>All issues</span><span className="nav-count">{bugs.length}</span></button>
          <button className="nav-item" onClick={() => setStatusFilter("Open")}><AlertCircle size={17} /><span>Open issues</span><span className="nav-count">{counts.open}</span></button>
          <button className="nav-item" onClick={() => setStatusFilter("In Progress")}><Clock3 size={17} /><span>In progress</span></button>
          <button className="nav-item" onClick={() => setStatusFilter("Resolved")}><CheckCircle2 size={17} /><span>Resolved</span></button>
        </nav>
        <div className="nav-label projects-label">PROJECTS <button aria-label="Add project" className="tiny-icon"><Plus size={14} /></button></div>
        <button className="project-item"><span className="project-dot dot-purple" />Web App <span className="project-number">8</span></button>
        <button className="project-item"><span className="project-dot dot-blue" />Dashboard <span className="project-number">5</span></button>
        <button className="project-item"><span className="project-dot dot-orange" />Authentication <span className="project-number">3</span></button>
        <div className="sidebar-bottom">
          <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16} /></div><strong>Ship better software</strong><p>Keep every issue organized and your team moving.</p><button onClick={() => setNotice("Team collaboration will be available after authentication is added.")}>Explore workspace <span>↗</span></button></div>
          <button className="nav-item"><Settings size={17} /><span>Settings</span></button>
          <div className="profile-row"><div className="profile-avatar">VK</div><div className="profile-copy"><strong>Venkatesh</strong><span>Project admin · Preview</span></div><button className="icon-button" aria-label="Profile menu"><LogOut size={16} /></button></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <div className="status-indicator"><span /> All systems operational</div>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up.")}><Bell size={18} /><i /></button>
            <div className="top-avatar">VK</div>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><div className="eyebrow"><Zap size={13} /> PROJECT HEALTH</div><h1>Issue overview</h1><p>Track bugs, prioritize fixes, and keep your releases on course.</p></div>
            <button className="primary-button" onClick={() => setShowCreate(true)}><Plus size={17} /> Create issue</button>
          </div>

          <section className="stats-grid" aria-label="Issue statistics">
            <article className="stat-card"><div className="stat-top"><span>Total issues</span><div className="stat-icon purple"><Bug size={17} /></div></div><div className="stat-value">{bugs.length}<span className="stat-change neutral">in workspace</span></div><div className="stat-foot"><span className="mini-track"><i style={{ width: "78%" }} /></span><span>All projects</span></div></article>
            <article className="stat-card"><div className="stat-top"><span>Open issues</span><div className="stat-icon red"><AlertCircle size={17} /></div></div><div className="stat-value">{counts.open}<span className="stat-change danger"><ArrowUp size={13} /> Needs attention</span></div><div className="stat-foot"><span className="stat-dot red-dot" />Awaiting a fix</div></article>
            <article className="stat-card"><div className="stat-top"><span>In progress</span><div className="stat-icon blue"><Activity size={17} /></div></div><div className="stat-value">{counts.progress}<span className="stat-change info"><ArrowDown size={13} /> Being worked on</span></div><div className="stat-foot"><span className="stat-dot blue-dot" />Currently active</div></article>
            <article className="stat-card"><div className="stat-top"><span>Resolved</span><div className="stat-icon green"><CheckCircle2 size={17} /></div></div><div className="stat-value">{counts.resolved}<span className="stat-change success">Completed</span></div><div className="stat-foot"><span className="stat-dot green-dot" />Ready to close</div></article>
          </section>

          <section className="issues-panel">
            <div className="panel-heading"><div><h2>Recent issues</h2><p>A live view of what your team is working on.</p></div><button className="secondary-button" onClick={() => setNotice("Advanced filters are coming soon.")}><SlidersHorizontal size={15} /> Filters</button></div>
            <div className="table-toolbar"><label className="search-box"><Search size={16} /><input aria-label="Search issues" placeholder="Search issues..." value={query} onChange={(e) => setQuery(e.target.value)} /><kbd>⌘ K</kbd></label><div className="filter-wrap"><Filter size={15} /><select aria-label="Filter by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All issues</option><option>Open</option><option>In Progress</option><option>Resolved</option></select><ChevronDown size={14} /></div></div>
            <div className="issues-table-wrap"><table className="issues-table"><thead><tr><th>ISSUE</th><th>SEVERITY</th><th>STATUS</th><th>ASSIGNEE</th><th>UPDATED</th><th /></tr></thead><tbody>
              {filteredBugs.map((bug) => <tr key={bug.id}><td><div className="issue-title-cell"><span className={`issue-project-icon ${bug.color}`}><Bug size={15} /></span><div><strong>{bug.title}</strong><span>{bug.id} <span className="table-dot">·</span> {bug.project}</span></div></div></td><td><span className={`severity-pill ${severityStyles[bug.severity]}`}><i />{bug.severity}</span></td><td><button className={`status-pill ${statusStyles[bug.status]}`} title="Click to cycle status" onClick={() => cycleStatus(bug.id)}>{bug.status}<ChevronDown size={12} /></button></td><td><div className="assignee-cell"><span className={`assignee-avatar ${bug.color}`}>{bug.assignee}</span><span>{bug.assignee === "VK" ? "You" : bug.assignee}</span></div></td><td className="updated-cell">{bug.updated}</td><td><button className="row-more" aria-label={`More actions for ${bug.id}`} onClick={() => setNotice(`More actions for ${bug.id} will be added soon.`)}>···</button></td></tr>)}
              {filteredBugs.length === 0 && <tr><td colSpan="6" className="empty-state">No issues match your search. Try another keyword or filter.</td></tr>}
            </tbody></table></div>
            <div className="table-footer"><span>Showing <strong>{filteredBugs.length}</strong> of <strong>{bugs.length}</strong> issues</span><span className="demo-label"><span /> DEMO DATA</span></div>
          </section>
          <footer className="page-footer"><span>BugTrack <span className="footer-dot">·</span> Built for better software</span><span><ShieldCheck size={14} /> Secure by design <span className="footer-dot">·</span> <button onClick={() => setNotice("Help documentation will be added with the next milestone.")}><CircleHelp size={14} /> Help</button></span></footer>
        </div>
      </main>

      {notice && <div className="toast" role="status"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15} /></button></div>}

      {showCreate && <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowCreate(false)}><section className="create-modal" role="dialog" aria-modal="true" aria-labelledby="create-title"><div className="modal-heading"><div><span className="modal-kicker">NEW REPORT</span><h2 id="create-title">Create an issue</h2><p>Describe the bug so your team can reproduce it.</p></div><button className="icon-button" onClick={() => setShowCreate(false)} aria-label="Close dialog"><X size={19} /></button></div><form onSubmit={createBug}><label className="form-label">Issue title <span>*</span><input required maxLength={120} autoFocus placeholder="e.g. Login fails with valid credentials" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><div className="form-two-col"><label className="form-label">Project<select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}><option>Web App</option><option>Dashboard</option><option>Authentication</option><option>Settings</option></select></label><label className="form-label">Severity<select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label></div><label className="form-label">Description<textarea rows="4" placeholder="Steps to reproduce, expected behavior, and actual behavior..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowCreate(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={16} /> Create issue</button></div></form></section></div>}
    </div>
  );
}

export default App;