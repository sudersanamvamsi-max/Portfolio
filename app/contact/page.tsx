import ContactForm from "@/components/ContactForm";
import { email, openTo } from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("Contact", "Open to PhD conversations and to research engineer or research assistant roles in clinical informatics.", "/contact");

export default function Contact() {
  return (
    <>
      <h1 className="text-4xl font-medium leading-tight">Contact me</h1>
      <p className="mt-3 max-w-measure">{openTo}</p>
      <p className="mt-3 max-w-measure">
        Write to me at <a href={`mailto:${email}`}>{email}</a>, or use the form.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </>
  );
}
