import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactMessage } from "@/lib/contact.functions";
function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs = {};
      for (const issue of parsed.error.issues) errs[issue.path[0]] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
      } else {
        setServerError(res.error);
        setStatus("error");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }
  const field = (key, label, type = "text") => (
    <div>
      <label htmlFor={key} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {key === "message" ? (
        <textarea
          id={key}
          rows={5}
          value={values[key]}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-err` : undefined}
          className="input"
        />
      ) : (
        <input
          id={key}
          type={type}
          value={values[key]}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-err` : undefined}
          className="input"
        />
      )}
      {errors[key] && (
        <p id={`${key}-err`} className="mt-1 text-sm text-destructive">
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border bg-card p-6 shadow-soft md:p-8"
    >
      {field("name", "Name")}
      {field("email", "Email", "email")}
      {field("message", "Message")}
      <button type="submit" disabled={status === "sending"} className="btn-accent w-full">
        {status === "sending" ? "Sending\u2026" : "Send message"}
      </button>
      <div aria-live="polite">
        {status === "sent" && (
          <p className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
            Thanks! Your message was sent.
          </p>
        )}
        {status === "error" && <p className="text-sm text-destructive">{serverError}</p>}
      </div>
    </form>
  );
}
export { ContactForm };
