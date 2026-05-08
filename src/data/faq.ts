export interface FaqItem {
  question: string;
  answer: string;
}

const faq: FaqItem[] = [
  {
    question: '¿Cuántos alumnos pueden alojarse?',
    answer:
      'Contamos con capacidad total para hasta 180 huéspedes, distribuidos entre El Refugio (120 pax) y El Mirador (60 pax).',
  },
  {
    question: '¿A qué distancia están de Buenos Aires?',
    answer:
      'Estamos a 360 km de la Ciudad Autónoma de Buenos Aires, aproximadamente 4 horas de viaje por ruta.',
  },
  {
    question: '¿Qué incluye el paquete estándar?',
    answer:
      'Incluye alojamiento, pensión completa (desayuno, almuerzo, merienda y cena), todas las actividades programadas, coordinadores y seguro.',
  },
  {
    question: '¿Es accesible para personas con movilidad reducida?',
    answer:
      'Sí. El Refugio del Valle es 100% accesible. Contamos con rampas, baños adaptados y senderos accesibles para que todos puedan disfrutar de la experiencia.',
  },
  {
    question: '¿Cuentan con servicio médico?',
    answer:
      'Contamos con un Área Cardio Protegida con desfibrilador externo automático (DEA) y personal capacitado en RCP. Además, Tandil cuenta con hospitales y clínicas a minutos del predio.',
  },
  {
    question: '¿Qué medidas de seguridad tienen?',
    answer:
      'Seguro integral para todos los huéspedes, personal de seguridad 24 hs, protocolos de emergencia, matafuegos en todas las áreas, iluminación perimetral y cámaras de seguridad.',
  },
  {
    question: '¿Los docentes se alojan con los alumnos?',
    answer:
      'Los docentes y acompañantes cuentan con habitaciones privadas separadas dentro del mismo predio, con todas las comodidades.',
  },
  {
    question: '¿Se puede personalizar el programa de actividades?',
    answer:
      'Sí, armamos el programa a medida según las necesidades de cada institución. Podés elegir actividades, duración y enfoque temático.',
  },
  {
    question: '¿Qué tipo de comida sirven?',
    answer:
      'Menú variado con opciones para celíacos, vegetarianos y alérgicos. Cocina industrial propia con capacidad para atender a todos los huéspedes simultáneamente.',
  },
  {
    question: '¿Tienen pileta o natatorio?',
    answer:
      'Contamos con pileta al aire libre para uso recreativo en temporada, con guardavidas matriculado.',
  },
  {
    question: '¿Qué pasa si llueve?',
    answer:
      'Tenemos un SUM de 200 m² y salón comedor de 100 m² para actividades bajo techo. El programa siempre incluye alternativas para días de lluvia.',
  },
  {
    question: '¿Desde qué edad reciben grupos?',
    answer:
      'Recibimos grupos a partir de nivel primario (desde 4to grado aproximadamente) hasta nivel secundario y universitario.',
  },
  {
    question: '¿Cuánto dura la estadía típica?',
    answer:
      'La estadía más común es de 3 días y 2 noches, pero se puede adaptar a 2, 4 o más días según la necesidad del grupo.',
  },
  {
    question: '¿Cómo es el English Camp?',
    answer:
      'Es un programa de inmersión en inglés de 3 días y 2 noches, a cargo de Fase 2 con más de 15 años de experiencia. Incluye counselors nativos y actividades 100% en inglés.',
  },
  {
    question: '¿Tienen conectividad WiFi?',
    answer:
      'Sí, contamos con WiFi en las áreas comunes. Sin embargo, fomentamos la desconexión digital para disfrutar plenamente de la experiencia.',
  },
  {
    question: '¿Cómo se realiza la reserva?',
    answer:
      'Contactanos por WhatsApp o teléfono para coordinar fecha y detalles. Luego enviamos la propuesta formal y se confirma con una seña.',
  },
  {
    question: '¿Ofrecen facturación para instituciones?',
    answer:
      'Sí, emitimos factura A o B según corresponda. Trabajamos habitualmente con colegios privados y públicos.',
  },
];

export default faq;