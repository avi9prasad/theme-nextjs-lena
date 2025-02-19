import type { AlgoliaStory } from '@prezly/theme-kit-core';
import { getCategoryHasTranslation } from '@prezly/theme-kit-core';
import { useCategories, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import type { StateResultsProvided } from 'react-instantsearch-core';
import { connectStateResults } from 'react-instantsearch-dom';

import CategoriesList from './CategoriesList';
import SearchResults from './SearchResults';

import styles from './MainPanel.module.scss';

interface Props {
    onClose: () => void;
}

function MainPanel({
    searchState,
    searchResults,
    onClose,
}: StateResultsProvided<AlgoliaStory> & Props) {
    const isQuerySet = Boolean(searchState.query?.length);
    const categories = useCategories();
    const currentLocale = useCurrentLocale();

    const filteredCategories = categories.filter(
        (category) =>
            category.stories_number > 0 && getCategoryHasTranslation(category, currentLocale),
    );

    if (!filteredCategories.length && !isQuerySet) {
        return null;
    }

    return (
        <div className={styles.container}>
            {isQuerySet ? (
                <SearchResults searchResults={searchResults} query={searchState.query} />
            ) : (
                <CategoriesList filteredCategories={filteredCategories} onCategoryClick={onClose} />
            )}
        </div>
    );
}

export default connectStateResults(MainPanel);
