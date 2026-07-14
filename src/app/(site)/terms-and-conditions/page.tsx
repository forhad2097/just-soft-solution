import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Mail, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SITE, whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for using Just Soft Solution's software development, QA, testing, and digital services — including payment, account, and liability terms.",
  alternates: { canonical: "/terms-and-conditions" },
};

const LAST_UPDATED = "July 14, 2026";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Legal
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Terms <span className="text-gradient">&amp; Conditions</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            Please read these Terms &amp; Conditions carefully before using any
            service provided by {SITE.name}. By accessing our website or
            engaging our services, you agree to be bound by these terms.
          </p>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <article className="prose-jss max-w-3xl mx-auto">
          <h2>1. Acceptance of Terms</h2>
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) constitute a
            legally binding agreement between you (&quot;Client,&quot;
            &quot;User,&quot; or &quot;you&quot;) and {SITE.name}{" "}
            (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), governing your access to and use of our
            website, software products, and professional services, including
            custom software development, manual and automation testing, API
            and security testing, big data analysis, and any related digital
            services (collectively, the &quot;Services&quot;).
          </p>
          <p>
            By accessing our website, requesting a demo, signing a proposal,
            or making a payment for any Service, you confirm that you have
            read, understood, and agree to be bound by these Terms. If you do
            not agree with any part of these Terms, you must not use our
            Services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            {SITE.name} provides custom software development, quality
            assurance and testing (manual and automated), API and security
            testing, big data analysis, and related digital products and
            consulting services to businesses and individuals
            (&quot;Clients&quot;). The exact scope, deliverables, timeline,
            and pricing of any engagement will be defined separately in a
            proposal, statement of work, quotation, or order confirmation
            (&quot;Order&quot;), which forms part of these Terms once
            accepted by the Client.
          </p>
          <p>
            We reserve the right to modify, expand, or discontinue any
            feature of a Service, provided that any change to an active,
            paid engagement will be communicated to the Client in advance.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>As a Client or User of our Services, you agree to:</p>
          <ul>
            <li>
              Provide accurate, complete, and current information required
              for us to deliver the Services (business requirements, access
              credentials, content, and feedback).
            </li>
            <li>
              Use our Services only for lawful business purposes and in
              accordance with these Terms.
            </li>
            <li>
              Respond to reasonable requests for information, approvals, or
              feedback within the timelines agreed in the applicable Order,
              as delays on your part may affect delivery timelines.
            </li>
            <li>
              Ensure that you have the necessary rights, licenses, and
              permissions for any content, data, or third-party material you
              provide to us for use in a project.
            </li>
            <li>
              Not misrepresent your identity or authority to enter into an
              agreement on behalf of a company or organization.
            </li>
          </ul>

          <h2>4. Account &amp; Security</h2>
          <p>
            Where a Service requires you to create an account or access
            credentials (for example, to a client portal, staging
            environment, or admin panel), you are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your login credentials.</li>
            <li>
              All activities that occur under your account, whether or not
              authorized by you.
            </li>
            <li>
              Notifying us immediately of any unauthorized use of your
              account or any other breach of security.
            </li>
          </ul>
          <p>
            We implement reasonable administrative and technical safeguards
            to protect account and project data, but we cannot guarantee
            absolute security, and you accept this risk when using our
            Services.
          </p>

          <h2>5. Payment Terms</h2>
          <p>
            Fees for our Services are set out in the applicable Order,
            invoice, or proposal and may be billed as a one-time project fee,
            milestone-based payments, or a recurring subscription, depending
            on the engagement type.
          </p>
          <ul>
            <li>
              Payments may be processed through bank transfer, or through
              third-party payment gateways and payment service providers
              (e.g., card, digital wallet, or online payment processors)
              that we integrate with from time to time. Use of a third-party
              payment processor is also subject to that provider&apos;s own
              terms and privacy policy.
            </li>
            <li>
              All fees are quoted in the currency specified in the Order and
              are exclusive of any applicable taxes, duties, or bank/payment
              processing charges unless stated otherwise.
            </li>
            <li>
              Invoices are due on the date specified in the Order. Overdue
              payments may result in a pause of active work or services
              until payment is received.
            </li>
            <li>
              Free demo services described in our{" "}
              <Link
                href="/refund-policy"
                className="underline underline-offset-2"
              >
                Refund Policy
              </Link>{" "}
              are provided at no cost and do not create any payment
              obligation.
            </li>
            <li>
              Refunds, where applicable, are governed exclusively by our{" "}
              <Link
                href="/refund-policy"
                className="underline underline-offset-2"
              >
                Refund Policy
              </Link>
              .
            </li>
          </ul>

          <h2>6. Service Changes, Suspension &amp; Termination</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any part
            of our Services (including a specific feature, product, or
            support channel) at our discretion, with reasonable notice to
            active Clients where practical. We may suspend or terminate
            access to a Service immediately, without prior notice, if:
          </p>
          <ul>
            <li>You breach these Terms or the terms of an applicable Order;</li>
            <li>
              Payment for an active Service remains overdue after a
              reasonable notice period;
            </li>
            <li>
              We reasonably suspect fraud, abuse, or unlawful use of our
              Services; or
            </li>
            <li>
              Continuing the Service would expose us to legal or security
              risk.
            </li>
          </ul>
          <p>
            Either party may terminate an ongoing engagement in accordance
            with the termination clause of the applicable Order or proposal.
          </p>

          <h2>7. Prohibited Activities</h2>
          <p>You agree not to use our Services to:</p>
          <ul>
            <li>
              Violate any applicable local, national, or international law
              or regulation;
            </li>
            <li>
              Infringe the intellectual property, privacy, or other rights
              of any third party;
            </li>
            <li>
              Transmit malicious code, attempt unauthorized access to our
              systems, or interfere with the security or performance of our
              Services;
            </li>
            <li>
              Use our Services to build or support fraudulent, deceptive, or
              illegal products or platforms; or
            </li>
            <li>
              Reverse-engineer, resell, or sublicense our proprietary tools,
              frameworks, or products without our prior written consent.
            </li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <p>
            Unless otherwise agreed in writing (for example, in a
            work-for-hire or IP-transfer clause within an Order), all
            pre-existing tools, frameworks, methodologies, and proprietary
            software owned by {SITE.name} remain our exclusive property. Upon
            full payment for a custom development engagement, ownership of
            the specific deliverables created for the Client under that
            engagement transfers to the Client as described in the
            applicable Order, excluding any of our pre-existing IP,
            libraries, or reusable components embedded within it, which we
            retain the right to reuse across other projects.
          </p>
          <p>
            Our company name, logo, website content, and branding remain the
            exclusive property of {SITE.name} and may not be used without our
            prior written permission.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, {SITE.name}{" "}
            and its officers, employees, and contractors shall not be liable
            for any indirect, incidental, special, consequential, or
            punitive damages, including loss of profits, revenue, data, or
            business opportunity, arising out of or related to your use of
            our Services, even if we have been advised of the possibility of
            such damages.
          </p>
          <p>
            Our total aggregate liability arising out of or relating to any
            Service shall not exceed the total amount paid by the Client to
            us for that specific Service in the three (3) months preceding
            the event giving rise to the claim. Nothing in these Terms
            excludes or limits liability that cannot be excluded or limited
            under applicable law.
          </p>

          <h2>10. Privacy</h2>
          <p>
            We collect and process personal and business information you
            provide to us solely to deliver, invoice, and support our
            Services, and to communicate with you about your engagement. We
            do not sell your personal information to third parties. Payment
            details are processed directly by our payment partners and are
            not stored on our own systems beyond what is necessary for
            invoicing and support. A dedicated Privacy Policy detailing our
            data-handling practices in full will be made available and
            linked from this page as our service offering, including
            supported payment methods, expands.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the State of Wyoming, United States of America, without
            regard to its conflict-of-law principles, without prejudice to
            any mandatory consumer-protection or local laws that may apply
            to Clients based in Bangladesh, the United Arab Emirates, or
            elsewhere. Any dispute arising out of or relating to these Terms
            shall first be addressed through good-faith negotiation between
            the parties before either party pursues formal legal action.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time to reflect changes
            in our Services, business practices, or legal requirements. The
            &quot;Last updated&quot; date at the top of this page indicates
            when these Terms were last revised. Continued use of our
            Services after any update constitutes acceptance of the revised
            Terms.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about these Terms &amp; Conditions,
            please contact us:
          </p>
          <ul>
            <li>Email: {SITE.email}</li>
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
            <li>
              Registered US Address: {SITE.offices.find((o) => o.code === "us")?.address}
            </li>
          </ul>
        </article>

        <div className="max-w-3xl mx-auto mt-12 rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,transparent),color-mix(in_oklab,var(--accent-2)_10%,transparent))] p-8 text-center sm:text-left">
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Questions about these Terms?
          </h3>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Our team is happy to walk you through any clause before you sign
            an Order or make a payment.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <Button
              href={whatsappLink("Hi! I have a question about your Terms & Conditions.")}
              external
              variant="whatsapp"
              size="md"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
            <Button href={`mailto:${SITE.email}`} external variant="outline" size="md">
              <Mail className="h-4 w-4" />
              {SITE.email}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
