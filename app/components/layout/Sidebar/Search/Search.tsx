import SearchField from '@/components/ui/search-field/SearchField';
import { useDebounce } from '@/hooks/useDebounce';
import { MovieService } from '@/services/movie.service';
import cn from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import { useQuery } from 'react-query';
import { ISearchProps } from './search.interface';
import SearchList from './SearchList/SearchList';
import styles from './Search.module.scss'

const Search: FC<ISearchProps> = ({ className, ...rest }) => {
	const [keyword, setKeyword] = useState('');
	const debouncedSearch = useDebounce(keyword, 500);

	const { isSuccess, data } = useQuery(
		['search movie list', debouncedSearch],
		() =>
			MovieService.getAll({
				search: debouncedSearch,
			}),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	);
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	return (
		<div className={cn(styles.wrapper, className)} {...rest}>
			<SearchField searchTerm={keyword} handleSearch={handleSearch} />
		{/* 	{isSuccess && <SearchList movies={data?.items || []} />} */}
		</div>
	);
};

export default Search;
