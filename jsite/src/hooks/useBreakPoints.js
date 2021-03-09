import { useState, useEffect } from 'react';

const queries = {
    xs: '(min-width: 0px) and (max-width: 575px)',
    sm: '(min-width: 576px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 991px)',
    lg: '(min-width: 992px) and (max-width: 1199px)',
    xl: '(min-width: 1200px)',
};

/**
 * window.matchMedia 를 사용하여 window 크기(xs, sm, md, lg) 리턴
 * @example
 * { xs: false, sm: true, md: false, lg: false }
 * @returns {Object} 현재 breakpoint
 */
const useBreakpoint = () => {
    const [queryMatch, setQueryMatch] = useState({});

    useEffect(() => {
        const mediaQueryLists = {};
        const keys = Object.keys(queries);

        // To check whether event listener is attached or not
        let isAttached = false;

        const handleQueryListener = () => {
            const updatedMatches = keys.reduce((acc, media) => {
                acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
                return acc;
            }, {});
            //Setting state to the updated matches
            // when document either starts or stops matching a query
            setQueryMatch(updatedMatches);
        };

        if (window && window.matchMedia) {
            const matches = {};
            keys.forEach((media) => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media] = window.matchMedia(queries[media]);
                    matches[media] = mediaQueryLists[media].matches;
                } else {
                    matches[media] = false;
                }
            });
            //Setting state to initial matching queries
            setQueryMatch(matches);
            isAttached = true;
            keys.forEach((media) => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media].addListener(handleQueryListener);
                }
            });
        }

        return () => {
            //If event listener is attached then remove it when deps change
            if (isAttached) {
                keys.forEach((media) => {
                    if (typeof queries[media] === 'string') {
                        mediaQueryLists[media].removeListener(handleQueryListener);
                    }
                });
            }
        };
    }, []);

    return queryMatch;
};

export default useBreakpoint;
