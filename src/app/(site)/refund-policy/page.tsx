import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Mail, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SITE, whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for Just Soft Solution — free demo service, 7-day trial period on paid services, and how to request a refund.",
  alternates: { canonical: "/refund-policy" },
};

const LAST_UPDATED = "July 14, 2026";

export default function RefundPolicyPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Legal
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Refund <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            We want you to be confident before you pay us anything. That&apos;s
            why every engagement starts with a free demo, and every paid
            service starts with a 7-day trial period.
          </p>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <article className="prose-jss max-w-3xl mx-auto">
          <h2>1. Free Demo Service</h2>
          <p>
            Every new client is entitled to a Free Demo Service before making
            any payment. The demo is provided entirely free of charge and
            carries no payment obligation of any kind. Its purpose is to let
            you evaluate our work, communication, and approach before
            committing to a Paid Service.
          </p>
          <p>
            After the demo, you may choose to proceed to a Paid Service, or
            you may choose not to continue — either way, no fees apply for
            the demo itself.
          </p>

          <h2>2. 7-Day Trial Period on Paid Services</h2>
          <p>
            Once you decide to proceed with a Paid Service, your subscription
            or engagement includes a 7-day trial period, starting from the
            date the Paid Service is activated. During this period, you can
            experience the full service in a live setting.
          </p>
          <p>
            If, within these 7 days, the Paid Service does not meet the
            expectations set out in your Order or proposal, you are entitled
            to submit a Refund Request as described below.
          </p>

          <h2>3. How to Request a Refund</h2>
          <p>
            To request a refund within the 7-day trial period, please
            contact us with your account/order details and the reason for
            your request:
          </p>
          <ul>
            <li>Email: {SITE.email}</li>
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
          </ul>
          <p>
            Please include your name/company, the service or Order in
            question, the date the Paid Service was activated, and a clear
            description of why the service did not meet your expectations.
            This helps us review your request quickly and fairly.
          </p>

          <h2>4. Review Process</h2>
          <p>
            Once we receive your Refund Request, our team will review the
            circumstances of your engagement, including the deliverables
            provided, communication history, and the reason stated in your
            request. We aim to be fair and reasonable: if your concern is
            valid and the Paid Service genuinely did not deliver what was
            agreed, we will approve the refund.
          </p>
          <p>
            We may reach out to you during the review for clarification or
            additional information before making a final decision.
          </p>

          <h2>5. Refund Processing Time</h2>
          <p>
            We aim to complete our review and communicate a decision within
            5–7 business days of receiving a complete Refund Request.
            Approved refunds are processed back to the original payment
            method (or, where that is not possible, through bank transfer)
            within 7–14 business days of approval, depending on your bank or
            payment provider&apos;s processing times, which are outside our
            control.
          </p>

          <h2>6. When Refunds Do Not Apply</h2>
          <p>A refund will not be granted where:</p>
          <ul>
            <li>
              The Refund Request is submitted after the 7-day trial period
              has ended;
            </li>
            <li>
              The service was delivered substantially as agreed in the Order
              or proposal, and the request is based on a change of mind
              rather than a genuine service shortfall;
            </li>
            <li>
              There is evidence of misuse, abuse, or fraudulent activity in
              connection with the account or service;
            </li>
            <li>
              The request relates to a violation of our{" "}
              <Link href="/terms-and-conditions" className="underline underline-offset-2">
                Terms &amp; Conditions
              </Link>{" "}
              by the Client; or
            </li>
            <li>
              The service in question is a custom development milestone that
              has already been approved and accepted by the Client in
              writing.
            </li>
          </ul>
          <p>
            This policy applies specifically to standard Paid Services with a
            7-day trial. Bespoke, milestone-based custom development
            projects are governed by the refund/cancellation terms set out
            in their specific Order or proposal, where those terms differ
            from this policy.
          </p>

          <h2>7. Our Commitment</h2>
          <p>
            We built this policy — a genuinely free demo, followed by a
            no-pressure 7-day trial on every paid engagement — so that you
            never have to pay before you&apos;re confident {SITE.name} is the
            right fit. We review every Refund Request in good faith and in
            line with this policy and our{" "}
            <Link href="/terms-and-conditions" className="underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
            .
          </p>

          <h2>8. Contact Us About a Refund</h2>
          <p>
            If you have any questions about this Refund Policy, or would
            like to submit a Refund Request, please reach out:
          </p>
          <ul>
            <li>Email: {SITE.email}</li>
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
          </ul>
        </article>

        <div className="max-w-3xl mx-auto mt-12 rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,transparent),color-mix(in_oklab,var(--accent-2)_10%,transparent))] p-8 text-center sm:text-left">
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Need to request a refund?
          </h3>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Message us with your order details and we&apos;ll review it
            within 5–7 business days.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <Button
              href={whatsappLink("Hi! I'd like to request a refund for my order.")}
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
