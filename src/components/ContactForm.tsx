import { useState, type ChangeEvent, type FormEvent } from 'react'

interface FormValues {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMPTY_FORM: FormValues = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const SUCCESS_MESSAGE = 'Thank you! Your message has been sent.'

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Message is required.'
  return errors
}

/** Simulates a network request so the "Sending…" state is visible. No backend needed. */
function fakeSubmit(_values: FormValues): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 700))
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as the user starts fixing it.
    if (errors[name as keyof FormValues]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = (Object.keys(nextErrors) as (keyof FormValues)[])[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    await fakeSubmit(values)

    // ─────────────────────────────────────────────────────────────────────
    // 🔧 DEMO BREAK POINT #1 — SUCCESS MESSAGE
    // To break the contact form for a TestSprite demo, change the line below to:
    //
    //     setStatus('idle')
    //
    // The form will appear to submit ("Sending…") but the success message
    // "Thank you! Your message has been sent." will never appear.
    // ─────────────────────────────────────────────────────────────────────
    setStatus('success')
    setValues(EMPTY_FORM)
  }

  function handleReset() {
    setStatus('idle')
    setErrors({})
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
        Contact us
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Questions, feedback, or a product idea? We usually reply within one business day.
      </p>

      {status === 'success' ? (
        <div
          role="status"
          className="mt-6 flex flex-col items-center rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center"
          data-testid="contact-success"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <p className="mt-4 text-lg font-semibold text-emerald-900" data-testid="contact-success-message">
            {SUCCESS_MESSAGE}
          </p>
          <p className="mt-1 text-sm text-emerald-700">We&apos;ll get back to you soon.</p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 inline-flex h-10 items-center rounded-xl bg-white px-4 text-sm font-semibold text-emerald-800 shadow-sm ring-1 ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            data-testid="contact-send-another"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 grid gap-5"
          aria-label="Contact form"
          data-testid="contact-form"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="contact-name"
              name="name"
              label="Name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Jane Doe"
            />
            <Field
              id="contact-email"
              name="email"
              type="email"
              label="Email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="jane@example.com"
            />
          </div>
          <Field
            id="contact-message"
            name="message"
            label="Message"
            value={values.message}
            error={errors.message}
            onChange={handleChange}
            placeholder="How can we help?"
            multiline
          />

          <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">All fields are required.</p>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              data-testid="contact-submit"
            >
              {status === 'submitting' && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              )}
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

interface FieldProps {
  id: string
  name: keyof FormValues
  label: string
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  autoComplete?: string
  placeholder?: string
  multiline?: boolean
}

function Field({ id, name, label, value, error, onChange, type = 'text', autoComplete, placeholder, multiline }: FieldProps) {
  const errorId = `${id}-error`
  const inputClasses = `block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
    error
      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
  }`
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    required: true,
    'aria-required': true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'data-testid': `contact-${name}-input`,
    className: inputClasses,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} className={`${inputClasses} resize-y`} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-rose-600" data-testid={`contact-${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
