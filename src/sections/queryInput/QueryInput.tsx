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
      <div role="region" aria-label="SQL Query Input">
        <textarea
          className="field-sizing-content w-full p-4 text-md rounded-md border-2 focus-visible:border-accent min-h-12"
          placeholder="Enter your query"
          value={valueOfQuery}
          onChange={(e) => {
            setValueOfQuery(e.target.value);
            debouncedChangeHandler(e.target.value);
          }}
          aria-label="SQL Query"
          aria-multiline="true"
          role="textbox"
          aria-describedby="query-description"
          tabIndex={0}
        />
        <div id="query-description" className="sr-only">
          Enter your SQL query in this text area. The query will be
          automatically processed after you stop typing for 2 seconds.
        </div>
      </div>
    );
  }
);

export default QueryInput;
