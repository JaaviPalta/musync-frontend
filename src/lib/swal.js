import Swal from 'sweetalert2'

const themedSwal = Swal.mixin({
  background: 'var(--musync-surface)',
  color: 'var(--musync-text)',
  confirmButtonColor: 'var(--musync-accent)',
  customClass: { cancelButton: 'swal-cancel-outline' },
  buttonsStyling: true,
})

export const confirmDialog = async ({
  title,
  text,
  confirmText = 'Sí, continuar',
  cancelText = 'Cancelar',
  danger = false,
}) => {
  const result = await themedSwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: danger ? '#e5484d' : 'var(--musync-accent)',
  })
  return result.isConfirmed
}

export const successDialog = ({ title, text, confirmText = 'Listo' }) =>
  themedSwal.fire({ title, text, icon: 'success', confirmButtonText: confirmText })
