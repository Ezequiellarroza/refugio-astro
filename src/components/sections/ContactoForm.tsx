import { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import {
  type ContactoFormData,
  type ContactoApiResponse,
  type SubmitStatus,
  INITIAL_FORM_DATA,
} from '@/types/contacto';

const inputClass =
  'w-full rounded-lg border border-piedra-clara px-4 py-3 text-oscuro transition-colors focus:border-verde-sierra focus:outline-none';

export default function ContactoForm() {
  const [form, setForm] = useState<ContactoFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contacto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data: ContactoApiResponse = await response.json();

      if (response.ok && data.ok) {
        setStatus('success');
        setForm(INITIAL_FORM_DATA);
      } else {
        setStatus('error');
        setErrorMessage(
          data.message ||
            'No pudimos enviar tu consulta. Por favor, escribinos por WhatsApp.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Hubo un problema de conexión. Por favor, escribinos por WhatsApp.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-verde-sierra/10 text-verde-sierra">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-verde-bosque">
          ¡Gracias por tu consulta!
        </h3>
        <p className="mt-3 text-oscuro-suave/80">
          Recibimos tu mensaje y te responderemos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-xl"
      noValidate
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label
            htmlFor="paraQuienes"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Para quiénes es la estadía?
          </label>
          <input
            id="paraQuienes"
            type="text"
            name="paraQuienes"
            value={form.paraQuienes}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ej: Colegio secundario, viaje de egresados..."
          />
        </div>

        <div>
          <label
            htmlFor="cantidad"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Cuántos son aproximadamente?
          </label>
          <input
            id="cantidad"
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            min="1"
            className={inputClass}
            placeholder="Cantidad de personas"
          />
        </div>

        <div>
          <label
            htmlFor="edades"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Cuál es el promedio de edades?
          </label>
          <input
            id="edades"
            type="number"
            name="edades"
            value={form.edades}
            onChange={handleChange}
            min="1"
            max="99"
            className={inputClass}
            placeholder="Ej: 15"
          />
        </div>

        <div>
          <label
            htmlFor="fecha"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Tienen fecha pensada?
          </label>
          <input
            id="fecha"
            type="text"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ej: Marzo 2026, no tenemos fecha aún..."
          />
        </div>

        <div>
          <label
            htmlFor="noches"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Cuántas noches se quedarían?
          </label>
          <input
            id="noches"
            type="number"
            name="noches"
            value={form.noches}
            onChange={handleChange}
            min="1"
            className={inputClass}
            placeholder="Cantidad de noches"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            Tu correo electrónico
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className={inputClass}
            placeholder="Tu número de contacto"
          />
        </div>

        <div>
          <label
            htmlFor="experiencia"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Qué tipo de experiencia están buscando?
          </label>
          <textarea
            id="experiencia"
            name="experiencia"
            value={form.experiencia}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Contanos qué imaginan para la experiencia..."
          />
        </div>

        <div>
          <label
            htmlFor="comoNosConociste"
            className="mb-1 block text-sm font-medium text-oscuro-suave"
          >
            ¿Cómo nos conociste?
          </label>
          <input
            id="comoNosConociste"
            type="text"
            name="comoNosConociste"
            value={form.comoNosConociste}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ej: Instagram, recomendación, Google..."
          />
        </div>

        {/* Honeypot anti-spam — invisible para humanos, visible para bots */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor="website">No completar este campo</label>
          <input
            id="website"
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-block w-full rounded-lg bg-verde-sierra px-8 py-4 text-center text-lg font-medium font-body text-white transition-all duration-300 hover:bg-verde-bosque hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-verde-sierra disabled:hover:shadow-none cursor-pointer"
      >
        {status === 'submitting' ? 'Enviando...' : 'Enviar consulta'}
      </button>
    </form>
  );
}