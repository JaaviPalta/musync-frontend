// Para mostrar mientras se escribe en un input de números grandes (precio,
// presupuesto). "" en vez de "0" para que el campo se vea vacío en vez de
// mostrar un cero forzado.
export const formatThousands = (value) => {
  if (value === '' || value === null || value === undefined) return ''
  const digits = String(value).replace(/\D/g, '')
  if (!digits) return ''
  return Number(digits).toLocaleString('es-CL')
}
