interface DebounceInterface {
  timeout?: number;
}

export const useDebounce = ({
  timeout
}: DebounceInterface) => {
  const debounce = (func: () => void) => {
    let timer: unknown;

    return (...args: any) => {
      clearTimeout(timer as number)
      timer = setTimeout(() => func.apply(args), timeout)
    }
  }

  return {
    debounce
  };
}