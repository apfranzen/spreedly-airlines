export const fetchSpreedly = async (url, method, body) => {
  console.log(JSON.stringify(body));
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      console.log(res);
      return await res.json();
    } else {
      console.log({ error: res.statusText || "Error, please try again later" });
      return { error: res.statusText || "Error, please try again later" };
    }
  } catch (e) {
    console.log(e);
    return e instanceof Error ? { error: e.message } : { error: "Error" };
  }
};

export function handleResponse(res, setErrors) {
  if (res.hasOwnProperty("error")) {
    setErrors(res.error);
  } else {
    return res;
  }
}
