import debounce from "@/lib/debounce";
import React, { useCallback, useEffect, useState } from "react";

const QueryInput = React.memo(
  ({
    queryValue,
    onQueryValueChange,
  }: {
    queryValue: string;
    onQueryValueChange: (value: string) => void;
  }) => {
    const [valueOfQuery, setValueOfQuery] = useState(queryValue);

    const debouncedChangeHandler = useCallback(
      debounce(onQueryValueChange, 2000),
      [onQueryValueChange]
    );

    useEffect(() => {
      setValueOfQuery(queryValue);
    }, [queryValue]);

    return (
      <textarea
        className="field-sizing-content w-full p-4 text-md rounded-md border-2 focus-visible:border-accent min-h-12"
        placeholder="Enter your query"
        value={valueOfQuery}
        onChange={(e) => {
          setValueOfQuery(e.target.value);
          debouncedChangeHandler(e.target.value);
        }}
      />
    );
  }
);

export default QueryInput;
