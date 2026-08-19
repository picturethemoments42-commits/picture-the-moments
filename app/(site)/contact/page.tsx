import { Send } from "lucide-react";
import { getContactPage } from "@/lib/queries";

export const metadata = {
  title: "Contact | Picture the Moment"
};

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <main className="px-6 pb-28 pt-40 md:px-8">
      <section className="mx-auto grid max-w-container gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contact</p>
          <h1 className="font-serif text-5xl leading-tight text-ivory md:text-7xl">{page.heading}</h1>
          <p className="mt-7 text-base font-light leading-8 text-muted">{page.intro}</p>
          <div className="gold-divider my-10" />
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>{page.email}</p>
            <p>{page.phone}</p>
            <p>{page.address}</p>
          </div>
        </div>
        <form className="space-y-8 md:col-span-6 md:col-start-7">
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Your Name
            <input className="field mt-2" name="name" autoComplete="name" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Email
            <input className="field mt-2" name="email" type="email" autoComplete="email" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Event Type
            <select className="field mt-2" name="eventType" defaultValue="">
              <option value="" disabled>Select a story type</option>
              {page.eventTypes.map((eventType) => (
                <option key={eventType} value={eventType}>{eventType}</option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Date and Location
            <input className="field mt-2" name="dateLocation" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Tell Us More
            <textarea className="field mt-2 min-h-36 resize-y" name="message" />
          </label>
          <button className="btn-primary" type="submit">
            Send Enquiry <Send size={15} />
          </button>
        </form>
      </section>
    </main>
  );
}
