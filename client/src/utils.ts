export const uploadFileToS3 = async (upLoadUrl: string, file: any) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: file,
      ContentEncoding: 'base64'
    };
    return await fetch(upLoadUrl, requestOptions);
  }