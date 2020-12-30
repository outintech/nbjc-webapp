## BusinessResultCard

```jsx
const [checked, setChecked] = React.useState(false);
const business =  {
  id: '123',
  name: 'La colombe coffee roasters',
  category: 'Coffee',
  address: '924 Blagden Alley Way Washington, D.C. 20001',
  distance: '0.03mi',
  phoneNumber: '123-456-7890',
};
<BusinessResultCard business={business} checked={checked} onCheck={() => setChecked(!checked)} />
```