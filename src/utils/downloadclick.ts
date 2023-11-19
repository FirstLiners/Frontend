// downloadClick is not a React hook, but  a regular function that returns a callback function that can be used as a React event handler.

import axios from 'axios';

import dateFormated from './date';

export default async function downloadClick(
  filename?: string,
  token?: string,
): Promise<{ error: object; msg: string; status: number } | { respinfo: object }> {
  const actualDate = dateFormated({ dateString: new Date().toISOString() });
  const pathname = `${process.env.NEXT_PUBLIC_URL}/api/download/${filename}` || 'http://localhost:3000/api/download/file.pdf';
  console.log('url is', pathname, 'token is', token);
  try {
    const response = await axios.get(pathname, {
      params: {
        filename: filename,
      },
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    if (response.status === 200) {
      console.log('response is', response);
      const blob = response.data;
      const { data, ...respinfo } = response;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fname = filename ? filename.split('.')[0].toString() : 'file';
      const ext = filename ? filename.split('.')[1].toString() : 'xlsx';
      console.log('filename', fname, 'ext is', ext);
      link.download = filename ? `${fname}_${actualDate}.${ext}` : `file_${actualDate}.${ext}`;
      link.click();
      window.URL.revokeObjectURL(url);
      return { respinfo };
    } else {
      console.log('Error: Unauthorized or server error', response.status);
      throw new Error('Error: Unauthorized or server error');
    }
  } catch (error: unknown) {
    console.log('Error occurred while downloading file:', error);
    if (typeof error === 'object' && error !== null) {
      const status = (error as any).response.status;
      return { error, msg: `Error occurred while downloading file: ${filename}_${actualDate}`, status: status };
    } else {
      return { error: {}, msg: `Error occurred while downloading file: ${filename}_${actualDate}`, status: 404 };
    }
  }
}