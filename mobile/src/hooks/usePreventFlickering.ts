import React from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";

export function usePreventFlickering(
  isFetching: number, //or bool
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<any>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
) {
  const [fetching, setFetching] = React.useState(isFetching ? true : false);

  const handleRefresh = () => {
    setFetching(true);
    refetch();
  };

  React.useEffect(() => {
    setFetching(isFetching ? true : false);
  }, [isFetching]);

  return { fetching, handleRefresh };
}
