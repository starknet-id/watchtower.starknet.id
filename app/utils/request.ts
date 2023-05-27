const request = async (url: string, body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    return res.json();
  } catch (err) {
    return res;
  }
};

export default request;
