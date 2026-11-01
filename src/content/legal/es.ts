import type { LegalPack } from "./types";

/** BORRADORES. Redactados por un asistente de IA, no por un abogado. Un abogado turco debe revisarlos antes de publicar. */
export const es: LegalPack = {
  ui: {
    banner: "Borrador pendiente de revisión por un abogado turco. Este texto no es asesoramiento jurídico ni afirma que el negocio cumpla ninguna ley.",
    notLawyer: "Lo preparó un asistente de IA, que no es un abogado.",
    drafted: "Borrador preparado: 29 de octubre de 2026",
    toComplete: "[Lo completa el vendedor]",
    sellerTitle: "Datos del vendedor",
    sellerFields: { legalName: "Razón social", taxOffice: "Oficina tributaria", taxNumber: "Número fiscal", mersis: "Número MERSIS", address: "Domicilio registrado", email: "Correo electrónico", phone: "Teléfono", kepAddress: "Dirección KEP", foodRegistration: "Registro de establecimiento alimentario" },
    storeNotOpen: "La tienda en línea aún no está abierta a la venta. Hasta que abra, los formularios de este sitio solo registran solicitudes; no se vende nada ni se cobra ningún pago.",
    related: "Documentos relacionados",
  },

  privacy: {
    title: "Política de privacidad y aviso KVKK",
    intro: "Este aviso explica qué datos personales trata NORVIGATE a través de este sitio, para qué, y qué derechos tiene usted según la Ley turca de Protección de Datos Personales n.º 6698 (KVKK). También cumple el deber de información hacia los titulares de datos.",
    sections: [
      { h: "1. Responsable del tratamiento", p: ["El responsable es el operador de NORVIGATE: [razón social, dirección, número MERSIS o fiscal y correo de contacto, que el negocio completará antes de publicar]."] },
      { h: "2. Qué recogemos y cómo", p: [
        "Formularios: solo lo que usted escribe, como nombre, correo, teléfono opcional, el mensaje o la solicitud y, en solicitudes de pedido, los productos y cantidades elegidos. También registramos el idioma de la página y la hora del envío.",
        "Pedidos (solo cuando el pago en línea esté abierto): nombre, apellido, correo, teléfono, dirección de entrega, contenido e importes del pedido y, si el proveedor de pago lo exige, un número de identidad. Usted paga en la página del proveedor de pago; los datos de su tarjeta nunca llegan a NORVIGATE.",
        "Datos técnicos: el servidor puede registrar información técnica de las solicitudes por seguridad y para diagnosticar fallos. Su dirección IP no se guarda con los formularios ni con los pedidos. Se usa brevemente en la memoria del servidor para limitar abusos y, al pagar, se transmite al proveedor de pago, que la exige.",
      ] },
      { h: "3. Fines y bases jurídicas", p: [
        "Responder consultas y gestionar solicitudes: su consentimiento expreso al marcar la casilla del formulario y las medidas previas a un contrato.",
        "Tramitar y entregar pedidos y cumplir deberes contables y fiscales: ejecución de un contrato y obligación legal.",
        "Mantener la seguridad del sitio y evitar abusos: interés legítimo del responsable.",
        "[La lista final de bases según los artículos 5 y 6 de la KVKK la confirmará el abogado.]",
      ] },
      { h: "4. Quién recibe sus datos", p: [
        "Proveedor de alojamiento e infraestructura: [nombre y país, por completar].",
        "Proveedor de pago (solo cuando el pago en línea esté abierto): [iyzico o el elegido, por completar].",
        "Empresa de transporte (solo en pedidos enviados): [transportista, por completar].",
        "Nuestro servidor obtiene los tipos de cambio de un servicio público y no incluye sus datos personales. El cuadro del tiempo en la página de Estambul pide el tiempo actual a Open-Meteo desde su navegador, por lo que Open-Meteo puede ver su dirección IP, como en cualquier solicitud web.",
        "Los datos no se venden. Las transferencias al extranjero, incluido el alojamiento fuera de Türkiye, deben evaluarse según el artículo 9 de la KVKK. [Se completará con el abogado.]",
      ] },
      { h: "5. Conservación", p: ["Las consultas se conservan el tiempo necesario para responderlas y un plazo razonable después. [El negocio fijará los plazos exactos.] Los registros de pedidos y facturas se conservan durante los plazos que exige la ley mercantil y tributaria turca. [El abogado confirmará los plazos.]"] },
      { h: "6. Sus derechos", p: [
        "Según el artículo 11 de la KVKK puede saber si se tratan sus datos, pedir información sobre ellos, conocer los fines y si se usan conforme a ellos, conocer a los destinatarios, pedir su corrección, pedir su supresión o destrucción, pedir que se notifique a los destinatarios, oponerse a un resultado derivado exclusivamente de un análisis automatizado y reclamar la indemnización de los daños causados por un tratamiento ilícito.",
        "Para ejercerlos, escriba a la dirección de contacto del apartado 1 con su nombre y un modo de localizarle. El responsable debe responder en 30 días. También puede reclamar ante la Autoridad de Protección de Datos Personales.",
      ] },
      { h: "7. Deber de inscripción", p: ["Que el operador deba inscribirse en el Registro de Responsables del Tratamiento (VERBİS) depende de su tamaño y de los datos que trate. [Lo confirmará el abogado.]"] },
      { h: "8. Cambios", p: ["Actualizaremos este aviso cuando cambie la forma de tratar los datos e indicaremos la fecha de la última versión."] },
    ],
  },

  terms: {
    title: "Condiciones de uso",
    intro: "Estas condiciones fijan las reglas de uso del sitio de NORVIGATE. La venta en línea tiene sus propias condiciones: véanse las Condiciones de venta.",
    sections: [
      { h: "1. Sobre el sitio", p: ["NORVIGATE es una plataforma de puertas de ciudad. Su primera puerta es Estambul. El contenido marcado como Muestra es una ilustración, no un proveedor, precio, producto o disponibilidad reales."] },
      { h: "2. Las solicitudes no son contratos", p: ["Los formularios registran solicitudes y consultas. Una solicitud no es una reserva, un pedido ni un contrato. Nada queda confirmado hasta que NORVIGATE o un proveedor lo confirme de forma separada y clara."] },
      { h: "3. Servicios y enlaces de terceros", p: ["Los enlaces de vuelos, hoteles y otros llevan a sitios independientes. NORVIGATE no controla su contenido, precios ni disponibilidad. Compruebe fechas y condiciones en esos sitios antes de pagar."] },
      { h: "4. Lo que usted envía", p: ["Dé información exacta y solo la que tenga derecho a compartir. No envíe contenido ilícito, engañoso o abusivo, ni datos personales de otras personas sin su permiso."] },
      { h: "5. Fichas", p: ["Solicitar una ficha no garantiza su publicación. NORVIGATE puede rechazar, editar o retirar una ficha."] },
      { h: "6. Información y conversiones", p: ["Los horarios de oración se calculan con un método estándar y pueden diferir ligeramente del calendario de la autoridad local. El tiempo procede de un tercero. Las conversiones de moneda son tipos de referencia diarios orientativos, no una oferta; el importe que cobre un banco o proveedor de pago puede diferir."] },
      { h: "7. Propiedad intelectual", p: ["El nombre, el logotipo y las ilustraciones de NORVIGATE pertenecen a su titular. No los copie ni reutilice sin permiso escrito. [Se confirmará la redacción de la titularidad.]"] },
      { h: "8. Responsabilidad", p: ["[El abogado redactará los límites de responsabilidad y las exenciones. No pueden excluir la responsabilidad que la ley turca no permite excluir, ni los derechos del consumidor.]"] },
      { h: "9. Cambios y ley aplicable", p: ["Podemos cambiar estas condiciones e indicaremos la fecha. [El abogado confirmará la ley aplicable y los tribunales o juntas arbitrales de consumo competentes.]"] },
    ],
  },

  sales: {
    title: "Condiciones de venta e información precontractual",
    intro: "Este texto se aplica a las compras en la tienda en línea de NORVIGATE cuando esté abierta. Es la información precontractual que exige el derecho de consumo turco para los contratos a distancia (Ley n.º 6502 y Reglamento de contratos a distancia). El comprador debe poder leerlo y confirmarlo antes de pagar.",
    sections: [
      { h: "1. Vendedor", p: ["La identidad, el domicilio y los datos de contacto del vendedor figuran en la tabla al principio de esta página. La tienda no abre hasta que estén completos."] },
      { h: "2. Productos", p: ["Las características principales de cada producto, incluidos peso, ingredientes, alérgenos, caducidad y conservación, están en su página. Compruébelas y revise la etiqueta del envase. La confirmación de alérgenos al pagar es obligatoria."] },
      { h: "3. Precios y pago", p: ["Los precios son en liras turcas e incluyen los impuestos que el vendedor deba incluir. [Se confirmará la redacción fiscal.] El coste de entrega se calcula antes de pagar y se muestra por separado. El total mostrado al pagar es el que usted abona. El pago se hace en la página segura del proveedor de pago; NORVIGATE no recibe los datos de su tarjeta."] },
      { h: "4. Pedido y contrato", p: ["El contrato se forma cuando se confirma el pago y el pedido figura como Pagado. El vendedor puede cancelar y reembolsar un pedido que no pueda cumplir, por ejemplo por falta de existencias."] },
      { h: "5. Entrega", p: ["Las condiciones, plazos y destinos de entrega están en la página de Envíos y devoluciones. Solo se entrega a los destinos que aparecen al pagar."] },
      { h: "6. Derecho de desistimiento", p: [
        "Normalmente el consumidor tiene 14 días desde la recepción de los bienes para desistir de un contrato a distancia sin dar motivo.",
        "El reglamento excluye algunos bienes de este derecho, entre ellos los que se deterioran con rapidez o pueden caducar y los precintados que no pueden devolverse por razones de salud o higiene una vez abiertos. Es probable que los alimentos entren en estas excepciones. [El abogado debe confirmar qué productos quedan excluidos y las páginas de producto deben indicarlo.]",
        "Cuando el derecho se aplique, notifíquelo por escrito al vendedor en 14 días. El vendedor reembolsa en 14 días desde la notificación, con el mismo medio de pago. [Se confirmará la redacción sobre el coste de devolución.]",
      ] },
      { h: "7. Bienes defectuosos o equivocados", p: ["Si los bienes llegan dañados, equivocados o defectuosos, contacte pronto con el vendedor con fotos. Sus derechos legales según el derecho de consumo turco no quedan limitados por estas condiciones."] },
      { h: "8. Reclamaciones y litigios", p: ["Contacte primero con el vendedor. El consumidor también puede acudir a la Junta Arbitral de Consumo o al Tribunal de Consumo de su residencia o de la sede del vendedor, dentro de los límites económicos que se fijan cada año. [El abogado confirmará los límites vigentes y la redacción.]"] },
      { h: "9. Compradores fuera de Türkiye", p: ["También puede aplicarse el derecho de consumo del país del comprador. [El abogado debe asesorar sobre esto y sobre las normas de importación de alimentos de cada destino.] La tienda solo abre los destinos que el vendedor haya comprobado."] },
      { h: "10. Datos personales", p: ["Los datos personales se tratan como se describe en la Política de privacidad y aviso KVKK."] },
    ],
  },

  shipping: {
    title: "Envíos y devoluciones",
    intro: "Cómo se calcula el coste de entrega de los pedidos, cuánto tardan y qué ocurre si algo sale mal. Las cifras marcadas como pendientes son valores provisionales que el vendedor debe sustituir por presupuestos reales del transportista antes de abrir la tienda.",
    sections: [
      { h: "1. Dónde entregamos", p: ["Solo en los países ofrecidos al pagar. El vendedor fija la lista tras revisar las normas de importación de alimentos de cada destino. Si su país no aparece, no podemos aceptar el pedido."] },
      { h: "2. Coste de entrega", p: ["Depende del destino y del peso total del pedido con el embalaje. Lo calcula el servidor y se muestra antes de pagar. [La tabla de tarifas se publicará cuando se confirmen los presupuestos del transportista.]"] },
      { h: "3. Plazo de entrega", p: ["La estimación mostrada al pagar es un intervalo de días desde el envío, no una garantía. Los controles de aduana fuera de Türkiye pueden añadir tiempo. [Las estimaciones se confirmarán con el transportista.]"] },
      { h: "4. Seguimiento", p: ["Cuando el pedido se envía, su página de estado muestra el transportista y el número de seguimiento. Guarde el enlace privado que recibe tras el pago: es la única forma de abrir la página de estado."] },
      { h: "5. Aduanas, aranceles y normas de importación", p: ["Los alimentos pueden estar restringidos o gravados a la llegada. [El vendedor indicará quién paga aranceles e impuestos en cada destino.] Un paquete rechazado o retenido en aduana puede no ser reembolsable. [Lo confirmará el abogado.]"] },
      { h: "6. Alimentos perecederos y devoluciones", p: ["Como los alimentos pueden deteriorarse, el derecho de desistimiento normalmente no se aplica a ellos (véanse las Condiciones de venta). [El abogado debe confirmarlo.] Si los bienes llegan dañados, estropeados o equivocados, escríbanos en [número de días por decidir] días desde la entrega con fotos, y repondremos o reembolsaremos como exija la ley."] },
      { h: "7. Cancelación antes del envío", p: ["Escríbanos cuanto antes. Si el pedido no se ha enviado, puede cancelarse y reembolsarse por el medio de pago original. [Se confirmará el plazo.]"] },
    ],
  },

  cookies: {
    title: "Aviso de cookies",
    intro: "NORVIGATE no usa cookies publicitarias ni analíticas y no carga scripts de terceros. Este aviso enumera los pequeños elementos que sí guarda en su dispositivo.",
    sections: [
      { h: "1. Qué se guarda", p: [
        "NV_LOCALE (cookie, un año): recuerda el idioma elegido. Es estrictamente necesaria para que funcione la elección de idioma.",
        "nv_currency (almacenamiento del navegador): recuerda la moneda elegida para los precios orientativos.",
        "nv_cart_v1 (almacenamiento del navegador): conserva los artículos de su carrito en su dispositivo. No se envía a ningún servidor hasta que envíe una solicitud de pedido o pase por caja.",
      ] },
      { h: "2. Sin seguimiento", p: ["No hay analítica, píxeles publicitarios ni contenido incrustado de redes sociales. Si se añadiera algo así, este aviso se actualizaría y se pediría consentimiento antes cuando la ley lo exija."] },
      { h: "3. Solicitudes de terceros", p: ["El cuadro del tiempo de la página de inicio de Estambul pide el tiempo actual a Open-Meteo directamente desde su navegador. Esa solicitud no crea cookies, pero el proveedor puede ver su dirección IP, como en cualquier solicitud web. La página del proveedor de pago, cuando el pago en línea esté abierto, tiene sus propios avisos."] },
      { h: "4. Sus opciones", p: ["Puede borrar la cookie y el almacenamiento del navegador en cualquier momento desde los ajustes. El sitio olvidará entonces su idioma, moneda y carrito."] },
    ],
  },
};
