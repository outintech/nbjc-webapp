## FilterDialog

```jsx
import FilterDialog from './FilterDialog';
const [open, setOpen] = React.useState(false);
<>
  <button onClick={() => setOpen(true)}>Click to open dialog</button>
  <FilterDialog open={open} onClose={() => setOpen(false)}/>
</>
```

### PriceFilter

```jsx
import PriceFilter from './PriceFilter';

const [active, setActive] = React.useState(1);
const priceFilters = [...Array(4)].map((_, i) => ({
  label: [...Array(i + 1)].map(() => '$').join(),
  value: i + 1,
  active: active === i + 1,
}));
const filterClick = (i) => setActive(i);
<PriceFilter filters={priceFilters} onFilterClick={filterClick} />
```