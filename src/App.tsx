import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Icons } from './icons'
import { skills } from './skills'
import fanikoLogo from './assets/faniko.svg'
import fitnessLogo from './assets/fitnessclub.svg'
import emilLogo from './assets/emil.svg'

type Project = {
  title: string
  oneLiner: string
  stack: string[]
  highlights: string[]
  live?: string
  github?: string
  logo?: string
  liveLabel?: string
  accent?: string
}

const projects: Project[] = [
  {
    title: 'Faniko',
    oneLiner: 'Creator subscription platform MVP with real auth flows, uploads, and monetization-style UX.',
    stack: ['React', 'TypeScript', 'Node', 'Express', 'Multer', 'Render'],
    highlights: [
      'SPA + protected routes with creator upgrade gating',
      'Media upload pipeline (Multer) + API-driven feed',
      'Subscription / tips / unlockable content modeled as product features',
    ],
    live: 'https://faniko-startup-frontend.onrender.com',
    liveLabel: 'Live demo',
    github: 'https://github.com/mikhail0777/Faniko-startup',
    logo: fanikoLogo,
    accent: 'from-white/20 to-white/0',
  },
  {
    title: 'FitnessClub',
    oneLiner: 'Flask + PostgreSQL web app for gym management with a real relational schema and deployment.',
    stack: ['Python', 'Flask', 'PostgreSQL', 'SQL', 'HTML/CSS', 'Render'],
    highlights: [
      'Role-based UX paths (admin / trainer / staff) + server-rendered pages',
      'Normalized schema + CRUD operations backed by PostgreSQL',
      'Production deployment with persistent cloud database',
    ],
    live: 'https://fitnessclub-z0bn.onrender.com',
    liveLabel: 'Live demo',
    github: 'https://github.com/mikhail0777/FitnessClub',
    logo: fitnessLogo,
    accent: 'from-white/18 to-white/0',
  },
  {
    title: 'Emil Cartography Corp',
    oneLiner: 'Surveying technician experience (marine + geospatial). Data capture, QA, and map/product delivery.',
    stack: ['GIS', 'Surveying', 'Data QA', 'Field Ops'],
    highlights: [
      'High-precision GPS + survey instrumentation workflows',
      'Data processing, validation, and map output verification',
      'Coordination with teams to ship accurate deliverables under constraints',
    ],
    live: 'https://www.emilcartography.com',
    liveLabel: 'Company site',
    logo: emilLogo,
    accent: 'from-white/14 to-white/0',
  },
]

const Nav = () => (
  <div className="fixed top-0 left-0 right-0 z-50">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mt-4 glass rounded-2xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-wider text-white/85 hover:text-white transition">
          MIKHAIL<span className="text-white/40">.dev</span>
        </a>
        <div className="flex items-center gap-4 text-sm text-white/70">
          <a className="hover:text-white transition" href="#projects">Projects</a>
          <a className="hover:text-white transition" href="#skills">Skills</a>
          <a className="hover:text-white transition" href="#about">About</a>
          <a className="hover:text-white transition" href="#contact">Contact</a>
        </div>
      </div>
    </div>
  </div>
)

const GlowBackground = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-[0.95]"
        style={{
          background:
            `radial-gradient(900px 500px at var(--mx, 60%) var(--my, 30%), rgba(255,255,255,.12), transparent 55%),
             radial-gradient(700px 420px at 15% 80%, rgba(255,255,255,.07), transparent 60%),
             radial-gradient(520px 320px at 85% 80%, rgba(255,255,255,.05), transparent 65%)`
        }}
      />
      <div className="noise" />
    </div>
  )
}

const SectionTitle = ({ kicker, title, right }: { kicker: string; title: string; right?: React.ReactNode }) => (
  <div className="flex items-end justify-between gap-4">
    <div>
      <div className="font-mono text-xs tracking-[0.3em] text-white/45">{kicker}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
    {right}
  </div>
)

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
    {children}
  </span>
)

const Button = ({ href, icon, children, variant = 'primary' }: {
  href: string
  icon?: React.ReactNode
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={[
      "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition",
      variant === 'primary'
        ? "bg-white text-black hover:bg-white/90"
        : "border border-white/12 bg-white/5 text-white hover:bg-white/8"
    ].join(' ')}
  >
    {icon}
    <span>{children}</span>
    <Icons.arrow className="h-4 w-4 opacity-70" />
  </a>
)

const ProjectCard = ({ p }: { p: Project }) => (
  <div className="glass rounded-2xl p-5 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-40"
      style={{ background: `linear-gradient(135deg, ${p.accent ?? 'rgba(255,255,255,.14)'}, transparent)` }}
    />
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {p.logo && (
            <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center overflow-hidden">
              <img src={p.logo} alt={`${p.title} logo`} className="h-7 w-7 opacity-90" loading="lazy" />
            </div>
          )}
          <div>
            <div className="text-lg font-semibold tracking-tight">{p.title}</div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.oneLiner}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-white/72">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3">
        {p.live && (
          <Button href={p.live} icon={<Icons.link className="h-4 w-4" />}>
            {p.liveLabel ?? 'Live demo'}
          </Button>
        )}
        {p.github && (
          <Button href={p.github} variant="ghost" icon={<Icons.github className="h-4 w-4" />}>
            GitHub
          </Button>
        )}
      </div>
    </div>
  </div>
)

export default function App() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter(p =>
      [p.title, p.oneLiner, p.stack.join(' '), p.highlights.join(' ')].join(' ').toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div id="top" className="min-h-screen">
      <GlowBackground />
      <Nav />

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-24">
        {/* HERO */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs tracking-[0.3em] text-white/45">
              CARLETON CS • OTTAWA, CANADA
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Computer Science student building
              <span className="text-white/55"> full‑stack web products.</span>
            </h1>
            <p className="mt-5 text-base text-white/72 leading-relaxed max-w-xl">
              Computer Science (cybersecurity focus) student building production‑style full‑stack apps. Full‑Stack & AI developer (student) with real deployments — React/TypeScript on the front end and Node/Express or Flask + SQL on the back end. Also bring GIS surveying experience and an ops mindset from real field work.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#projects" icon={<span className="h-4 w-4 rounded bg-black/10" />}>View projects</Button>
              <Button href="mailto:miksim077@gmail.com" variant="ghost" icon={<Icons.mail className="h-4 w-4" />}>Email</Button>
              <Button href="https://www.linkedin.com/in/mikhail-simanian-363990290/" variant="ghost" icon={<span className="text-xs font-mono">in</span>}>
                LinkedIn
              </Button>
            </div>

            <div className="mt-10 glass rounded-2xl p-5">
              <div className="text-xs font-mono tracking-[0.3em] text-white/45">SIGNAL</div>
              <p className="mt-3 text-sm text-white/72 leading-relaxed">
                “Control can sometimes be an illusion. But sometimes you need illusion to gain control.”
                <span className="text-white/50"> — Mr. Who</span>
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-5">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Now</div>
                <div className="font-mono text-xs text-white/50">shipping • learning • iterating</div>
              </div>
              <div className="mt-4 hr" />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-mono text-xs text-white/45">FOCUS</div>
                  <div className="mt-2 text-white/80">Security foundations</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-mono text-xs text-white/45">MODE</div>
                  <div className="mt-2 text-white/80">Production-minded MVPs</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-mono text-xs text-white/45">STACK</div>
                  <div className="mt-2 text-white/80">TS / React / Node</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-mono text-xs text-white/45">DEPLOY</div>
                  <div className="mt-2 text-white/80">Render + cloud DB</div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Chip>Full‑stack</Chip>
                <Chip>Cybersecurity</Chip>
                <Chip>Deployment</Chip>
                <Chip>Databases</Chip>
              </div>
            </div>

            <div className="mt-6 glass rounded-2xl p-5">
              <div className="text-xs font-mono tracking-[0.3em] text-white/45">QUICK LINKS</div>
              <div className="mt-4 grid gap-3">
                <a className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 transition flex items-center justify-between"
                   href="https://github.com/mikhail0777" target="_blank" rel="noreferrer">
                  <div className="flex items-center gap-3">
                    <Icons.github className="h-5 w-5 text-white/80" />
                    <div>
                      <div className="text-sm font-semibold">GitHub</div>
                      <div className="text-xs text-white/55">mikhail0777</div>
                    </div>
                  </div>
                  <Icons.arrow className="h-5 w-5 text-white/50" />
                </a>
                <a className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 transition flex items-center justify-between"
                   href="mailto:miksim077@gmail.com">
                  <div className="flex items-center gap-3">
                    <Icons.mail className="h-5 w-5 text-white/80" />
                    <div>
                      <div className="text-sm font-semibold">Email</div>
                      <div className="text-xs text-white/55">miksim077@gmail.com</div>
                    </div>
                  </div>
                  <Icons.arrow className="h-5 w-5 text-white/50" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-16">
          <SectionTitle kicker="#PROJECTS" title="Flagship builds + real-world experience"
            right={
              <div className="flex items-center gap-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects…"
                  className="w-52 sm:w-64 rounded-xl border border-white/12 bg-black/30 px-4 py-2 text-sm outline-none focus:border-white/25"
                />
              </div>
            }
          />
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {filtered.map((p) => <ProjectCard key={p.title} p={p} />)}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-16">
          <SectionTitle kicker="# skills" title="Languages, frameworks & tools" />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((s) => (
              <div key={s.name} className="glass rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:translate-y-[-1px] transition-transform">
                <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,.04)]">
                  <img src={s.icon} alt={s.name} className="h-12 w-12" loading="lazy" />
                </div>
                <div className="text-sm font-semibold tracking-tight text-white/90">{s.name.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-16">
          <SectionTitle kicker="#ABOUT" title="A little context" />
          <div className="mt-6 glass rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-white/75 max-w-3xl">
              I’m a Computer Science student specializing in cybersecurity at Carleton University (Ottawa), with hands-on
              experience across full-stack development, data-driven systems, and real-world operations.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm text-white/72">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-mono text-xs text-white/45">EDUCATION</div>
                <div className="mt-2">BSc Computer Science (Cybersecurity)</div>
                <div className="text-xs text-white/55">Carleton University • expected 2027</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-mono text-xs text-white/45">LANGUAGES</div>
                <div className="mt-2">English • Armenian • Russian</div>
                <div className="text-xs text-white/55">Plus limited French & Arabic</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm hover:bg-white/8 transition"
              >
                <span className="font-mono text-xs">PDF</span>
                Resume
                <Icons.arrow className="h-4 w-4 opacity-70" />
              </a>
              <a
                href="https://github.com/mikhail0777"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm hover:bg-white/8 transition"
              >
                <Icons.github className="h-4 w-4" />
                More repos
                <Icons.arrow className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-16">
          <SectionTitle kicker="#CONTACT" title="Let’s build something solid" />
          <div className="mt-6 glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/72">Ottawa, Canada • available for internships, co‑ops, and junior roles.</div>
              <div className="mt-2 text-lg font-semibold">miksim077@gmail.com</div>
              <div className="mt-1 text-sm text-white/55">Fastest response: email</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="mailto:miksim077@gmail.com" icon={<Icons.mail className="h-4 w-4" />}>
                Email me
              </Button>
              <Button href="https://www.linkedin.com/in/mikhail-simanian-363990290/" variant="ghost" icon={<span className="text-xs font-mono">in</span>}>
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="mt-10 text-xs text-white/45 font-mono tracking-[0.2em] text-center">
            © {new Date().getFullYear()} Mikhail Simanian • Built with React + Vite
          </div>
        </section>
      </main>
    </div>
  )
}
