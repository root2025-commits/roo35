export function sendOrderToWhatsApp(orderData) {
  const {
    orderId,
    customerInfo,
    deliveryZone,
    deliveryCost,
    items,
    subtotal,
    transferFee,
    total,
    cashTotal = 0,
    transferTotal = 0,
    pickupLocation = false,
    showLocationMap = false
  } = orderData;
  const getTransferFeePercentage = () => {
    try {
      const adminState = localStorage.getItem("admin_system_state");
      if (adminState) {
        const state = JSON.parse(adminState);
        return state.prices?.transferFeePercentage || 10;
      }
    } catch (error) {
      console.warn("No se pudo obtener el porcentaje de transferencia del admin:", error);
    }
    return 10;
  };
  const getCurrentPrices = () => {
    try {
      const adminState = localStorage.getItem("admin_system_state");
      if (adminState) {
        const state = JSON.parse(adminState);
        return {
          moviePrice: state.prices?.moviePrice || 80,
          seriesPrice: state.prices?.seriesPrice || 300,
          novelPricePerChapter: state.prices?.novelPricePerChapter || 5,
          transferFeePercentage: state.prices?.transferFeePercentage || 10
        };
      }
    } catch (error) {
      console.warn("No se pudieron obtener los precios del admin:", error);
    }
    return {
      moviePrice: 80,
      seriesPrice: 300,
      novelPricePerChapter: 5,
      transferFeePercentage: 10
    };
  };
  const currentPrices = getCurrentPrices();
  const transferFeePercentage = currentPrices.transferFeePercentage;
  const itemsList = items.map((item) => {
    const seasonInfo = item.type === "tv" && item.selectedSeasons && item.selectedSeasons.length > 0 ? `
  📺 Temporadas: ${item.selectedSeasons.sort((a, b) => a - b).join(", ")}` : "";
    const extendedSeriesInfo = item.type === "tv" && item.episodeCount && item.episodeCount > 50 ? `
  📊 Serie extensa: ${item.episodeCount} episodios totales` : "";
    const novelInfo = item.type === "novel" ? `
  📚 Capítulos: ${item.chapters}
  📖 Género: ${item.genre}
  🌍 País: ${item.country || "No especificado"}
  📡 Estado: ${item.status === "transmision" ? "En Transmisión" : "Finalizada"}` : "";
    const itemType = item.type === "movie" ? "Película" : item.type === "tv" ? "Serie" : "Novela";
    let basePrice;
    if (item.type === "novel") {
      basePrice = item.chapters * currentPrices.novelPricePerChapter;
    } else if (item.type === "movie") {
      basePrice = currentPrices.moviePrice;
    } else {
      basePrice = (item.selectedSeasons?.length || 1) * currentPrices.seriesPrice;
    }
    const finalPrice = item.paymentType === "transfer" ? Math.round(basePrice * (1 + transferFeePercentage / 100)) : basePrice;
    const paymentTypeText = item.paymentType === "transfer" ? `Transferencia (+${transferFeePercentage}%)` : "Efectivo";
    const emoji = item.type === "movie" ? "🎬" : item.type === "tv" ? "📺" : "📚";
    let itemText = `${emoji} *${item.title}*${seasonInfo}${extendedSeriesInfo}${novelInfo}
`;
    itemText += `  📋 Tipo: ${itemType}
`;
    if (item.type === "tv" && item.episodeCount && item.episodeCount > 50) {
      itemText += `  📊 Serie extensa: ${item.episodeCount} episodios (precio estándar $${currentPrices.seriesPrice} CUP/temporada)
`;
    }
    itemText += `  💳 Método de pago: ${paymentTypeText}
`;
    if (item.paymentType === "transfer") {
      const recargo = finalPrice - basePrice;
      itemText += `  💰 Precio base: $${basePrice.toLocaleString()} CUP
`;
      itemText += `  💳 Recargo transferencia (${transferFeePercentage}%): +$${recargo.toLocaleString()} CUP
`;
      itemText += `  💰 Precio final: $${finalPrice.toLocaleString()} CUP`;
    } else {
      itemText += `  💰 Precio: $${finalPrice.toLocaleString()} CUP`;
    }
    return itemText;
  }).join("\n\n");
  let message = `🎬 *NUEVO PEDIDO - TV A LA CARTA*

`;
  message += `📋 *ID de Orden:* ${orderId}

`;
  message += `👤 *DATOS DEL CLIENTE:*
`;
  message += `• Nombre: ${customerInfo.fullName}
`;
  message += `• Teléfono: ${customerInfo.phone}
`;
  if (!pickupLocation && customerInfo.address) {
    message += `• Dirección: ${customerInfo.address}
`;
  }
  message += `
`;
  message += `🎯 *PRODUCTOS SOLICITADOS:*
${itemsList}

`;
  const cashItems = items.filter((item) => item.paymentType === "cash");
  const transferItems = items.filter((item) => item.paymentType === "transfer");
  message += `📊 *DESGLOSE DETALLADO POR MÉTODO DE PAGO:*
`;
  if (cashItems.length > 0) {
    message += `💵 *PAGO EN EFECTIVO:*
`;
    cashItems.forEach((item) => {
      let basePrice;
      if (item.type === "novel") {
        basePrice = item.chapters * currentPrices.novelPricePerChapter;
      } else if (item.type === "movie") {
        basePrice = currentPrices.moviePrice;
      } else {
        basePrice = (item.selectedSeasons?.length || 1) * currentPrices.seriesPrice;
      }
      const emoji = item.type === "movie" ? "🎬" : item.type === "tv" ? "📺" : "📚";
      message += `  ${emoji} ${item.title}: $${basePrice.toLocaleString()} CUP
`;
    });
    message += `  💰 *Subtotal Efectivo: $${cashTotal.toLocaleString()} CUP*

`;
  }
  if (transferItems.length > 0) {
    message += `🏦 *PAGO POR TRANSFERENCIA BANCARIA (+${transferFeePercentage}%):*
`;
    transferItems.forEach((item) => {
      let basePrice;
      if (item.type === "novel") {
        basePrice = item.chapters * currentPrices.novelPricePerChapter;
      } else if (item.type === "movie") {
        basePrice = currentPrices.moviePrice;
      } else {
        basePrice = (item.selectedSeasons?.length || 1) * currentPrices.seriesPrice;
      }
      const finalPrice = Math.round(basePrice * (1 + transferFeePercentage / 100));
      const recargo = finalPrice - basePrice;
      const emoji = item.type === "movie" ? "🎬" : item.type === "tv" ? "📺" : "📚";
      message += `  ${emoji} ${item.title}:
`;
      message += `    💰 Base: $${basePrice.toLocaleString()} CUP
`;
      message += `    💳 Recargo (${transferFeePercentage}%): +$${recargo.toLocaleString()} CUP
`;
      message += `    💰 Total: $${finalPrice.toLocaleString()} CUP
`;
    });
    message += `  💰 *Subtotal Transferencia: $${transferTotal.toLocaleString()} CUP*

`;
  }
  message += `📋 *RESUMEN FINAL DE PAGOS:*
`;
  if (cashTotal > 0) {
    message += `• Efectivo: $${cashTotal.toLocaleString()} CUP (${cashItems.length} elementos)
`;
  }
  if (transferTotal > 0) {
    message += `• Transferencia: $${transferTotal.toLocaleString()} CUP (${transferItems.length} elementos)
`;
  }
  message += `• *Subtotal Contenido: $${subtotal.toLocaleString()} CUP*
`;
  if (transferFee > 0) {
    message += `• Recargo transferencia (${transferFeePercentage}%): +$${transferFee.toLocaleString()} CUP
`;
  }
  message += `
📍 *INFORMACIÓN DE ENTREGA:*
`;
  if (pickupLocation) {
    message += `🏪 *RECOGIDA EN EL LOCAL:*
`;
    message += `• Ubicación: TV a la Carta
`;
    message += `• Dirección: Reparto Nuevo Vista Alegre, Santiago de Cuba
`;
    message += `• Costo: GRATIS
`;
    if (showLocationMap) {
      message += `• 📍 Coordenadas GPS: 20.039585, -75.849663
`;
      message += `• 🗺️ Google Maps: https://www.google.com/maps/place/20%C2%B002'22.5%22N+75%C2%B050'58.8%22W/@20.0394604,-75.8495414,180m/data=!3m1!1e3!4m4!3m3!8m2!3d20.039585!4d-75.849663?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D
`;
    }
  } else {
    message += `🚚 *ENTREGA A DOMICILIO:*
`;
    message += `• Zona: ${deliveryZone.replace(" > ", " → ")}
`;
    if (customerInfo.address) {
      message += `• Dirección: ${customerInfo.address}
`;
    }
    message += `• Costo de entrega: $${deliveryCost.toLocaleString()} CUP
`;
  }
  message += `
🎯 *TOTAL FINAL: $${total.toLocaleString()} CUP*

`;
  message += `📊 *ESTADÍSTICAS DEL PEDIDO:*
`;
  message += `• Total de elementos: ${items.length}
`;
  message += `• Películas: ${items.filter((item) => item.type === "movie").length}
`;
  message += `• Series: ${items.filter((item) => item.type === "tv").length}
`;
  message += `• Novelas: ${items.filter((item) => item.type === "novel").length}
`;
  if (cashItems.length > 0) {
    message += `• Pago en efectivo: ${cashItems.length} elementos
`;
  }
  if (transferItems.length > 0) {
    message += `• Pago por transferencia: ${transferItems.length} elementos
`;
  }
  message += `• Tipo de entrega: ${pickupLocation ? "Recogida en local" : "Entrega a domicilio"}

`;
  message += `💼 *CONFIGURACIÓN DE PRECIOS APLICADA:*
`;
  message += `• Películas: $${currentPrices.moviePrice.toLocaleString()} CUP
`;
  message += `• Series: $${currentPrices.seriesPrice.toLocaleString()} CUP por temporada
`;
  message += `• Novelas: $${currentPrices.novelPricePerChapter.toLocaleString()} CUP por capítulo
`;
  message += `• Recargo transferencia: ${transferFeePercentage}%

`;
  message += `📱 *Enviado desde:* TV a la Carta App
`;
  message += `⏰ *Fecha y hora:* ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })}
`;
  message += `🌟 *¡Gracias por elegir TV a la Carta!*`;
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "5354690878";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isMacOS = /Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent);
  const isWindows = /Win32|Win64|Windows|WinCE/i.test(navigator.userAgent);
  let whatsappUrl;
  if (isMobile) {
    if (isIOS) {
      whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else if (isAndroid) {
      whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
      whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
  } else {
    whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  }
  if (isMobile) {
    window.location.href = whatsappUrl;
  } else {
    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndoYXRzYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9yZGVyRGF0YSwgQ3VzdG9tZXJJbmZvIH0gZnJvbSAnLi4vY29tcG9uZW50cy9DaGVja291dE1vZGFsJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRPcmRlclRvV2hhdHNBcHAob3JkZXJEYXRhOiBPcmRlckRhdGEpOiB2b2lkIHtcbiAgY29uc3QgeyBcbiAgICBvcmRlcklkLCBcbiAgICBjdXN0b21lckluZm8sIFxuICAgIGRlbGl2ZXJ5Wm9uZSwgXG4gICAgZGVsaXZlcnlDb3N0LCBcbiAgICBpdGVtcywgXG4gICAgc3VidG90YWwsIFxuICAgIHRyYW5zZmVyRmVlLCBcbiAgICB0b3RhbCxcbiAgICBjYXNoVG90YWwgPSAwLFxuICAgIHRyYW5zZmVyVG90YWwgPSAwLFxuICAgIHBpY2t1cExvY2F0aW9uID0gZmFsc2UsXG4gICAgc2hvd0xvY2F0aW9uTWFwID0gZmFsc2VcbiAgfSA9IG9yZGVyRGF0YTtcblxuICAvLyBPYnRlbmVyIGVsIHBvcmNlbnRhamUgZGUgdHJhbnNmZXJlbmNpYSBhY3R1YWwgZGVsIGNvbnRleHRvIGFkbWluXG4gIGNvbnN0IGdldFRyYW5zZmVyRmVlUGVyY2VudGFnZSA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWRtaW5TdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZG1pbl9zeXN0ZW1fc3RhdGUnKTtcbiAgICAgIGlmIChhZG1pblN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gSlNPTi5wYXJzZShhZG1pblN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnByaWNlcz8udHJhbnNmZXJGZWVQZXJjZW50YWdlIHx8IDEwO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05vIHNlIHB1ZG8gb2J0ZW5lciBlbCBwb3JjZW50YWplIGRlIHRyYW5zZmVyZW5jaWEgZGVsIGFkbWluOicsIGVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIDEwOyAvLyBWYWxvciBwb3IgZGVmZWN0b1xuICB9O1xuXG4gIC8vIE9idGVuZXIgcHJlY2lvcyBhY3R1YWxlcyBkZWwgY29udGV4dG8gYWRtaW5cbiAgY29uc3QgZ2V0Q3VycmVudFByaWNlcyA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWRtaW5TdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZG1pbl9zeXN0ZW1fc3RhdGUnKTtcbiAgICAgIGlmIChhZG1pblN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gSlNPTi5wYXJzZShhZG1pblN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb3ZpZVByaWNlOiBzdGF0ZS5wcmljZXM/Lm1vdmllUHJpY2UgfHwgODAsXG4gICAgICAgICAgc2VyaWVzUHJpY2U6IHN0YXRlLnByaWNlcz8uc2VyaWVzUHJpY2UgfHwgMzAwLFxuICAgICAgICAgIG5vdmVsUHJpY2VQZXJDaGFwdGVyOiBzdGF0ZS5wcmljZXM/Lm5vdmVsUHJpY2VQZXJDaGFwdGVyIHx8IDUsXG4gICAgICAgICAgdHJhbnNmZXJGZWVQZXJjZW50YWdlOiBzdGF0ZS5wcmljZXM/LnRyYW5zZmVyRmVlUGVyY2VudGFnZSB8fCAxMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05vIHNlIHB1ZGllcm9uIG9idGVuZXIgbG9zIHByZWNpb3MgZGVsIGFkbWluOicsIGVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdmllUHJpY2U6IDgwLFxuICAgICAgc2VyaWVzUHJpY2U6IDMwMCxcbiAgICAgIG5vdmVsUHJpY2VQZXJDaGFwdGVyOiA1LFxuICAgICAgdHJhbnNmZXJGZWVQZXJjZW50YWdlOiAxMFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgY3VycmVudFByaWNlcyA9IGdldEN1cnJlbnRQcmljZXMoKTtcbiAgY29uc3QgdHJhbnNmZXJGZWVQZXJjZW50YWdlID0gY3VycmVudFByaWNlcy50cmFuc2ZlckZlZVBlcmNlbnRhZ2U7XG4gIFxuICAvLyBGb3JtYXRlYXIgbGlzdGEgZGUgcHJvZHVjdG9zIGNvbiBkZXNnbG9zZSBkZXRhbGxhZG8gZGUgbcOpdG9kb3MgZGUgcGFnb1xuICBjb25zdCBpdGVtc0xpc3QgPSBpdGVtc1xuICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCBzZWFzb25JbmZvID0gaXRlbS50eXBlID09PSAndHYnICYmIGl0ZW0uc2VsZWN0ZWRTZWFzb25zICYmIGl0ZW0uc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA+IDAgXG4gICAgICAgID8gYFxcbiAg8J+TuiBUZW1wb3JhZGFzOiAke2l0ZW0uc2VsZWN0ZWRTZWFzb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKS5qb2luKCcsICcpfWAgXG4gICAgICAgIDogJyc7XG4gICAgICBcbiAgICAgIGNvbnN0IGV4dGVuZGVkU2VyaWVzSW5mbyA9IGl0ZW0udHlwZSA9PT0gJ3R2JyAmJiBpdGVtLmVwaXNvZGVDb3VudCAmJiBpdGVtLmVwaXNvZGVDb3VudCA+IDUwXG4gICAgICAgID8gYFxcbiAg8J+TiiBTZXJpZSBleHRlbnNhOiAke2l0ZW0uZXBpc29kZUNvdW50fSBlcGlzb2Rpb3MgdG90YWxlc2BcbiAgICAgICAgOiAnJztcbiAgICAgIFxuICAgICAgY29uc3Qgbm92ZWxJbmZvID0gaXRlbS50eXBlID09PSAnbm92ZWwnIFxuICAgICAgICA/IGBcXG4gIPCfk5ogQ2Fww610dWxvczogJHtpdGVtLmNoYXB0ZXJzfVxcbiAg8J+TliBHw6luZXJvOiAke2l0ZW0uZ2VucmV9XFxuICDwn4yNIFBhw61zOiAke2l0ZW0uY291bnRyeSB8fCAnTm8gZXNwZWNpZmljYWRvJ31cXG4gIPCfk6EgRXN0YWRvOiAke2l0ZW0uc3RhdHVzID09PSAndHJhbnNtaXNpb24nID8gJ0VuIFRyYW5zbWlzacOzbicgOiAnRmluYWxpemFkYSd9YCBcbiAgICAgICAgOiAnJztcbiAgICAgIFxuICAgICAgY29uc3QgaXRlbVR5cGUgPSBpdGVtLnR5cGUgPT09ICdtb3ZpZScgPyAnUGVsw61jdWxhJyA6IGl0ZW0udHlwZSA9PT0gJ3R2JyA/ICdTZXJpZScgOiAnTm92ZWxhJztcbiAgICAgIFxuICAgICAgbGV0IGJhc2VQcmljZTogbnVtYmVyO1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ25vdmVsJykge1xuICAgICAgICBiYXNlUHJpY2UgPSBpdGVtLmNoYXB0ZXJzICogY3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcjtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnbW92aWUnKSB7XG4gICAgICAgIGJhc2VQcmljZSA9IGN1cnJlbnRQcmljZXMubW92aWVQcmljZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2VQcmljZSA9IChpdGVtLnNlbGVjdGVkU2Vhc29ucz8ubGVuZ3RoIHx8IDEpICogY3VycmVudFByaWNlcy5zZXJpZXNQcmljZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgZmluYWxQcmljZSA9IGl0ZW0ucGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcicgPyBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSkgOiBiYXNlUHJpY2U7XG4gICAgICBjb25zdCBwYXltZW50VHlwZVRleHQgPSBpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInID8gYFRyYW5zZmVyZW5jaWEgKCske3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lKWAgOiAnRWZlY3Rpdm8nO1xuICAgICAgY29uc3QgZW1vamkgPSBpdGVtLnR5cGUgPT09ICdtb3ZpZScgPyAn8J+OrCcgOiBpdGVtLnR5cGUgPT09ICd0dicgPyAn8J+TuicgOiAn8J+Tmic7XG4gICAgICBcbiAgICAgIGxldCBpdGVtVGV4dCA9IGAke2Vtb2ppfSAqJHtpdGVtLnRpdGxlfSoke3NlYXNvbkluZm99JHtleHRlbmRlZFNlcmllc0luZm99JHtub3ZlbEluZm99XFxuYDtcbiAgICAgIGl0ZW1UZXh0ICs9IGAgIPCfk4sgVGlwbzogJHtpdGVtVHlwZX1cXG5gO1xuICAgICAgXG4gICAgICAvLyBBZGQgZXh0ZW5kZWQgc2VyaWVzIHByaWNpbmcgZXhwbGFuYXRpb25cbiAgICAgIGlmIChpdGVtLnR5cGUgPT09ICd0dicgJiYgaXRlbS5lcGlzb2RlQ291bnQgJiYgaXRlbS5lcGlzb2RlQ291bnQgPiA1MCkge1xuICAgICAgICBpdGVtVGV4dCArPSBgICDwn5OKIFNlcmllIGV4dGVuc2E6ICR7aXRlbS5lcGlzb2RlQ291bnR9IGVwaXNvZGlvcyAocHJlY2lvIGVzdMOhbmRhciAkJHtjdXJyZW50UHJpY2VzLnNlcmllc1ByaWNlfSBDVVAvdGVtcG9yYWRhKVxcbmA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGl0ZW1UZXh0ICs9IGAgIPCfkrMgTcOpdG9kbyBkZSBwYWdvOiAke3BheW1lbnRUeXBlVGV4dH1cXG5gO1xuICAgICAgXG4gICAgICBpZiAoaXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJykge1xuICAgICAgICBjb25zdCByZWNhcmdvID0gZmluYWxQcmljZSAtIGJhc2VQcmljZTtcbiAgICAgICAgaXRlbVRleHQgKz0gYCAg8J+SsCBQcmVjaW8gYmFzZTogJCR7YmFzZVByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcbmA7XG4gICAgICAgIGl0ZW1UZXh0ICs9IGAgIPCfkrMgUmVjYXJnbyB0cmFuc2ZlcmVuY2lhICgke3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lKTogKyQke3JlY2FyZ28udG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuYDtcbiAgICAgICAgaXRlbVRleHQgKz0gYCAg8J+SsCBQcmVjaW8gZmluYWw6ICQke2ZpbmFsUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1UZXh0ICs9IGAgIPCfkrAgUHJlY2lvOiAkJHtmaW5hbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUGA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBpdGVtVGV4dDtcbiAgICB9KVxuICAgIC5qb2luKCdcXG5cXG4nKTtcblxuICAvLyBDb25zdHJ1aXIgbWVuc2FqZSBjb21wbGV0b1xuICBsZXQgbWVzc2FnZSA9IGDwn46sICpOVUVWTyBQRURJRE8gLSBUViBBIExBIENBUlRBKlxcblxcbmA7XG4gIG1lc3NhZ2UgKz0gYPCfk4sgKklEIGRlIE9yZGVuOiogJHtvcmRlcklkfVxcblxcbmA7XG4gIFxuICBtZXNzYWdlICs9IGDwn5GkICpEQVRPUyBERUwgQ0xJRU5URToqXFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIE5vbWJyZTogJHtjdXN0b21lckluZm8uZnVsbE5hbWV9XFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIFRlbMOpZm9ubzogJHtjdXN0b21lckluZm8ucGhvbmV9XFxuYDtcbiAgaWYgKCFwaWNrdXBMb2NhdGlvbiAmJiBjdXN0b21lckluZm8uYWRkcmVzcykge1xuICAgIG1lc3NhZ2UgKz0gYOKAoiBEaXJlY2Npw7NuOiAke2N1c3RvbWVySW5mby5hZGRyZXNzfVxcbmA7XG4gIH1cbiAgbWVzc2FnZSArPSBgXFxuYDtcbiAgXG4gIG1lc3NhZ2UgKz0gYPCfjq8gKlBST0RVQ1RPUyBTT0xJQ0lUQURPUzoqXFxuJHtpdGVtc0xpc3R9XFxuXFxuYDtcbiAgXG4gIC8vIERlc2dsb3NhciBwb3IgdGlwbyBkZSBwYWdvXG4gIGNvbnN0IGNhc2hJdGVtcyA9IGl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0ucGF5bWVudFR5cGUgPT09ICdjYXNoJyk7XG4gIGNvbnN0IHRyYW5zZmVySXRlbXMgPSBpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInKTtcbiAgXG4gIC8vIE1vc3RyYXIgZGVzZ2xvc2UgZGV0YWxsYWRvIHBvciB0aXBvIGRlIHBhZ29cbiAgbWVzc2FnZSArPSBg8J+TiiAqREVTR0xPU0UgREVUQUxMQURPIFBPUiBNw4lUT0RPIERFIFBBR086KlxcbmA7XG4gIFxuICBpZiAoY2FzaEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBtZXNzYWdlICs9IGDwn5K1ICpQQUdPIEVOIEVGRUNUSVZPOipcXG5gO1xuICAgIGNhc2hJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgbGV0IGJhc2VQcmljZTogbnVtYmVyO1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ25vdmVsJykge1xuICAgICAgICBiYXNlUHJpY2UgPSBpdGVtLmNoYXB0ZXJzICogY3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcjtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnbW92aWUnKSB7XG4gICAgICAgIGJhc2VQcmljZSA9IGN1cnJlbnRQcmljZXMubW92aWVQcmljZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2VQcmljZSA9IChpdGVtLnNlbGVjdGVkU2Vhc29ucz8ubGVuZ3RoIHx8IDEpICogY3VycmVudFByaWNlcy5zZXJpZXNQcmljZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVtb2ppID0gaXRlbS50eXBlID09PSAnbW92aWUnID8gJ/CfjqwnIDogaXRlbS50eXBlID09PSAndHYnID8gJ/Cfk7onIDogJ/Cfk5onO1xuICAgICAgbWVzc2FnZSArPSBgICAke2Vtb2ppfSAke2l0ZW0udGl0bGV9OiAkJHtiYXNlUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuYDtcbiAgICB9KTtcbiAgICBtZXNzYWdlICs9IGAgIPCfkrAgKlN1YnRvdGFsIEVmZWN0aXZvOiAkJHtjYXNoVG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQKlxcblxcbmA7XG4gIH1cbiAgXG4gIGlmICh0cmFuc2Zlckl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBtZXNzYWdlICs9IGDwn4+mICpQQUdPIFBPUiBUUkFOU0ZFUkVOQ0lBIEJBTkNBUklBICgrJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6KlxcbmA7XG4gICAgdHJhbnNmZXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgbGV0IGJhc2VQcmljZTogbnVtYmVyO1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ25vdmVsJykge1xuICAgICAgICBiYXNlUHJpY2UgPSBpdGVtLmNoYXB0ZXJzICogY3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcjtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnbW92aWUnKSB7XG4gICAgICAgIGJhc2VQcmljZSA9IGN1cnJlbnRQcmljZXMubW92aWVQcmljZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2VQcmljZSA9IChpdGVtLnNlbGVjdGVkU2Vhc29ucz8ubGVuZ3RoIHx8IDEpICogY3VycmVudFByaWNlcy5zZXJpZXNQcmljZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpbmFsUHJpY2UgPSBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSk7XG4gICAgICBjb25zdCByZWNhcmdvID0gZmluYWxQcmljZSAtIGJhc2VQcmljZTtcbiAgICAgIGNvbnN0IGVtb2ppID0gaXRlbS50eXBlID09PSAnbW92aWUnID8gJ/CfjqwnIDogaXRlbS50eXBlID09PSAndHYnID8gJ/Cfk7onIDogJ/Cfk5onO1xuICAgICAgbWVzc2FnZSArPSBgICAke2Vtb2ppfSAke2l0ZW0udGl0bGV9OlxcbmA7XG4gICAgICBtZXNzYWdlICs9IGAgICAg8J+SsCBCYXNlOiAkJHtiYXNlUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuYDtcbiAgICAgIG1lc3NhZ2UgKz0gYCAgICDwn5KzIFJlY2FyZ28gKCR7dHJhbnNmZXJGZWVQZXJjZW50YWdlfSUpOiArJCR7cmVjYXJnby50b0xvY2FsZVN0cmluZygpfSBDVVBcXG5gO1xuICAgICAgbWVzc2FnZSArPSBgICAgIPCfkrAgVG90YWw6ICQke2ZpbmFsUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuYDtcbiAgICB9KTtcbiAgICBtZXNzYWdlICs9IGAgIPCfkrAgKlN1YnRvdGFsIFRyYW5zZmVyZW5jaWE6ICQke3RyYW5zZmVyVG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQKlxcblxcbmA7XG4gIH1cbiAgXG4gIG1lc3NhZ2UgKz0gYPCfk4sgKlJFU1VNRU4gRklOQUwgREUgUEFHT1M6KlxcbmA7XG4gIGlmIChjYXNoVG90YWwgPiAwKSB7XG4gICAgbWVzc2FnZSArPSBg4oCiIEVmZWN0aXZvOiAkJHtjYXNoVG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQICgke2Nhc2hJdGVtcy5sZW5ndGh9IGVsZW1lbnRvcylcXG5gO1xuICB9XG4gIGlmICh0cmFuc2ZlclRvdGFsID4gMCkge1xuICAgIG1lc3NhZ2UgKz0gYOKAoiBUcmFuc2ZlcmVuY2lhOiAkJHt0cmFuc2ZlclRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9IENVUCAoJHt0cmFuc2Zlckl0ZW1zLmxlbmd0aH0gZWxlbWVudG9zKVxcbmA7XG4gIH1cbiAgbWVzc2FnZSArPSBg4oCiICpTdWJ0b3RhbCBDb250ZW5pZG86ICQke3N1YnRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9IENVUCpcXG5gO1xuICBcbiAgaWYgKHRyYW5zZmVyRmVlID4gMCkge1xuICAgIG1lc3NhZ2UgKz0gYOKAoiBSZWNhcmdvIHRyYW5zZmVyZW5jaWEgKCR7dHJhbnNmZXJGZWVQZXJjZW50YWdlfSUpOiArJCR7dHJhbnNmZXJGZWUudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuYDtcbiAgfVxuICBcbiAgLy8gSW5mb3JtYWNpw7NuIGRlIGVudHJlZ2FcbiAgbWVzc2FnZSArPSBgXFxu8J+TjSAqSU5GT1JNQUNJw5NOIERFIEVOVFJFR0E6KlxcbmA7XG4gIGlmIChwaWNrdXBMb2NhdGlvbikge1xuICAgIG1lc3NhZ2UgKz0gYPCfj6ogKlJFQ09HSURBIEVOIEVMIExPQ0FMOipcXG5gO1xuICAgIG1lc3NhZ2UgKz0gYOKAoiBVYmljYWNpw7NuOiBUViBhIGxhIENhcnRhXFxuYDtcbiAgICBtZXNzYWdlICs9IGDigKIgRGlyZWNjacOzbjogUmVwYXJ0byBOdWV2byBWaXN0YSBBbGVncmUsIFNhbnRpYWdvIGRlIEN1YmFcXG5gO1xuICAgIG1lc3NhZ2UgKz0gYOKAoiBDb3N0bzogR1JBVElTXFxuYDtcbiAgICBcbiAgICBpZiAoc2hvd0xvY2F0aW9uTWFwKSB7XG4gICAgICBtZXNzYWdlICs9IGDigKIg8J+TjSBDb29yZGVuYWRhcyBHUFM6IDIwLjAzOTU4NSwgLTc1Ljg0OTY2M1xcbmA7XG4gICAgICBtZXNzYWdlICs9IGDigKIg8J+Xuu+4jyBHb29nbGUgTWFwczogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3BsYWNlLzIwJUMyJUIwMDInMjIuNSUyMk4rNzUlQzIlQjA1MCc1OC44JTIyVy9AMjAuMDM5NDYwNCwtNzUuODQ5NTQxNCwxODBtL2RhdGE9ITNtMSExZTMhNG00ITNtMyE4bTIhM2QyMC4wMzk1ODUhNGQtNzUuODQ5NjYzP2VudHJ5PXR0dSZnX2VwPUVnb3lNREkxTURjek1DNHdJS1hNRFNvQVNBRlFBdyUzRCUzRFxcbmA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgKz0gYPCfmpogKkVOVFJFR0EgQSBET01JQ0lMSU86KlxcbmA7XG4gICAgbWVzc2FnZSArPSBg4oCiIFpvbmE6ICR7ZGVsaXZlcnlab25lLnJlcGxhY2UoJyA+ICcsICcg4oaSICcpfVxcbmA7XG4gICAgaWYgKGN1c3RvbWVySW5mby5hZGRyZXNzKSB7XG4gICAgICBtZXNzYWdlICs9IGDigKIgRGlyZWNjacOzbjogJHtjdXN0b21lckluZm8uYWRkcmVzc31cXG5gO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IGDigKIgQ29zdG8gZGUgZW50cmVnYTogJCR7ZGVsaXZlcnlDb3N0LnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcbmA7XG4gIH1cbiAgXG4gIG1lc3NhZ2UgKz0gYFxcbvCfjq8gKlRPVEFMIEZJTkFMOiAkJHt0b3RhbC50b0xvY2FsZVN0cmluZygpfSBDVVAqXFxuXFxuYDtcbiAgXG4gIG1lc3NhZ2UgKz0gYPCfk4ogKkVTVEFEw41TVElDQVMgREVMIFBFRElETzoqXFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIFRvdGFsIGRlIGVsZW1lbnRvczogJHtpdGVtcy5sZW5ndGh9XFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIFBlbMOtY3VsYXM6ICR7aXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlID09PSAnbW92aWUnKS5sZW5ndGh9XFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIFNlcmllczogJHtpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09ICd0dicpLmxlbmd0aH1cXG5gO1xuICBtZXNzYWdlICs9IGDigKIgTm92ZWxhczogJHtpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdub3ZlbCcpLmxlbmd0aH1cXG5gO1xuICBpZiAoY2FzaEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBtZXNzYWdlICs9IGDigKIgUGFnbyBlbiBlZmVjdGl2bzogJHtjYXNoSXRlbXMubGVuZ3RofSBlbGVtZW50b3NcXG5gO1xuICB9XG4gIGlmICh0cmFuc2Zlckl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBtZXNzYWdlICs9IGDigKIgUGFnbyBwb3IgdHJhbnNmZXJlbmNpYTogJHt0cmFuc2Zlckl0ZW1zLmxlbmd0aH0gZWxlbWVudG9zXFxuYDtcbiAgfVxuICBtZXNzYWdlICs9IGDigKIgVGlwbyBkZSBlbnRyZWdhOiAke3BpY2t1cExvY2F0aW9uID8gJ1JlY29naWRhIGVuIGxvY2FsJyA6ICdFbnRyZWdhIGEgZG9taWNpbGlvJ31cXG5cXG5gO1xuICBcbiAgbWVzc2FnZSArPSBg8J+SvCAqQ09ORklHVVJBQ0nDk04gREUgUFJFQ0lPUyBBUExJQ0FEQToqXFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIFBlbMOtY3VsYXM6ICQke2N1cnJlbnRQcmljZXMubW92aWVQcmljZS50b0xvY2FsZVN0cmluZygpfSBDVVBcXG5gO1xuICBtZXNzYWdlICs9IGDigKIgU2VyaWVzOiAkJHtjdXJyZW50UHJpY2VzLnNlcmllc1ByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUCBwb3IgdGVtcG9yYWRhXFxuYDtcbiAgbWVzc2FnZSArPSBg4oCiIE5vdmVsYXM6ICQke2N1cnJlbnRQcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXIudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQIHBvciBjYXDDrXR1bG9cXG5gO1xuICBtZXNzYWdlICs9IGDigKIgUmVjYXJnbyB0cmFuc2ZlcmVuY2lhOiAke3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lXFxuXFxuYDtcbiAgXG4gIG1lc3NhZ2UgKz0gYPCfk7EgKkVudmlhZG8gZGVzZGU6KiBUViBhIGxhIENhcnRhIEFwcFxcbmA7XG4gIG1lc3NhZ2UgKz0gYOKPsCAqRmVjaGEgeSBob3JhOiogJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCdlcy1FUycsIHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgc2Vjb25kOiAnMi1kaWdpdCdcbiAgfSl9XFxuYDtcbiAgbWVzc2FnZSArPSBg8J+MnyAqwqFHcmFjaWFzIHBvciBlbGVnaXIgVFYgYSBsYSBDYXJ0YSEqYDtcbiAgXG4gIGNvbnN0IGVuY29kZWRNZXNzYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpO1xuICBjb25zdCBwaG9uZU51bWJlciA9ICc1MzU0NjkwODc4JztcblxuICBjb25zdCBpc01vYmlsZSA9IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgY29uc3QgaXNJT1MgPSAvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIGNvbnN0IGlzQW5kcm9pZCA9IC9BbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgY29uc3QgaXNNYWNPUyA9IC9NYWNpbnRvc2h8TWFjSW50ZWx8TWFjUFBDfE1hYzY4Sy9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIGNvbnN0IGlzV2luZG93cyA9IC9XaW4zMnxXaW42NHxXaW5kb3dzfFdpbkNFL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBsZXQgd2hhdHNhcHBVcmw6IHN0cmluZztcblxuICBpZiAoaXNNb2JpbGUpIHtcbiAgICBpZiAoaXNJT1MpIHtcbiAgICAgIHdoYXRzYXBwVXJsID0gYGh0dHBzOi8vYXBpLndoYXRzYXBwLmNvbS9zZW5kP3Bob25lPSR7cGhvbmVOdW1iZXJ9JnRleHQ9JHtlbmNvZGVkTWVzc2FnZX1gO1xuICAgIH0gZWxzZSBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB3aGF0c2FwcFVybCA9IGBodHRwczovL2FwaS53aGF0c2FwcC5jb20vc2VuZD9waG9uZT0ke3Bob25lTnVtYmVyfSZ0ZXh0PSR7ZW5jb2RlZE1lc3NhZ2V9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hhdHNhcHBVcmwgPSBgaHR0cHM6Ly93YS5tZS8ke3Bob25lTnVtYmVyfT90ZXh0PSR7ZW5jb2RlZE1lc3NhZ2V9YDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgd2hhdHNhcHBVcmwgPSBgaHR0cHM6Ly93ZWIud2hhdHNhcHAuY29tL3NlbmQ/cGhvbmU9JHtwaG9uZU51bWJlcn0mdGV4dD0ke2VuY29kZWRNZXNzYWdlfWA7XG4gIH1cblxuICBpZiAoaXNNb2JpbGUpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdoYXRzYXBwVXJsO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5ld1dpbmRvdyA9IHdpbmRvdy5vcGVuKHdoYXRzYXBwVXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKTtcbiAgICBpZiAoIW5ld1dpbmRvdykge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aGF0c2FwcFVy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