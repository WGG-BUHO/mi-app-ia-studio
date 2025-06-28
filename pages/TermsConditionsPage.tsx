import React from 'react';

export const TermsConditionsPage: React.FC = () => {
  const termsContent = `
    <h2 class="text-2xl font-bold text-iusven-blue mb-4">Condicionados Generales del Servicio IUSVEN</h2>
    <p class="mb-4 text-sm text-iusven-textLight">Fecha de última actualización: ${new Date().toLocaleDateString()}</p>
    
    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">1. Aceptación de los Términos</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Al acceder y utilizar los servicios de IUSVEN ("Plataforma"), usted acepta estar sujeto a estos Condicionados Generales ("Términos"). Si no está de acuerdo con alguno de estos términos, no debe utilizar la Plataforma.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">2. Descripción del Servicio</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">IUSVEN es una plataforma en línea que conecta a usuarios ("Clientes") con profesionales del derecho ("Abogados") para la prestación de asesoría legal. Los servicios pueden incluir chat en vivo, videoconferencias y gestión de documentos, según el plan de suscripción contratado.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed">La asesoría proporcionada es de carácter general y orientativo, y no sustituye la consulta legal formal y exhaustiva que pueda requerir una situación particular. IUSVEN no es un despacho de abogados y los Abogados son profesionales independientes.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">3. Planes de Suscripción y Pago</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Ofrecemos diversos planes de suscripción con diferentes características y precios, detallados en nuestra sección de "Planes". Los pagos son recurrentes y se procesarán automáticamente según el ciclo de facturación de su plan (generalmente mensual).</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed"><strong>Plan Emprendedor:</strong> $50/mes. Incluye funcionalidades básicas de consulta.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed"><strong>Plan Pyme:</strong> $100/mes. Permite al cliente enviar documentos para revisión.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed"><strong>Plan Corporativo:</strong> $200/mes. Permite al cliente enviar documentos para revisión y funcionalidades avanzadas.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed"><strong>Plan Familiar:</strong> $100/mes. Incluye 15 consultas al mes. Las consultas no son fraccionables ni acumulables y se renuevan cada mes. El cliente puede adjuntar documentos solo si el abogado lo requiere.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Puede cancelar su suscripción en cualquier momento desde su panel de control. No se realizarán reembolsos por períodos de suscripción parciales.</p>
    
    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">4. Uso de la Plataforma</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Usted se compromete a utilizar la Plataforma de manera legal y ética. No debe utilizar la Plataforma para fines ilícitos, difamatorios, o que infrinjan los derechos de terceros.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed">La información y documentos compartidos deben ser veraces y no infringir derechos de propiedad intelectual.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">5. Comunicación y Gestión de Documentos</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Las comunicaciones por chat y videoconferencia son confidenciales entre el Cliente y el Abogado. Las videoconferencias tienen una duración máxima de 45 minutos y deben ser aprobadas por el Abogado.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed">La subida de documentos está sujeta a las condiciones de cada plan. Aseguramos la encriptación y privacidad de los documentos adjuntos, pero usted es responsable de la naturaleza y legalidad del contenido que comparte.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">6. Limitación de Responsabilidad</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">IUSVEN actúa como intermediario y no se hace responsable de la calidad, exactitud o idoneidad de la asesoría legal proporcionada por los Abogados. Cualquier relación cliente-abogado se establece directamente entre el Cliente y el Abogado.</p>
    <p class="mb-4 text-iusven-textDark leading-relaxed">No garantizamos la disponibilidad ininterrumpida de la Plataforma y no seremos responsables por interrupciones o fallos técnicos.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">7. Privacidad y Protección de Datos</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Nos comprometemos a proteger su privacidad. Nuestra Política de Privacidad, que forma parte de estos Términos, describe cómo recopilamos, usamos y protegemos su información personal.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">8. Modificaciones a los Términos</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">IUSVEN se reserva el derecho de modificar estos Términos en cualquier momento. Le notificaremos los cambios significativos. El uso continuado de la Plataforma después de dichas modificaciones constituirá su aceptación de los nuevos Términos.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">9. Ley Aplicable y Jurisdicción</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Estos Términos se regirán e interpretarán de acuerdo con las leyes de Venezuela. Cualquier disputa que surja en relación con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de Caracas, Venezuela.</p>

    <h3 class="text-xl font-semibold text-iusven-blue mt-6 mb-2">10. Contacto</h3>
    <p class="mb-4 text-iusven-textDark leading-relaxed">Si tiene alguna pregunta sobre estos Términos, por favor contáctenos a legal@iusven.com.</p>
  `;

  return (
    <div className="min-h-screen bg-iusven-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-2xl">
        <div 
            className="text-iusven-textDark" // Basic text color for the container
            dangerouslySetInnerHTML={{ __html: termsContent }}
        >
        {/* The content is set via dangerouslySetInnerHTML */}
        </div>
      </div>
    </div>
  );
};
