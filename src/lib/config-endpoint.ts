// API endpoint to get public configuration
apiRouter.get("/config", async (c) => {
  return c.json({
    turnstile_site_key: c.env.TURNSTILE_SITE_KEY || ''
  });
});
