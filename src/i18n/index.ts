const locales = require.context(
  "./",
  true,
  /[A-Za-z0-9-_,\s]+\.json$/i
);
const messages: any = {};
locales.keys().forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i);
  if (matched && matched.length > 1)
    messages[matched[1]] = locales(key);
});
export default messages

