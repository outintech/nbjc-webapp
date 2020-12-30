import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '../../../hooks/useQuery';

const getSearchCriteria = (query) => ({
  searchTerm: query.get('searchTerm'),
  distance: query.get('distance'),
  rating: query.get('rating'),
  price: query.get('price'),
  indicators: query.getAll('indicators'),
});

const useSearch = () => {
  const chips = [{
    name: 'Black Friendly',
    value: '1',
  }, {
    name: 'Inclusive',
    value: '2',
  }, {
    name: 'Black Owned',
    value: '3',
  }, {
    name: 'Gender Neutral Restrooms',
    value: '4',
  }, {
    name: 'Accessible',
    value: '5',
  }, {
    name: 'Queer hangout space',
    value: '6',
  }, {
    name: 'Trans friendly',
    value: '7',
  }, {
    name: 'Queer owned',
    value: '8',
  }];
  const [searchResults] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const searchCriteria = getSearchCriteria(query);
  const [search, setSearch] = useState({
    ...searchCriteria,
    chips: chips.map((c) => ({
      ...c,
      isSelected: searchCriteria.indicators.includes(c.value),
    })),
  });
  const updateSearch = (criteria, value) => {
    if (criteria === 'indicators') {
      if (searchCriteria.indicators.includes(value)) {
        query.delete('indicators');
        searchCriteria.indicators.forEach((indicator) => {
          if (indicator !== value) {
            query.append('indicators', indicator);
          }
        });
      } else {
        query.append(criteria, value);
      }
    } else if (!value) {
      query.delete(criteria);
    } else {
      query.set(criteria, value);
    }
    history.push({ pathname: '/search', search: query.toString() });
    const updatedSearchCritera = getSearchCriteria(query);
    setSearch({
      ...updatedSearchCritera,
      chips: chips.map((c) => ({
        ...c,
        isSelected: updatedSearchCritera.indicators.includes(c.value),
      })),
    });
  };

  return {
    searchResults,
    searchCriteria,
    search,
    updateSearch,
  };
};

export default useSearch;
