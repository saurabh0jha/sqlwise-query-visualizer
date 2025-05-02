import React from "react";

const QueryInput = React.memo(
  ({
    queryValue,
    onQueryValueChange,
  }: {
    queryValue: string;
    onQueryValueChange: (value: string) => void;
  }) => {
    return (
      <textarea
        className="field-sizing-content w-full p-4 text-md rounded-md border-2 focus-visible:border-accent min-h-12"
        placeholder="Enter your query"
        value={queryValue}
        onChange={(e) => {
          onQueryValueChange(e.target.value);
        }}
      />
    );
  }
);

export default QueryInput;
