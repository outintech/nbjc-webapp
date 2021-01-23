## AppBar

```jsx
const routes = [{
  label: 'Home',
  path: '/',
  key: 'home',
  icon: <></>,
  enforceLogin: false,
}, {
  label: 'Search for a space',
  path: '/search',
  key: 'search',
  icon: <></>,
  enforceLogin: false,
}];

<AppBar isLoggedIn={false} selected="home" routes={routes} />
```