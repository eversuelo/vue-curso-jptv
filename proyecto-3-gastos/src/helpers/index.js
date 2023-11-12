export const formatearCantidad = (cantidad) => {
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(cantidad);
}
export const generarId = () => {
   const fecha = Date.now();
    const random=Math.random().toString(36).substring(2);
    return `${fecha}${random}`;
}
export const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    return fechaFormateada.toLocaleDateString('es-ES', opciones);
}