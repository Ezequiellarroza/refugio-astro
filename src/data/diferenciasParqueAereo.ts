export interface DiferenciaParqueAereo {
  titulo: string;
  nosotros: string;
  otros: string;
  cierre: string;
}

const diferenciasParqueAereo: DiferenciaParqueAereo[] = [
  {
    titulo: 'Seguridad certificada',
    nosotros:
      'Sistema francés CouDou Pro® con conexión continua imposible de soltar accidentalmente. Certificación CE bajo normas europeas EN 15567.',
    otros: 'Línea de vida con conexión manual y riesgo de error humano.',
    cierre: 'La seguridad no se delega en el cuidado del usuario.',
  },
  {
    titulo: 'Sin traslados',
    nosotros:
      'Dentro del predio de alojamiento. Los chicos llegan caminando.',
    otros: '20 a 25 minutos en auto. Coordinación de transporte y riesgo vial.',
    cierre: 'Cada minuto del viaje cuenta. No los gastamos en la ruta.',
  },
  {
    titulo: 'Tiempo real de juego',
    nosotros: '2 horas efectivas con repeticiones ilimitadas.',
    otros: '40 a 45 minutos de juego más tiempo de traslados.',
    cierre: 'La diferencia entre probar una actividad y vivirla.',
  },
  {
    titulo: 'Participación simultánea',
    nosotros:
      '60 arneses disponibles. Todos los chicos en el circuito al mismo tiempo.',
    otros: 'Tandas chicas. La mayoría espera mirando desde el suelo.',
    cierre: 'Nadie viaja para mirar a otros divertirse.',
  },
  {
    titulo: 'Operación nocturna',
    nosotros:
      'Iluminación perimetral integral para experiencias nocturnas seguras.',
    otros: 'Solo opera de día.',
    cierre: 'Una propuesta que se adapta al ritmo del grupo, no al revés.',
  },
];

export default diferenciasParqueAereo;
