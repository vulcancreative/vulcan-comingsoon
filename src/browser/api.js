const post = (route, form) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    const inputs = [];
    const inputEls = form.querySelectorAll('input, textarea');

    for (let i = 0; i != inputEls.length; i++) inputs.push(inputEls[i]);

    const params = inputs.map((el) =>
      `${encodeURIComponent(el.name)}=${encodeURIComponent(el.value)}`
    ).join('&');

    xhr.onload = () => { resolve(JSON.parse(xhr.response)); };

    const isDev = process.env.NODE_ENV.toLowerCase().includes('dev');

    const base = isDev ?
      'http://localhost:4040' : 'https://api.vulcanca.com';

    xhr.open('POST', `${base}${route}?${params}`);
    xhr.send();
  });
};

export { post };
