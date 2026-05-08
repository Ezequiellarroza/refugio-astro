/**
 * Datos del formulario de contacto de Refugio del Valle.
 * Los campos coinciden con los inputs del formulario y con
 * los campos esperados por el endpoint /api/contacto.php.
 */
export interface ContactoFormData {
  nombre: string;
  paraQuienes: string;
  cantidad: string;
  edades: string;
  fecha: string;
  noches: string;
  email: string;
  telefono: string;
  experiencia: string;
  comoNosConociste: string;
  /**
   * Campo honeypot: debe estar SIEMPRE vacío cuando un humano envía el form.
   * Si llega con contenido, asumimos que es un bot y descartamos el envío.
   */
  website: string;
}

/**
 * Respuesta esperada del endpoint /api/contacto.php
 */
export interface ContactoApiResponse {
  ok: boolean;
  message: string;
}

/**
 * Estados posibles del envío del formulario en el cliente.
 */
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Valores iniciales del formulario.
 */
export const INITIAL_FORM_DATA: ContactoFormData = {
  nombre: '',
  paraQuienes: '',
  cantidad: '',
  edades: '',
  fecha: '',
  noches: '',
  email: '',
  telefono: '',
  experiencia: '',
  comoNosConociste: '',
  website: '',
};
