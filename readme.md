# `@architect/proxy-plugin-css-urls`

Prepend `@import` URLs with `/staging` or `/production`

```css
/* input */
@import '/bar.css';

/* output */
@import '/staging/bar.css';
```
