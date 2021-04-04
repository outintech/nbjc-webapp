## AppBar

```jsx
const routes = [{
  label: 'Home',
  path: '/',
  key: 'home',
  icon: <></>,
}, {
  label: 'Search for a space',
  path: '/search',
  key: 'search',
  icon: <></>,
}];

<AppBar isLoggedIn={false} selected="home" routes={routes} />
```