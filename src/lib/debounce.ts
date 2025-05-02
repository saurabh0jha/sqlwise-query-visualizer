const debounce = (fn: Function, timeout: number) => {
  let timer: NodeJS.Timeout | undefined;
  let savedArgs: any[];

  return (...args: any[]) => {
    savedArgs = args;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, savedArgs);
        timer = undefined;
        clearTimeout(timer);
      }, timeout);
    }
  };
};

export default debounce;
