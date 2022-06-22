import Swal from 'sweetalert2';
import apiConnection from '../config/apiConnection';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('file', file.name);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await apiConnection.post('/upload', formData, config);

    return Swal.fire({
      icon: 'success',
      title: `${response.data}`,
      showConfirmButton: true,
    });
  } catch (error) {
    return Swal.fire({
      icon: 'error',
      title: 'Hubo un error',
      text: `${error.response.data}`,
    });
  }
};
