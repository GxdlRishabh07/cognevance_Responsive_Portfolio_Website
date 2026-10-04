import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/data/profile";
const resumeUrl = "/Rishabh-Patil-Resume.pdf";
const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} \u2014 Portfolio` },
      { name: "description", content: `${profile.headline}. About, skills, projects and contact.` },
      { property: "og:title", content: `${profile.name} \u2014 Portfolio` },
      {
        property: "og:description",
        content: `${profile.headline}. About, skills, projects and contact.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
function SectionTitle({ kicker, title }) {
  return (
    <div className="mb-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {kicker}
      </p>
      <h2 className="font-serif text-4xl md:text-6xl tracking-tight-lg">{title}</h2>
    </div>
  );
}
function Index() {
  return (
    <div id="top">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-32 md:pb-36">
          <Reveal>
            <p className="mb-6 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              Open to internships
            </p>
            <h1 className="font-serif text-6xl leading-[1.05] tracking-tight-xl md:text-[120px]">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl">
              {profile.headline}
            </p>
            <p className="mt-4 max-w-2xl text-muted-foreground">{profile.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#projects" className="btn-dark">
                View projects
              </a>
              <a href="#contact" className="btn-outline">
                Get in touch
              </a>
              <a href={resumeUrl} download="Rishabh-Patil-Resume.pdf" className="btn-outline">
                Download resume
              </a>
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-t">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
            <Reveal>
              <SectionTitle kicker="01 — About" title="A little about me" />
            </Reveal>
            <Reveal className="space-y-5 text-lg leading-relaxed">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="pt-4">
                {profile.education.map((e) => (
                  <div key={e.title} className="border-t py-4">
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.place} · {e.period}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-20 border-t bg-muted/50">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <Reveal>
              <SectionTitle kicker="02 — Skills" title="What I work with" />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {profile.skills.map((g) => (
                <Reveal
                  key={g.group}
                  className="card-lift rounded-2xl border bg-card p-6 shadow-soft"
                >
                  <h3 className="font-serif text-2xl">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s, i) => (
                      <li key={i} className="rounded-lg border px-3 py-1 text-sm">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 border-t">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <Reveal>
              <SectionTitle kicker="03 — Projects" title="Selected work" />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profile.projects.map((p) => (
                <Reveal
                  key={p.title}
                  className="card-lift flex flex-col rounded-2xl border bg-card p-6 shadow-soft"
                >
                  <h3 className="font-serif text-2xl">{p.title}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t, i) => (
                      <li
                        key={i}
                        className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs text-accent-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      View project <ArrowUpRight size={16} />
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 border-t bg-muted/50">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
            <Reveal>
              <SectionTitle kicker="04 — Contact" title="Let's talk" />
              <p className="text-lg text-muted-foreground">
                Have an opportunity or a question? Send a message and I'll get back to you.
              </p>
              <div className="mt-8 flex gap-3">
                {profile.links.email && (
                  <a aria-label="Email" href={`mailto:${profile.links.email}`} className="icon-btn">
                    <Mail size={18} />
                  </a>
                )}
                {profile.links.github && (
                  <a
                    aria-label="GitHub"
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-btn"
                  >
                    <Github size={18} />
                  </a>
                )}
                {profile.links.linkedin && (
                  <a
                    aria-label="LinkedIn"
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-btn"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" className="hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
export { Route };
