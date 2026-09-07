const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let modified = false;

  content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, scriptBody) => {
    if (scriptBody.includes('&gt;') || scriptBody.includes('&lt;') || scriptBody.includes('&amp;')) {
      modified = true;
      const unescaped = scriptBody
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
      return match.replace(scriptBody, unescaped);
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(f, content);
    console.log('Fixed scripts in ' + f);
  }
});
