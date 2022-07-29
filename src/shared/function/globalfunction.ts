export function handleHttpResponse(res: any, toast: any, onSuccess?: any, onError?: Function) {
  if (res.data.statusCode === 200) {
    toast.success(res.data.message);
    onSuccess && onSuccess();
  } else {
    toast.error(res.data.message);
    onError && onError();
  }
}