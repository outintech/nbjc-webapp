import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import useQuery from '../../../hooks/useQuery';
import { getSearchResults, getLocation } from '../../../api';
import utils from '../../../utils';

const getSearchCriteria = (query) => ({
  searchTerm: query.get('searchTerm'),
  category: query.get('category'),
  location: query.get('location'),
  distance: parseInt(query.get('distance'), 10) || 0,
  rating: parseFloat(query.get('rating')) || 0,
  price: parseInt(query.get('price'), 10) || 0,
  indicators: query.getAll('indicators'),
  // pageNumber: parseInt(query.get('pageNumber'), 10) || 1,
  // pageSize: parseInt(query.get('pageSize'), 10) || 20,
});

const useSearch = ({ indicators, userCoords }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [pagination, setPagination] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const { promiseInProgress } = usePromiseTracker();

  const searchCriteria = getSearchCriteria(query);
  const [search, setSearch] = useState({
    ...searchCriteria,
    chips: indicators.map((c) => ({
      ...c,
      isSelected: searchCriteria.indicators.includes(c.value),
    })),
  });

  useEffect(() => {
    async function fetchData() {
      if (searchCriteria.searchTerm === 'empty') {
        setSearchResults([]);
        return;
      }
      const { data, meta } = await getSearchResults(searchCriteria);
      if (data.length === 0) {
        setSearchResults([]);
        setPagination(null);
        return;
      }
      setPagination(meta);
      setSearchResults(data.map(utils.formatSearchResults));
    }
    if (
      (search.searchTerm && search.searchTerm.length > 0)
      || (search.category && search.category.length > 0)
      || (search.location && search.location.length > 0)
    ) {
      try {
        trackPromise(fetchData());
      } catch (e) {
        setSearchResults([]);
      }
    } else {
      setSearchResults(null);
    }
  }, [search]);

  const [userLocation, setUserLocation] = useState({
    coords: userCoords,
    address: null,
  });

  useEffect(() => {
    async function fetchLocation() {
      if (userCoords && userCoords !== null) {
        const locationResult = await getLocation({
          lat: userCoords.latitude,
          lng: userCoords.longitude,
        });
        setUserLocation({
          ...userLocation,
          address: locationResult.data.address,
        });
      }
    }
    try {
      trackPromise(fetchLocation());
    } catch (e) {
      setUserLocation({
        ...userLocation,
        address: null,
      });
    }
  }, [userCoords]);
  console.log(userCoords);
  const updateSearch = (searchData) => {
    const {
      name,
      category,
      indicators: searchIndicators,
      location,
    } = searchData;
    if (name) {
      query.set('searchTerm', name.name);
    }
    if (category) {
      query.set('category', category.alias);
    }
    if (location) {
      query.set('location', location);
    }
    query.delete('indicators');
    if (searchIndicators) {
      searchIndicators.forEach((indicator) => {
        if (indicator.isSelected) {
          query.append('indicators', indicator.value);
        }
      });
    }

    history.push({ pathname: '/search/results', search: query.toString() });
    const updatedSearchCritera = getSearchCriteria(query);
    setSearch({
      ...updatedSearchCritera,
      chips: indicators.map((c) => ({
        ...c,
        isSelected: updatedSearchCritera.indicators.includes(c.value),
      })),
    });
  };

  const updateFilters = (filterName, value) => {
    if (!value) {
      query.delete(filterName, value);
    } else {
      query.set(filterName, value);
    }
    history.push({ pathname: '/search/results', search: query.toString() });
    const updatedSearchCritera = getSearchCriteria(query);
    setSearch({
      ...updatedSearchCritera,
      chips: indicators.map((c) => ({
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
    loading: promiseInProgress,
    updateFilters,
    pagination,
    userLocation,
  };
};

export default useSearch;
