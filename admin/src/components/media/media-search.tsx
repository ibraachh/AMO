import type { IPostItem } from 'src/types/blog';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: IPostItem[];
  onSearch: (inputValue: string) => void;
  hrefItem: (title: string) => string;
  loading?: boolean;
};

export function MediaSearch({ query, results, onSearch, hrefItem, loading }: Props) {
  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(hrefItem(title));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === 'Enter') {
        handleClick(query);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      loading={loading}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={query} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
        paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const matches = match(post.title, inputValue);
        const parts = parse(post.title, matches);

        return (
          <li {...props} key={post.id}>
            <Avatar
              key={post.id}
              alt={post.title}
              src={post.coverUrl}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <Link key={inputValue} underline="none" onClick={() => handleClick(post.title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
