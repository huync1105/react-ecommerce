export function handleHttpResponse(res: any, toast: any, onSuccess?: any, onError?: Function) {
  if (res.data.statusCode === 200) {
    toast.success(res.data.message);
    onSuccess && onSuccess();
  } else {
    toast.error(res.data.message);
    onError && onError();
  }
}

export function truncate(text: string, limit: number):string {
  let data: any;
  if (text.length <= limit) {
    return text;
  } else {
    data = text.split("");
    data.splice(limit, text.length - limit, '...');
    return data;
  }
}