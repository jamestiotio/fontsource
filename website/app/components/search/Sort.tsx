import { useSelector } from '@legendapp/state/react';
import { Center, Group, SegmentedControl, Text, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { useSortBy } from 'react-instantsearch';

import { DropdownSimple } from '@/components/Dropdown';
import { IconGrid, IconList } from '@/components/icons';

import { display, sort } from './observables';
import classes from './Sort.module.css';

interface SortProps {
	count: number;
}

const indexMap = {
	prod_POPULAR: 'Most Popular',
	prod_NEWEST: 'Last Updated',
	prod_NAME: 'Name',
	prod_RANDOM: 'Random',
};

const Sort = ({ count }: SortProps) => {
	const sortSelect = useSelector(sort);
	const displaySelect = useSelector(display);

	const sortItems = [
		{ value: 'prod_POPULAR', label: 'Most Popular' },
		{ value: 'prod_NEWEST', label: 'Last Updated' },
		{ value: 'prod_NAME', label: 'Name' },
		{ value: 'prod_RANDOM', label: 'Random' },
	];

	const { refine } = useSortBy({
		items: sortItems,
	});

	useEffect(() => {
		refine(sortSelect);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortSelect]);

	return (
		<div className={classes.wrapper}>
			<Text>{count} families loaded</Text>
			<Group>
				<Group className={classes['display-group']}>
					<DropdownSimple
						label={indexMap[sortSelect]}
						items={sortItems}
						currentState={sortSelect}
						selector={sort}
						w={140}
					/>
					<Text span ml="xs" mr={-8} fz={14}>
						Display
					</Text>
					<Tooltip
						label={displaySelect === 'grid' ? 'Grid' : 'List'}
						openDelay={600}
						closeDelay={100}
					>
						<SegmentedControl
							className={classes.control}
							value={displaySelect}
							onChange={display.set as (value: string) => void}
							data={[
								{
									label: (
										<Center>
											<IconGrid
												height={20}
												data-active={displaySelect === 'grid'}
											/>
										</Center>
									),
									value: 'grid',
								},
								{
									label: (
										<Center>
											<IconList
												height={20}
												data-active={displaySelect === 'list'}
											/>
										</Center>
									),
									value: 'list',
								},
							]}
						/>
					</Tooltip>
				</Group>
			</Group>
		</div>
	);
};

export { Sort };
