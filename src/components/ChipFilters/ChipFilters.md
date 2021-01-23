## ChipFilters

```jsx
const chips = [{
    name: 'Black Friendly',
  }, {
    name: 'Inclusive',
  }, {
    name: 'Black Owned',
  }, {
    name: 'Gender Neutral Restrooms',
  }, {
    name: 'Accessible',
  }, {
    name: 'Queer hangout space',
  }, {
    name: 'Trans friendly',
  }, {
    name: 'Queer owned',
}];
const [activeChips, setActiveChips] = React.useState(chips);
const onChipSelected = (i) => {
  const chips = [...activeChips];
  chips[i].isSelected = !chips[i].isSelected;
  setActiveChips(chips);
}
<ChipFilters chips={activeChips} onChipSelected={onChipSelected} />
```