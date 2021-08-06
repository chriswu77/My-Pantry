import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'react-bulma-components';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientsActions } from '../../store/ingredients';

const SearchBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddButton = styled(Button)`
  color: green;
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [options, setOptions] = useState([]);
  const [values, setValues] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(async () => {
    if (query) {
      try {
        const response = await axios.post('/api/ingredients/search', { query });
        setOptions(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [query]);

  const onChange = (e, newValue) => {
    setValues(newValue);
  };

  const onTagDelete = (id) => {
    const filteredValues = values.filter((value) => value.id !== id);
    setValues(filteredValues);
  };

  const onClick = async () => {
    try {
      // add ingredients to backend with post request
      await axios.post(`/api/users/${userId}/ingredients`, {
        ingredients: values,
      });
      // get back ingredients from backend with get request
      const response = await axios.get(`/api/users/${userId}/ingredients`);
      // update redux ingredients state
      dispatch(ingredientsActions.set(response.data));
      // remove selected from local state to clear search
      setQuery('');
      setValues([]);
      console.log('added ingredients');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchBarDiv>
      <Autocomplete
        multiple
        id="search-bar"
        options={options}
        getOptionLabel={(option) => option.name}
        value={values}
        onChange={onChange}
        onInputChange={(e, input) => setQuery(input)}
        renderTags={() => null}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search for ingredients"
          />
        )}
      />
      <BottomDiv>
        <TagsContainer>
          {values.map((value) => (
            <Chip
              key={value.id}
              label={value.name}
              onDelete={() => onTagDelete(value.id)}
            />
          ))}
        </TagsContainer>
        {values.length > 0 && (
          <AddButton onClick={onClick}>Add ingredients</AddButton>
        )}
      </BottomDiv>
    </SearchBarDiv>
  );
};

export default SearchBar;
