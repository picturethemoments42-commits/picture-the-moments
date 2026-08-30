import { getContactPage } from "@/lib/queries";
import { ContactBento } from "@/components/ContactBento";
import { CtaSection } from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Picture the moments"
};

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <main className="px-6 pb-28 pt-40 md:px-8">
      <section className="mx-auto grid max-w-container gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contact</p>
          <h1 className="font-serif text-4xl leading-tight text-ivory md:text-6xl">{page.heading}</h1>
          <p className="mt-7 text-base font-light leading-8 text-muted">{page.intro}</p>
          <div className="gold-divider my-10" />
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>{page.email}</p>
            <p>{page.phone}</p>
            <p>{page.address}</p>
          </div>
        </div>
        <ContactForm eventTypes={page.eventTypes} />
      </section>

      <ContactBento />

      <CtaSection showConsultCta={false} />
    </main>
  );
}
