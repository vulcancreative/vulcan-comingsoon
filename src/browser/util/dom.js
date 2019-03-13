const viewportSize = () => {
  const result = { x: 0, y: 0 };

  if (process.env.BROWSER) {
    result.x = Math.max(
      document.documentElement.clientWidth, window.innerWidth || 0
    );

    result.y = Math.max(
      document.documentElement.clientHeight, window.innerHeight || 0
    );
  }

  return result;
};

// globally fixes typographic widows, inspired by https://bit.ly/2VR8fQ7
const fixWidows = () => {
  const els = document.querySelectorAll('h2, h3, p, span, li');

  const insertNbsp = (el) => {
    const html = el.innerHTML;
    if (/(&nbsp;\S*)$/.test(html)) return;
    el.innerHTML = html.replace(/ ([^ ]*)$/, '&nbsp;$1');
  };

  els.forEach((el) => insertNbsp(el));
};

export { fixWidows, viewportSize };
