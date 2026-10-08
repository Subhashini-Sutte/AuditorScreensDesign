import { useMemo, useState } from "react";

const A = "/assets/";
const icons = {
  brand: "7e95c.svg",
  dashboard: "140b3.svg",
  audits: "8316c.svg",
  completed: "5d3a7.svg",
  reports: "f32ad.svg",
  help: "3da3d.svg",
  chevron: "b8b8e.svg",
  bell: "6ae56.svg",
  down: "4b037.svg",
  history: "febf4.svg",
  success: "b8548.svg",
  clipboard: "0e87d.svg",
  clock: "8864a.svg",
  shield: "5f6b4.svg",
  arrow: "e27e5.svg",
  play: "86c58.svg",
  lock: "d29a9.svg",
  info: "00b67.svg",
  calendar: "7d7af.svg",
  check: "5eadd.svg",
  circle: "13114.svg",
  message: "62a2b.svg",
  back: "2ecf9.svg",
  user: "29863.svg",
  building: "10ca7.svg",
  pin: "03bb7.svg",
  person: "74608.svg",
  users: "e0032.svg",
  phone: "0b990.svg",
  package: "bbcd6.svg",
  list: "650d0.svg",
};

type IconName = keyof typeof icons;
type View = "dashboard" | "review" | "cases" | "audit" | "completed" | "reports";
type AuditType = "branch" | "case";

type Branch = {
  id: string;
  name: string;
  area: string;
  code: string;
  period: string;
};

const branches: Branch[] = [
  {
    id: "AUD-2026-0184",
    name: "Banjara Hills",
    area: "Hyderabad Central",
    code: "HYD-BH-014",
    period: "01 Jul – 30 Sep 2026",
  },
  {
    id: "AUD-2026-0197",
    name: "Secunderabad",
    area: "Hyderabad North",
    code: "HYD-SC-009",
    period: "01 Jul – 30 Sep 2026",
  },
];

const products = ["Gold Loan", "Vehicle Loan"];
const cases = [
  ["SAMPLE-GL-018-101", "Illustrative applicant A", "₹2,10,000", "15 Jun 2026"],
  ["SAMPLE-GL-018-102", "Illustrative applicant B", "₹3,25,000", "18 Jun 2026"],
  ["SAMPLE-GL-018-103", "Illustrative applicant C", "₹1,50,000", "22 Jun 2026"],
  ["SAMPLE-GL-018-104", "Illustrative applicant D", "₹4,80,000", "26 Jun 2026"],
  ["SAMPLE-GL-018-105", "Illustrative applicant E", "₹2,75,000", "30 Jun 2026"],
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <img alt="" className="icon" height={size} src={`${A}${icons[name]}`} width={size} />;
}

function Badge({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <span className={`badge ${muted ? "badge-muted" : ""}`}>{children}</span>;
}

function Button({
  children,
  onClick,
  secondary = false,
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      className={`button ${secondary ? "button-secondary" : ""}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

function Sidebar({
  view,
  go,
  support,
}: {
  view: View;
  go: (view: View) => void;
  support: () => void;
}) {
  const nav: [View, IconName, string][] = [
    ["dashboard", "dashboard", "Overview"],
    ["review", "audits", "My audits"],
    ["completed", "completed", "Completed"],
    ["reports", "reports", "Reports"],
  ];
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => go("dashboard")} type="button">
        <span>
          <strong className="wordmark"><i>ARC</i><b>LEND</b></strong>
          <small>AUDIT OPERATIONS</small>
        </span>
      </button>
      <div className="nav-label">WORKSPACE</div>
      <nav>
        {nav.map(([target, icon, label]) => (
          <button
            className={(view === target || (target === "review" && ["cases", "audit"].includes(view))) ? "active" : ""}
            key={target}
            onClick={() => go(target)}
            type="button"
          >
            <Icon name={icon} size={19} /><span>{label}</span>
            {target === "review" && <em>2</em>}
          </button>
        ))}
      </nav>
      <button className="help" onClick={support} type="button">
        <span><Icon name="help" size={16} /> <strong>Need assistance?</strong></span>
        <small>Contact compliance operations for access or audit support.</small>
        <b>Open support</b>
      </button>
    </aside>
  );
}

function Header({
  crumb,
  profileOpen,
  toggleProfile,
}: {
  crumb: string;
  profileOpen: boolean;
  toggleProfile: () => void;
}) {
  return (
    <header className="topbar">
      <div className="crumb"><span>South Region</span><Icon name="chevron" size={14} /><b>{crumb}</b></div>
      <div className="account-actions">
        <button aria-label="Notifications" className="icon-button" onClick={() => window.alert("You have no new notifications.")} type="button"><Icon name="bell" size={20} /></button>
        <button className="account" onClick={toggleProfile} type="button">
          <span className="avatar">AR</span><span><b>Ananya Rao</b><small>Senior auditor</small></span><Icon name="down" size={14} />
        </button>
        {profileOpen && (
          <div className="profile-menu">
            <b>Ananya Rao</b><span>ananya.rao@arclend.io</span>
            <button onClick={() => window.alert("Profile settings are up to date.")} type="button">Profile settings</button><button onClick={() => window.alert("This demo keeps you signed in.")} type="button">Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
}

function Metrics() {
  return (
    <div className="metrics">
      <div><span className="metric-icon teal"><Icon name="clipboard" size={22} /></span><p>Total assigned audits<strong>2</strong><small>2 branches assigned to you</small></p></div>
      <div><span className="metric-icon green"><Icon name="success" size={22} /></span><p>Total completed audits<strong>10</strong><small>3 completed this quarter</small></p></div>
      <div><span className="metric-icon amber"><Icon name="clock" size={22} /></span><p>Pending audits<strong>7</strong><small>Within the regional queue</small></p></div>
    </div>
  );
}

function Dashboard({
  activeBranch,
  onReview,
  continueAudit,
  history,
}: {
  activeBranch: Branch | null;
  onReview: (branch: Branch) => void;
  continueAudit: () => void;
  history: () => void;
}) {
  return (
    <main className="page">
      <div className="page-title dashboard-title">
        <div><h1>Good morning, Ananya</h1><p>{activeBranch ? "Review your assigned branches and continue the audit currently in progress." : "Choose an assigned branch to begin your audit. You decide which branch to review first."}</p></div>
        <div className="title-actions"><span>Updated 09:42</span><Button onClick={history} secondary><Icon name="history" size={16} /> Audit history</Button></div>
      </div>
      <Metrics />
      {activeBranch && (
        <section className="active-banner">
          <span className="active-icon"><Icon name="shield" size={22} /></span>
          <div><b><Badge>ACTIVE AUDIT</Badge> {activeBranch.name} · {activeBranch.id}</b><p>This audit is selected. All other branch actions are locked until it is completed.</p><span className="progress"><i /></span><small>46% complete</small></div>
          <Button onClick={continueAudit}>Continue audit <Icon name="arrow" size={17} /></Button>
        </section>
      )}
      <div className="dashboard-grid">
        <section className="card branch-list">
          <div className="section-heading"><div><h2>Assigned branches</h2><p>{activeBranch ? "Select a branch to begin. Only one audit can be active at a time." : "Both branches are available. Choose the audit you want to start first."}</p></div><Badge muted>2 assigned</Badge></div>
          {!activeBranch && <div className="notice"><Icon name="shield" size={20} /><span><b>Choose which branch to audit first</b><small>Starting one branch will lock your other assigned audits until the selected audit is completed.</small></span></div>}
          <div className="table branch-table">
            <div className="table-head"><span>AUDIT ID</span><span>BRANCH</span><span>CODE</span><span>AUDIT PERIOD</span><span>STATUS</span><span>ACTION</span></div>
            {branches.map((branch) => {
              const locked = !!activeBranch && activeBranch.id !== branch.id;
              const current = activeBranch?.id === branch.id;
              return (
                <div className={`table-row ${current ? "current" : ""} ${locked ? "locked" : ""}`} key={branch.id}>
                  <span>{branch.id}</span><span><b>{branch.name}</b><small>{branch.area}</small></span><span>{branch.code}</span><span>{branch.period}</span>
                  <span><Badge muted={locked}>{locked ? <><Icon name="lock" size={12} /> Locked</> : current ? <><Icon name="play" size={12} /> In progress</> : <><Icon name="play" size={12} /> Not started</>}</Badge></span>
                  <span><Button disabled={locked} onClick={() => current ? continueAudit() : onReview(branch)}>{locked ? <><Icon name="lock" size={15} /> Unavailable</> : current ? "Continue" : "Start audit"} {!locked && <Icon name="arrow" size={16} />}</Button></span>
                </div>
              );
            })}
          </div>
          <p className="footnote"><Icon name="info" size={15} /> {activeBranch ? `Complete ${activeBranch.id} to unlock audit selection for the other branch.` : "No audit is active yet. You can start either branch now."}</p>
        </section>
        <aside className="card guidance">
          <div className="guidance-title"><span><Icon name="clipboard" /></span><div><h3>{activeBranch ? "Current audit" : "Before you begin"}</h3><p>{activeBranch?.id || "How audit selection works"}</p></div></div>
          {activeBranch ? (
            <>
              <h4>AUDIT WINDOW</h4><p className="due"><Icon name="calendar" size={15} /> Due 04 Oct 2026 <small>4 days remaining</small></p>
              <h4>AUDIT PROGRESS <b>2 of 4</b></h4>
              {["Branch records verified", "Evidence sampling", "Control testing", "Findings & sign-off"].map((item, i) => <p className="step" key={item}><Icon name={i < 2 ? "check" : "circle"} size={16} /> {item}</p>)}
            </>
          ) : (
            <>
              {["Choose a branch", "Other audits lock", "Complete to unlock"].map((title, i) => <div className="guide-step" key={title}><i>{i + 1}</i><span><b>{title}</b><small>{["Start with Banjara Hills or Secunderabad — the order is up to you.", "Your remaining assignment is protected while one audit is active.", "Finish and submit the active audit to choose the next branch."][i]}</small></span></div>)}
              <div className="warning"><Icon name="clock" size={16} /><b>One audit at a time</b><p>This prevents overlapping evidence collection and keeps each branch record complete.</p></div>
            </>
          )}
          <div className="coordinator"><span className="avatar muted">VK</span><span><b>Vikram K.</b><small>Compliance coordinator</small></span><Icon name="message" size={17} /></div>
        </aside>
      </div>
    </main>
  );
}

function BranchSummary({ branch }: { branch: Branch }) {
  const details: [IconName, string, string][] = [
    ["pin", "LOCATION", `${branch.name}, Hyderabad`],
    ["person", "BRANCH MANAGER", "Ramesh Reddy"],
    ["users", "OPERATIONS MANAGER", "Priya Sharma"],
    ["phone", "BRANCH CONTACT", "+91 40 6602 1234"],
  ];
  return (
    <section className="card branch-summary">
      <div className="branch-identity"><span><Icon name="building" size={27} /></span><div><h2>Hyderabad - {branch.name}</h2><p>Branch code • BR-{branch.code}</p></div><Badge><Icon name="building" size={13} /> Urban Branch</Badge></div>
      <div className="branch-info">
        <div className="details">{details.map(([icon, label, value]) => <div key={label}><span><Icon name={icon} /></span><p><small>{label}</small><b>{value}</b></p></div>)}</div>
        <div className="products"><Icon name="package" size={17} /><small>PRODUCTS</small>{products.map((p) => <Badge muted key={p}>{p}</Badge>)}</div>
        <div className="assignment"><span><Icon name="clipboard" size={16} /> CURRENT ASSIGNMENT</span><span>{branch.id}　 01 Jul – 30 Sep 2026　 <Badge>Not started</Badge></span></div>
      </div>
    </section>
  );
}

function AuditReview({
  branch,
  auditType,
  setAuditType,
  back,
  start,
}: {
  branch: Branch;
  auditType: AuditType;
  setAuditType: (type: AuditType) => void;
  back: () => void;
  start: () => void;
}) {
  return (
    <main className="page review-page">
      <div className="page-title"><div><button className="back" onClick={back} type="button"><Icon name="back" size={14} /> Assigned branches</button><h1>Review branch and start audit</h1></div><Badge><Icon name="user" size={13} /> Assigned to me</Badge></div>
      <BranchSummary branch={branch} />
      <section className="card audit-review">
        <div className="section-heading"><div><h2>{auditType === "branch" ? "Previous audit details" : "Previous case audit details"}</h2><p>Review the latest completed audit before starting a new assessment.</p></div><Badge muted><Icon name="history" size={14} /> Latest completed record</Badge></div>
        <div className="audit-tabs">
          <button className={auditType === "branch" ? "selected" : ""} onClick={() => setAuditType("branch")} type="button"><Icon name="building" /> Branch audit {auditType === "branch" && <small>Selected</small>}</button>
          <button className={auditType === "case" ? "selected" : ""} onClick={() => setAuditType("case")} type="button"><Icon name="clipboard" /> Case audit {auditType === "case" && <small>Selected</small>}</button>
        </div>
        {auditType === "branch" ? <PreviousBranch /> : <PreviousCases />}
      </section>
      <section className="card ready"><span><Icon name="clipboard" size={20} /></span><div><b>Ready to begin the selected audit?</b><p>The next screen will use the selected audit type. Branch code is auto-filled.</p></div><Button onClick={start}>Start {auditType} audit <Icon name="arrow" size={17} /></Button></section>
    </main>
  );
}

function PreviousBranch() {
  return (
    <>
      <div className="previous-summary"><span><small>AUDIT DATE</small><b>18 Jun 2026</b></span><span><small>AUDIT ID</small><b>BA-HYD-2026-062</b></span><span><small>AUDITOR</small><b>Rahul Mehta</b></span><span><small>SCORE</small><strong>86 / 100</strong></span><span><small>STATUS</small><Badge>Completed</Badge></span></div>
      <div className="findings-grid"><div><b><Icon name="list" size={15} /> Findings</b><p><i className="red" /> Two gold packets had delayed dual-control verification.</p><p><i className="amber-dot" /> Vehicle Loan sampling register required weekly review sign-off.</p></div><div><b>Corrective-action status</b><span className="bar"><i /></span><p><strong>4 of 5 closed</strong><small>Due 05 Oct 2026</small></p></div></div>
    </>
  );
}

function PreviousCases() {
  return (
    <div className="previous-cases">
      <p className="footnote"><Icon name="info" size={15} /> Previous audit details are available for Gold Loan only.</p>
      <div className="product-history"><header><b><Icon name="package" size={16} /> Gold Loan</b><span>Latest completed case audit</span></header><div><p><small>AUDIT DATE</small><span>12 Jun 2026</span></p><p><small>AUDIT ID</small><span>CA-GL-2026-041</span></p><p><small>AUDITOR</small><span>Rahul Mehta</span></p><p><small>SCORE</small><span>88 / 100</span></p><p><small>STATUS</small><span>Completed</span></p></div><footer><span><b><Icon name="list" size={14} /> Findings</b><small>2 observations recorded; no critical exceptions.</small></span><span><b>Corrective action status</b><small>2 of 2 actions closed</small></span></footer></div>
      <div className="product-history"><header><b><Icon name="package" size={16} /> Vehicle Loan</b><span>First audit • No previous record</span></header><div><p><small>AUDIT DATE</small><span>Not available</span></p><p><small>AUDIT ID</small><span>Not available</span></p><p><small>AUDITOR</small><span>Not available</span></p><p><small>SCORE</small><span>Not available</span></p><p><small>STATUS</small><span>Not audited</span></p></div><footer><span><b><Icon name="list" size={14} /> Findings</b><small>No previous findings — this is the first Vehicle Loan audit.</small></span><span><b>Corrective action status</b><small>Not applicable</small></span></footer></div>
    </div>
  );
}

function CaseWorkspace({
  branch,
  back,
  startCase,
}: {
  branch: Branch;
  back: () => void;
  startCase: (caseId: string) => void;
}) {
  const [product, setProduct] = useState(products[0]);
  const [filter, setFilter] = useState("All");
  return (
    <main className="page case-page">
      <div className="page-title"><div><button className="back" onClick={back} type="button"><Icon name="back" size={14} /> Branch review</button><h1>Case audit workspace</h1><p>Review the cases for your selected product and choose a case to start.</p></div><Badge><Icon name="user" size={13} /> Assigned to me</Badge></div>
      <BranchSummary branch={branch} />
      <section className="card product-picker"><label>Product *<select onChange={(e) => setProduct(e.target.value)} value={product}>{products.map((p) => <option key={p}>{p}</option>)}</select></label><div><b>5 {product} cases available for audit</b><p>All 5 cases are not started. Select Start audit on a case to begin its assessment.</p></div></section>
      <section className="card cases-card">
        <div className="section-heading"><div><h2>{product} cases</h2><p>Only cases belonging to {product} are displayed.</p></div><select aria-label="Filter cases" onChange={(e) => setFilter(e.target.value)} value={filter}>{["All", "Not Started", "In progress", "Completed"].map((x) => <option key={x}>{x}</option>)}</select></div>
        <div className="case-chip"><Badge>{product}</Badge><span>5 cases</span></div>
        {filter === "All" || filter === "Not Started" ? (
          <div className="table case-table">
            <div className="table-head"><span>CASE ID / PRODUCT</span><span>APPLICANT / CUSTOMER REF.</span><span>LOAN AMOUNT</span><span>DISBURSED ON</span><span>AUDIT STATUS</span><span>ACTION</span></div>
            {cases.map((item) => {
              const caseId = product === "Gold Loan" ? item[0] : item[0].replace("GL", "VL");
              return <div className="table-row" key={caseId}><span><b>{caseId}</b><small>{product} • {product === "Gold Loan" ? `${40 + cases.indexOf(item) * 15}.0 g pledged` : "Vehicle finance"}</small></span><span>{item[1]}<small>{caseId.replace(/(?:GL|VL)-018/, "CUST")}</small></span><span>{item[2]}</span><span>{item[3]}</span><span><Badge muted>Not started</Badge></span><span><Button onClick={() => startCase(caseId)}>Start audit <Icon name="arrow" size={16} /></Button></span></div>;
            })}
          </div>
        ) : <div className="empty"><Icon name="info" size={20} /><b>No {filter.toLowerCase()} cases</b><p>Change the status filter to view available cases.</p></div>}
      </section>
    </main>
  );
}

function AuditChecklist({
  branch,
  type,
  caseId,
  onSave,
  onComplete,
  back,
}: {
  branch: Branch;
  type: AuditType;
  caseId: string | null;
  onSave: () => void;
  onComplete: () => void;
  back: () => void;
}) {
  const questions = type === "branch"
    ? ["Branch records verified", "Cash and vault controls reviewed", "Evidence samples attached", "Findings reviewed with manager"]
    : ["Customer KYC documents verified", "Sanction and valuation records matched", "Disbursement evidence reviewed", "Case observations documented"];
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false]);
  const [notes, setNotes] = useState("");
  const done = checked.every(Boolean);
  return (
    <main className="page audit-page">
      <div className="page-title"><div><button className="back" onClick={back} type="button"><Icon name="back" size={14} /> Back to workspace</button><h1>{type === "branch" ? "Branch audit assessment" : "Case audit assessment"}</h1><p>{type === "branch" ? branch.id : caseId} · Hyderabad - {branch.name}</p></div><Badge><Icon name="play" size={13} /> In progress</Badge></div>
      <div className="assessment-grid">
        <section className="card checklist">
          <div className="section-heading"><div><h2>Audit checklist</h2><p>Complete every control before submitting this audit.</p></div><b>{checked.filter(Boolean).length} of {checked.length}</b></div>
          {questions.map((question, i) => <label className={checked[i] ? "checked" : ""} key={question}><input checked={checked[i]} onChange={() => setChecked((old) => old.map((x, n) => n === i ? !x : x))} type="checkbox" /><span><b>{question}</b><small>Confirm that the required evidence has been reviewed and recorded.</small></span></label>)}
          <label className="notes">Audit notes<textarea onChange={(e) => setNotes(e.target.value)} placeholder="Add observations, exceptions, or follow-up details..." value={notes} /></label>
        </section>
        <aside className="card audit-side"><span className="active-icon"><Icon name="shield" size={23} /></span><h3>{type === "branch" ? "Branch audit" : "Case audit"}</h3><p>{caseId || branch.id}</p><hr /><small>PROGRESS</small><div className="big-progress"><i style={{ width: `${checked.filter(Boolean).length * 25}%` }} /></div><b>{checked.filter(Boolean).length * 25}% complete</b><p className="save-note">Your changes are kept in this browser while the audit is active.</p></aside>
      </div>
      <section className="card ready"><div><b>{done ? "All controls are complete" : "Complete the remaining controls"}</b><p>{done ? "You can now submit and unlock the other branch." : "Save your progress and return when your review is complete."}</p></div><Button onClick={onSave} secondary>Save draft</Button><Button disabled={!done} onClick={onComplete}>Complete audit <Icon name="arrow" size={17} /></Button></section>
    </main>
  );
}

function Placeholder({ view }: { view: "completed" | "reports" }) {
  return <main className="page"><div className="page-title"><div><h1>{view === "completed" ? "Completed audits" : "Reports"}</h1><p>{view === "completed" ? "Review submitted branch and case audits." : "Track regional audit activity and performance."}</p></div></div><section className="card empty large"><Icon name={view === "completed" ? "completed" : "reports"} size={32} /><h2>{view === "completed" ? "10 audits completed" : "Regional reporting"}</h2><p>{view === "completed" ? "Completed records will appear here with scores and sign-off details." : "Reporting filters and export options are ready for your next reporting cycle."}</p><Button onClick={() => window.alert("Summary exported successfully.")} secondary>Export summary</Button></section></main>;
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);
  const [auditType, setAuditType] = useState<AuditType>("branch");
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);

  const crumb = useMemo(() => view === "dashboard" ? "Auditor workspace" : view === "cases" ? "Case audit workspace" : view === "audit" ? "Audit assessment" : view[0].toUpperCase() + view.slice(1), [view]);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const startSelectedAudit = () => {
    setActiveBranch(selectedBranch);
    if (auditType === "case") setView("cases");
    else {
      setActiveCase(null);
      setView("audit");
    }
  };
  const go = (target: View) => {
    setProfileOpen(false);
    if (target === "review") setView(activeBranch ? "dashboard" : "dashboard");
    else setView(target);
  };

  return (
    <div className="app-shell">
      <Sidebar go={go} support={() => notify("Support request opened. Vikram will contact you shortly.")} view={view} />
      <div className="workspace">
        <Header crumb={crumb} profileOpen={profileOpen} toggleProfile={() => setProfileOpen(!profileOpen)} />
        {view === "dashboard" && <Dashboard activeBranch={activeBranch} continueAudit={() => setView(auditType === "case" && !activeCase ? "cases" : "audit")} history={() => setHistoryOpen(true)} onReview={(branch) => { setSelectedBranch(branch); setView("review"); }} />}
        {view === "review" && <AuditReview auditType={auditType} back={() => setView("dashboard")} branch={selectedBranch} setAuditType={setAuditType} start={startSelectedAudit} />}
        {view === "cases" && <CaseWorkspace back={() => setView("review")} branch={activeBranch || selectedBranch} startCase={(id) => { setActiveBranch(activeBranch || selectedBranch); setActiveCase(id); setAuditType("case"); setView("audit"); }} />}
        {view === "audit" && <AuditChecklist back={() => setView(auditType === "case" ? "cases" : "dashboard")} branch={activeBranch || selectedBranch} caseId={activeCase} onComplete={() => { setActiveBranch(null); setActiveCase(null); setView("dashboard"); notify("Audit completed. The other branch is now unlocked."); }} onSave={() => notify("Draft saved successfully.")} type={auditType} />}
        {(view === "completed" || view === "reports") && <Placeholder view={view} />}
      </div>
      {historyOpen && <div className="modal-backdrop" onMouseDown={() => setHistoryOpen(false)}><section className="modal" onMouseDown={(e) => e.stopPropagation()}><button aria-label="Close" className="close" onClick={() => setHistoryOpen(false)} type="button">×</button><Badge><Icon name="history" size={14} /> Audit history</Badge><h2>Recent activity</h2><div className="history-item"><Icon name="success" /><span><b>Jubilee Hills branch audit</b><small>Completed 18 Jun 2026 · Score 86/100</small></span></div><div className="history-item"><Icon name="success" /><span><b>Somajiguda case audit</b><small>Completed 03 Jun 2026 · 8 cases reviewed</small></span></div><Button onClick={() => { setHistoryOpen(false); setView("completed"); }}>View all completed audits</Button></section></div>}
      {toast && <div className="toast"><Icon name="success" size={18} /> {toast}</div>}
    </div>
  );
}
