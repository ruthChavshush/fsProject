import Swal from 'sweetalert2';

export const onError = (error: Error) =>
  Swal.fire({ icon: 'error', title: 'Error', text: error.message });
