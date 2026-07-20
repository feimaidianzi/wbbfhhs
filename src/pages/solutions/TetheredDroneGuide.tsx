import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { ArrowRight, Zap, Radio, Shield, Clock, Cable, Eye } from "lucide-react";
import tetheredImg from "@/assets/seo/industrial-work-drone.jpg";

/**
 * Informational SEO guide targeting "tethered drone" / "what is a tethered drone".
 * Static English content: this is a top-of-funnel explainer page and the primary
 * keyword is English. Localized content can be added later via i18n keys if needed.
 */
const TetheredDroneGuide = () => {
  const faqs = [
    {
      question: "What is a tethered drone?",
      answer:
        "A tethered drone is an unmanned aerial vehicle (UAV) physically connected to a ground station by a lightweight cable. The tether delivers continuous electrical power and a high-bandwidth, interference-resistant data link, allowing the aircraft to remain aloft for hours or days rather than the 20–40 minutes typical of battery-only drones.",
    },
    {
      question: "How long can a tethered drone stay in the air?",
      answer:
        "Because power is supplied from the ground, flight time is effectively unlimited — bounded only by weather, ground-power availability, and scheduled maintenance. Persistent 24/7 missions of several days are routinely deployed for surveillance, communications relay, and emergency lighting.",
    },
    {
      question: "What are the main industrial use cases for tethered drones?",
      answer:
        "Persistent aerial surveillance for public safety and border security, temporary communications relay in disaster or event zones, high-mast emergency lighting for firefighting and SAR operations, and stable long-duration observation platforms for critical infrastructure monitoring.",
    },
    {
      question: "Are tethered drones more secure than free-flying drones?",
      answer:
        "Yes. The wired tether removes the RF command uplink and the wireless video downlink from the attack surface, which eliminates most jamming and spoofing vectors. Data flows through the physical cable, which is why tethered platforms are preferred for sensitive government and military missions.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What Is a Tethered Drone? A Guide to Persistent UAV Systems",
      description:
        "Tethered drones deliver unlimited flight time and jam-resistant data links via a power-over-tether cable. Learn how the technology works and where it's used.",
      author: { "@type": "Organization", name: "CANI Technology" },
      publisher: {
        "@type": "Organization",
        name: "CANI Technology",
        logo: { "@type": "ImageObject", url: "https://caniuav.com/logo.png" },
      },
      mainEntityOfPage: "https://caniuav.com/solutions/tethered-drone-guide",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Unlimited Flight Time",
      desc: "Power-over-tether removes the battery ceiling. Missions run for hours or days without landing to swap packs.",
    },
    {
      icon: Radio,
      title: "Interference-Resistant Data Link",
      desc: "Video and telemetry travel through the physical cable — immune to RF jamming and spectrum congestion.",
    },
    {
      icon: Shield,
      title: "Secure by Design",
      desc: "No wireless command uplink means no spoofing surface. Preferred for sensitive government and defense missions.",
    },
    {
      icon: Zap,
      title: "High Payload Support",
      desc: "Ground power lets you fly heavier gimbals, thermal cameras, radios, and lighting arrays than a battery drone could carry.",
    },
    {
      icon: Cable,
      title: "Fixed Position, Stable Feed",
      desc: "A tethered platform holds an altitude and orbit precisely — ideal for continuous overwatch of the same target area.",
    },
    {
      icon: Eye,
      title: "Rapid Deployment",
      desc: "Vehicle-mounted tether systems set up in minutes and provide immediate persistent aerial coverage.",
    },
  ];

  const useCases = [
    {
      title: "Emergency Response & Firefighting",
      desc: "High-mast lighting, live thermal overwatch, and 24/7 situational awareness for incident commanders. See our firefighting solution for details.",
      link: "/solutions/uav-firefighting-emergency-rescue",
      linkLabel: "Firefighting & SAR Solution",
    },
    {
      title: "Persistent Industrial Surveillance",
      desc: "Continuous monitoring of substations, ports, pipelines, construction sites, and other high-value assets without swap intervals.",
      link: "/applications/power-inspection",
      linkLabel: "Power Inspection",
    },
    {
      title: "Temporary Communications Relay",
      desc: "Rapidly deployable elevated node that extends radio, cellular, or mesh coverage into disaster zones or remote event sites.",
      link: "/products/tethered",
      linkLabel: "Tethered Drone Lineup",
    },
    {
      title: "Defense & Border Security",
      desc: "Jam-resistant, wire-connected aerial observation that resists common electronic-warfare attacks used against RF drones.",
      link: "/applications/military",
      linkLabel: "Defense Applications",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title="What Is a Tethered Drone? Guide to Persistent UAV Systems"
        description="Tethered drones fly for hours or days on power-over-tether cables with jam-resistant data links. Learn how they work and where industrial teams deploy them."
        keywords="tethered drone, what is a tethered drone, tethered UAV, persistent surveillance drone, power over tether, tethered drone system"
        path="/solutions/tethered-drone-guide"
        type="article"
        image={tetheredImg}
        structuredData={structuredData}
      />
      <Header />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-6">
          <BackButton to="/" />
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                What Is a Tethered Drone?
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A <strong>tethered drone</strong> is an unmanned aerial vehicle
                connected to a ground station by a lightweight cable that
                supplies continuous power and a wired data link. The result:
                effectively <strong>unlimited flight time</strong> and a{" "}
                <strong>jam-resistant video feed</strong> — two capabilities
                battery-only drones physically cannot deliver.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                This guide covers how the tether works, why persistent
                industrial missions rely on it, and which use cases benefit
                most — from firefighting overwatch to temporary communications
                relay.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <LangLink to="/products/tethered">
                    Browse Tethered Drone Products <ArrowRight className="ml-2 h-4 w-4" />
                  </LangLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <LangLink to="/contact">Talk to an Engineer</LangLink>
                </Button>
              </div>
            </div>
            <div>
              <img
                src={tetheredImg}
                alt="Industrial tethered drone providing persistent aerial surveillance"
                loading="lazy"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              How a Tethered Drone Works
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A tethered UAV system has three parts: the aircraft, a
              conductive-plus-fiber <strong>tether cable</strong>, and a{" "}
              <strong>ground power station</strong>. The station converts wall
              or generator power into high-voltage DC and sends it up the
              cable. A converter on the aircraft steps it back down to drive
              the motors and avionics. Because power never depletes, the
              drone can hold its position as long as the ground supply is
              running.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Alongside the power conductors, the tether carries an optical
              fiber for HD video, telemetry, and command traffic. This wired
              path is the reason tethered platforms are so
              interference-resistant: there is no RF command uplink to jam
              and no wireless video downlink to intercept.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The tradeoff is range. A tethered drone stays within the
              tether's length — typically 50–300 meters vertically — so it's a
              persistent-overwatch tool, not a survey aircraft. For long-range
              missions, teams pair tethered platforms with free-flying UAVs.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Why Industrial Teams Choose Tethered Drones
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors"
              >
                <b.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Where Tethered Drones Are Deployed
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {useCases.map((u) => (
                <div key={u.title} className="p-6 rounded-xl border bg-card">
                  <h3 className="font-semibold text-lg mb-2">{u.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {u.desc}
                  </p>
                  <LangLink
                    to={u.link}
                    className="text-primary text-sm font-medium hover:underline inline-flex items-center"
                  >
                    {u.linkLabel} <ArrowRight className="ml-1 h-3 w-3" />
                  </LangLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tethered vs battery comparison */}
        <section className="container mx-auto px-4 py-14 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Tethered Drone vs Battery Drone
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Capability</th>
                  <th className="text-left p-3 font-semibold">Tethered Drone</th>
                  <th className="text-left p-3 font-semibold">Battery Drone</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b">
                <tr>
                  <td className="p-3 font-medium">Flight endurance</td>
                  <td className="p-3">Hours to days (continuous)</td>
                  <td className="p-3">20–40 minutes</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Operating range</td>
                  <td className="p-3">Fixed to tether (50–300 m)</td>
                  <td className="p-3">Kilometers, mobile</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">RF jamming risk</td>
                  <td className="p-3">Very low (wired link)</td>
                  <td className="p-3">Elevated (wireless C2 + video)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Payload capacity</td>
                  <td className="p-3">High (ground-powered)</td>
                  <td className="p-3">Constrained by battery mass</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Best for</td>
                  <td className="p-3">Persistent overwatch, relay, lighting</td>
                  <td className="p-3">Survey, inspection sweeps, delivery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="p-5 rounded-xl border bg-card group"
                >
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {f.question}
                    <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Deploy a Tethered UAV System?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore CANI's TH-series tethered drones (TH-100 / TH-200 /
            TH-300) engineered for 24/7 industrial overwatch, or talk to our
            engineers about a custom deployment.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <LangLink to="/products/tethered">
                View Tethered Drones <ArrowRight className="ml-2 h-4 w-4" />
              </LangLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <LangLink to="/contact">Email an Engineer</LangLink>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default TetheredDroneGuide;
