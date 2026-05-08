export interface FichaOperativaItem {
  label: string;
  valor: string;
}

export interface ContenidoModalItem {
  subtitulo: string;
  descripcion: string;
}

export interface Actividad {
  id: string;
  titulo: string;
  atributo: string;
  descripcionBreve: string;
  fichaOperativa: FichaOperativaItem[];
  contenidoModal: ContenidoModalItem[];
}

const actividades: Actividad[] = [
  {
    id: 'orientacion',
    titulo: 'Dinámica de Orientación',
    atributo: 'Autonomía Responsable y Lectura del Entorno',
    descripcionBreve: 'Ejercicio de rigor analítico y lectura crítica del entorno para la toma de decisiones informada.',
    fichaOperativa: [
      { label: 'Objetivo Primario', valor: 'Optimización del pensamiento lógico y toma de decisiones.' },
      { label: 'Metodología', valor: 'Navegación técnica mediante cartografía por puntos de control.' },
      { label: 'Tiempo de Ejecución', valor: '60 a 90 minutos.' },
    ],
    contenidoModal: [
      { subtitulo: 'Navegación Técnica', descripcion: 'Utilización de cartografía específica del predio para la identificación de hitos geográficos.' },
      { subtitulo: 'Coordinación de Equipos', descripcion: 'Cada grupo opera bajo un esquema de co-creación donde la comunicación es el único camino al éxito.' },
      { subtitulo: 'Seguridad Integral', descripcion: 'Dinámica desarrollada íntegramente dentro de nuestra infraestructura privada bajo supervisión constante.' },
    ],
  },
  {
    id: 'trekking',
    titulo: 'Reconocimiento del Territorio',
    atributo: 'Análisis Ambiental y Gestión de Campo',
    descripcionBreve: 'Inducción técnica de 24 hectáreas para establecer un marco de previsibilidad y orden desde el inicio.',
    fichaOperativa: [
      { label: 'Objeto de Estudio', valor: 'Interpretación de ecosistemas, geología y patrimonio.' },
      { label: 'Fase Táctica', valor: 'Recomendado para la apertura del programa (Día 1).' },
      { label: 'Alcance', valor: 'Análisis científico del sistema de Tandilia.' },
    ],
    contenidoModal: [
      { subtitulo: 'Análisis de Biodiversidad', descripcion: 'Identificación técnica de especies autóctonas y endémicas (Baccharis tandilense).' },
      { subtitulo: 'Geología Aplicada', descripcion: 'Estudio de la formación de las sierras con más de 2.500 millones de años de antigüedad.' },
      { subtitulo: 'Patrimonio e Historia', descripcion: 'Recorrido por hitos culturales como la Capilla Santa Cecilia para integrar la memoria histórica.' },
    ],
  },
  {
    id: 'realidad-virtual',
    titulo: 'Inmersión Tecnológica',
    atributo: 'Perspectiva Histórica y Prospectiva',
    descripcionBreve: 'Decodificación de la evolución del territorio mediante tecnología Meta Quest de alta precisión.',
    fichaOperativa: [
      { label: 'Equipamiento', valor: 'Unidades Meta Quest con reconocimiento gestual.' },
      { label: 'Capacidad Operativa', valor: '10 estaciones de trabajo simultáneas con monitoreo.' },
      { label: 'Objetivo Pedagógico', valor: 'Decodificación de procesos geológicos e industriales.' },
    ],
    contenidoModal: [
      { subtitulo: 'Análisis Multidimensional', descripcion: 'Secuencia cronológica desde la génesis de Tandilia hasta los modelos actuales de producción.' },
      { subtitulo: 'Interacción de Alta Precisión', descripcion: 'El sistema permite la manipulación de elementos virtuales, fomentando una comprensión empírica.' },
      { subtitulo: 'Contextualización Territorial', descripcion: 'Puente de idoneidad entre el conocimiento académico y la observación de campo real.' },
    ],
  },
  {
    id: 'fogon',
    titulo: 'Cohesión de Equipos',
    atributo: 'Dinámica de Cierre Institucional',
    descripcionBreve: 'Espacio de gestión de experiencias diseñado para consolidar los vínculos y la identidad grupal.',
    fichaOperativa: [
      { label: 'Objetivo Primario', valor: 'Fortalecimiento de la cohesión y la escucha activa.' },
      { label: 'Infraestructura', valor: 'Espacio técnico diseñado para la seguridad y el control de dinámicas.' },
    ],
    contenidoModal: [
      { subtitulo: 'Optimización del Clima', descripcion: 'El fuego como eje central permite focalizar la atención y generar silencio consciente.' },
      { subtitulo: 'Protocolos de Integración', descripcion: 'Desafíos colectivos que eliminan tensiones y promueven la identidad del curso.' },
      { subtitulo: 'Cierre Operativo', descripcion: 'Refuerzo del sentido de pertenencia y preparación para los objetivos del día siguiente.' },
    ],
  },
  {
    id: 'zoom',
    titulo: 'Observación Crítica',
    atributo: 'Memoria Operativa y Estrategia Grupal',
    descripcionBreve: 'Desafío de reconocimiento territorial avanzado mediante micro-análisis visual y decodificación del entorno.',
    fichaOperativa: [
      { label: 'Metodología', valor: 'Navegación por micro-análisis visual y memoria de corto plazo.' },
      { label: 'Objetivo Primario', valor: 'Fortalecimiento de la comunicación interna y distribución de roles.' },
    ],
    contenidoModal: [
      { subtitulo: 'Análisis de Detalle', descripcion: 'Exige observación minuciosa de fragmentos de la infraestructura real para decodificar el entorno.' },
      { subtitulo: 'Memoria Activa', descripcion: 'Sin registro físico de datos, se fuerza la retención de secuencias de información para el logro colectivo.' },
      { subtitulo: 'Detección de Liderazgo', descripcion: 'Permite identificar líderes positivos a través de una canalización ordenada de la energía competitiva.' },
    ],
  },
  {
    id: 'abeja',
    titulo: 'Análisis de Biodiversidad',
    atributo: 'Sistemas Productivos y Gestión de Ecosistemas',
    descripcionBreve: 'Estudio técnico de la gestión de ecosistemas mediante observación controlada de una colmena activa.',
    fichaOperativa: [
      { label: 'Infraestructura', valor: 'Sistema de observación blindado (cristal de 1.5m × 0.5m).' },
      { label: 'Sujeto de Estudio', valor: 'Colmena activa de 80.000 individuos en entorno seguro.' },
    ],
    contenidoModal: [
      { subtitulo: 'Monitoreo Biotecnológico', descripcion: 'Observación en tiempo real de ciclos de polinización y producción técnica de miel.' },
      { subtitulo: 'Integración Económica', descripcion: 'Acceso a un catálogo de activos regionales de producción controlada: quesos, chacinados, dulces.' },
      { subtitulo: 'Consumo Responsable', descripcion: 'Introducción a la gestión financiera y modelos de economía local sin intermediarios.' },
    ],
  },
  {
    id: 'arqueria',
    titulo: 'Disciplinas de Precisión',
    atributo: 'Gestión del Autocontrol y Foco Operativo',
    descripcionBreve: 'Entrenamiento en rigor y estabilidad emocional mediante equipamiento profesional Prana Archery.',
    fichaOperativa: [
      { label: 'Equipamiento', valor: 'Arcos recurvados Prana Archery - Gold Medal con mira punto rojo.' },
      { label: 'Protocolo', valor: 'Charla técnica obligatoria y supervisión directa por especialistas.' },
    ],
    contenidoModal: [
      { subtitulo: 'Infraestructura de Precisión', descripcion: 'Equipamiento robusto diseñado para la iniciación técnica con potencias reguladas.' },
      { subtitulo: 'Análisis Postural', descripcion: 'Corrección personalizada de la técnica de respiración y tensión para optimizar el rendimiento.' },
      { subtitulo: 'Gestión de Turnos', descripcion: 'Fomento del respeto por los tiempos y co-creación de un ambiente de calma institucional.' },
    ],
  },
  {
    id: 'matinee',
    titulo: 'Integración Grupal',
    atributo: 'Socialización Controlada y Celebración',
    descripcionBreve: 'Espacio de socialización bajo estrictos protocolos de previsibilidad y seguridad absoluta.',
    fichaOperativa: [
      { label: 'Módulos', valor: 'Salones Refugio, Mirador y La Huella (Equipamiento Pro).' },
      { label: 'Equipamiento', valor: 'Iluminación UV, efectos atmosféricos y audio de alta fidelidad.' },
    ],
    contenidoModal: [
      { subtitulo: 'Entorno Controlado', descripcion: 'Actividad desarrollada íntegramente dentro del predio, eliminando riesgos externos.' },
      { subtitulo: 'Alineación Institucional', descripcion: 'Curaduría de contenidos bajo acuerdos profesionales previos con los coordinadores.' },
      { subtitulo: 'Idoneidad en la Animación', descripcion: 'Dinámicas que favorecen la desinhibición positiva y el respeto mutuo.' },
    ],
  },
  {
    id: 'cocina',
    titulo: 'Gastronomía Técnica',
    atributo: 'Gestión de Procesos y Autonomía Responsable',
    descripcionBreve: 'Laboratorio de campo donde el grupo gestiona la cadena de producción alimentaria y el trabajo coordinado.',
    fichaOperativa: [
      { label: 'Metodología', valor: 'Taller participativo de elaboración de activos alimentarios.' },
      { label: 'Tiempo', valor: '120 minutos de gestión integral de recursos.' },
    ],
    contenidoModal: [
      { subtitulo: 'Distribución de Roles', descripcion: 'Los equipos gestionan la preparación, cocción y mantenimiento de la infraestructura.' },
      { subtitulo: 'Protocolos de Higiene', descripcion: 'Normas estrictas de manipulación para mitigar riesgos en entornos abiertos.' },
      { subtitulo: 'Valoración del Logro', descripcion: 'El consumo de lo producido refuerza el orgullo por el trabajo colectivo bien ejecutado.' },
    ],
  },
  {
    id: 'sustentabilidad',
    titulo: 'Gestión de Sustentabilidad',
    atributo: 'Eficiencia Energética y Tecnología Ambiental',
    descripcionBreve: 'Auditoría de infraestructura de vanguardia — energía solar, eólica y tratamiento hídrico — en funcionamiento real.',
    fichaOperativa: [
      { label: 'Energía', valor: 'Sistemas fotovoltaicos, térmicos y eólicos (Eficiencia 15-22%).' },
      { label: 'Gestión Hídrica', valor: 'Planta de tratamiento de efluentes (física, química, biológica).' },
      { label: 'Electromovilidad', valor: 'Vehículo interno con eficiencia superior al 90%.' },
    ],
    contenidoModal: [
      { subtitulo: 'Optimización de Recursos', descripcion: 'Evaluación de sistemas térmicos que garantizan ahorros energéticos de hasta el 70%.' },
      { subtitulo: 'Economía Circular', descripcion: 'Protocolos de separación y recuperación de polímeros para mitigar el impacto ambiental.' },
      { subtitulo: 'Derecho al Recurso', descripcion: 'Reflexión técnica sobre el acceso al agua mediante sistemas de bombeo solar.' },
    ],
  },
  {
    id: 'codigo-secreto',
    titulo: 'Inteligencia Colectiva',
    atributo: 'Decodificación y Memoria Distribuida',
    descripcionBreve: 'Desafío cognitivo de procesamiento de datos imposibles de resolver de forma individual.',
    fichaOperativa: [
      { label: 'Metodología', valor: 'Decodificación de algoritmos alfanuméricos mediante fragmentación de datos.' },
      { label: 'Objetivo', valor: 'Fortalecimiento de la memoria colectiva bajo presión controlada.' },
    ],
    contenidoModal: [
      { subtitulo: 'Fragmentación de Datos', descripcion: 'El código es imposible de memorizar individualmente; exige organización por roles.' },
      { subtitulo: 'Comunicación Transparente', descripcion: 'La reconstrucción del código valida la confianza inter-dependiente del grupo.' },
      { subtitulo: 'Seguridad y Control', descripcion: 'Clima de misterio gestionado dentro de parámetros de estricta previsibilidad.' },
    ],
  },
  {
    id: 'astronomia',
    titulo: 'Perspectiva Cosmológica',
    atributo: 'Análisis del Entorno y Pensamiento Crítico',
    descripcionBreve: 'Decodificación de fenómenos astronómicos en entorno de Calm Tech y baja contaminación lumínica.',
    fichaOperativa: [
      { label: 'Infraestructura', valor: 'Área seleccionada por su nula interferencia lumínica.' },
      { label: 'Objetivo', valor: 'Decodificación de fenómenos astronómicos en contexto real.' },
    ],
    contenidoModal: [
      { subtitulo: 'Mapeo Estelar', descripcion: 'Identificación técnica de constelaciones y fases lunares, eliminando la abstracción del aula.' },
      { subtitulo: 'Orientación Nocturna', descripcion: 'Análisis de la relación entre posicionamiento terrestre y dinámica celeste.' },
      { subtitulo: 'Diálogo Estratégico', descripcion: 'Sesiones diseñadas para fomentar el método científico y la reflexión sobre el cuidado del planeta.' },
    ],
  },
  {
    id: 'metegol',
    titulo: 'Coordinación Grupal',
    atributo: 'Estrategia y Operatividad Colectiva',
    descripcionBreve: 'Ejercicio de previsibilidad y comunicación táctica mediante restricción técnica de movimiento.',
    fichaOperativa: [
      { label: 'Formato', valor: 'Confrontación estratégica de 9 vs 9 integrantes.' },
      { label: 'Sujeción', valor: 'Arnés técnico con radio de maniobra restringido a 2m.' },
    ],
    contenidoModal: [
      { subtitulo: 'Estrategia sobre Destreza', descripcion: 'La limitación física obliga a una comunicación táctica constante para el éxito colectivo.' },
      { subtitulo: 'Arbitraje Profesional', descripcion: 'Personal especializado que modera el juego limpio bajo estándares institucionales.' },
      { subtitulo: 'Inclusión Total', descripcion: 'Protocolos de rotación que aseguran la participación del 100% del contingente.' },
    ],
  },
  {
    id: 'parque-aereo',
    titulo: 'Gestión de Riesgo y Superación',
    atributo: 'Infraestructura de Aventura en Altura',
    descripcionBreve: 'Desafío de alta complejidad bajo normativas europeas y sistema de línea de vida continua ITALIANA KONG®.',
    fichaOperativa: [
      { label: 'Seguridad', valor: 'Línea de vida continua ITALIANA KONG® (sin desconexión accidental).' },
      { label: 'Certificación', valor: 'Normas Europeas EN 15567-1 y EN 15567-2.' },
      { label: 'Equipamiento', valor: 'Arneses Kong y Cascos Petzl con trazabilidad certificada.' },
    ],
    contenidoModal: [
      { subtitulo: 'Error Humano Cero', descripcion: 'El sistema de conexión elimina la posibilidad de manipulación incorrecta por parte del usuario.' },
      { subtitulo: 'Progresión Logística', descripcion: '21 puentes y 7 tirolesas diseñados para una adaptación gradual a la altura y dificultad.' },
      { subtitulo: 'Idoneidad del Staff', descripcion: 'Personal entrenado específicamente en protocolos de evacuación y rescate en altura.' },
    ],
  },
];

export default actividades;
