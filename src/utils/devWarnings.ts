// Dev-only: Filter noisy warnings from RN Web / navigation internals
if (process.env.NODE_ENV !== 'production') {
  const origWarn = console.warn?.bind(console) || (() => {});
  console.warn = (...args: any[]) => {
    const msg = String(args[0] || '');
    if (
      msg.includes('props.pointerEvents is deprecated') ||
      msg.includes('"shadow*" style props are deprecated')
    ) {
      return; // suppress known noisy warnings on web
    }
    origWarn(...args);
  };
}
