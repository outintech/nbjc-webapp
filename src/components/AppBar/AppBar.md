## AppBar

```jsx
const [selected, setSelected] = React.useState('home');
const onNavigate = (item) => setSelected(item.key);

<AppBar isLoggedIn={false} selected={selected} onNavigate={onNavigate} />
```