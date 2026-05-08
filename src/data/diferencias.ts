export interface Diferencia {
  id: number;
  titulo: string;
  nosotros: string;
  otros: string;
  cierre: string;
}

const diferencias: Diferencia[] = [
  {
    id: 1,
    titulo: 'Diseño del espacio',
    nosotros: 'Edificio diseñado desde cero para contingentes escolares',
    otros: 'Espacios adaptados para recibir grupos escolares',
    cierre:
      'Cuando llegan 80, 120 o 180 chicos, se nota si el espacio fue pensado o simplemente adaptado.',
  },
  {
    id: 2,
    titulo: 'Supervisión',
    nosotros: 'Cuarto de monitoreo central con cámaras del complejo',
    otros: 'Supervisión basada en recorrido manual de pasillos',
    cierre:
      'La supervisión nocturna puede improvisarse caminando pasillos, o apoyarse en un sistema de monitoreo.',
  },
  {
    id: 3,
    titulo: 'Descanso',
    nosotros:
      'Colchones de alta densidad con sábanas, frazadas y toallas incluidas',
    otros: 'Bolsa de dormir y frazada que cada chico debe llevar',
    cierre:
      'Un grupo que descansa bien tiene mejor ánimo, menos conflictos y más energía al día siguiente.',
  },
  {
    id: 4,
    titulo: 'Habitaciones',
    nosotros:
      'Habitaciones con aire acondicionado frío/calor y cortinas blackout',
    otros: 'Espacios sin climatización ni control de luz',
    cierre:
      'No es lujo: es operación. La calidad del descanso impacta directamente en la jornada del día siguiente.',
  },
  {
    id: 5,
    titulo: 'Experiencia completa',
    nosotros:
      'Alojamiento, comidas y actividades base coordinadas en un solo paquete',
    otros: 'Alojamiento, comidas y actividades contratadas por separado',
    cierre:
      'Coordinar un viaje educativo con varios proveedores multiplica la logística previa y los riesgos del día a día.',
  },
];

export default diferencias;
