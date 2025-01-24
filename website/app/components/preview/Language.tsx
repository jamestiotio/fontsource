import { useSelector } from '@legendapp/state/react';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';

import { DropdownSimple } from '@/components/Dropdown';
import { subsetsMap } from '@/utils/language/subsets';

import { previewState } from './observables';

interface LanguageSelectorProps {
	subsets: string[];
}

interface LanguageFetcher {
	text: string;
}

const LanguageSelector = ({ subsets }: LanguageSelectorProps) => {
	const language = useSelector(previewState.language);
	const languageFetcher = useFetcher<LanguageFetcher>();

	useEffect(() => {
		languageFetcher.submit(
			{ subset: language },
			{
				method: 'POST',
				action: '/actions/language',
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	useEffect(() => {
		if (languageFetcher.state === 'idle' && languageFetcher.data?.text) {
			previewState.text.set(languageFetcher.data.text);
		}
	}, [languageFetcher]);

	const items = subsets.map((lang) => ({
		label: subsetsMap[lang as keyof typeof subsetsMap],
		value: lang,
	}));

	return (
		<DropdownSimple
			label={subsetsMap[language as keyof typeof subsetsMap]}
			currentState={language}
			items={items}
			selector={previewState.language}
			w={284}
		/>
	);
};

export { LanguageSelector };
