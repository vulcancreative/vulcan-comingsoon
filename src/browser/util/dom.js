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

export { viewportSize };
