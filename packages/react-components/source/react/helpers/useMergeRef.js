import { useMemo } from 'react';

const refToFn = ref => {
  if (!ref || typeof ref === 'function') {
    return ref;
  }
  return v => {
    // eslint-disable-next-line no-param-reassign
    ref.current = v;
  };
};

const useMergeRef = (ref1, ref2) => {
  return useMemo(() => {
    const refFunc1 = refToFn(ref1);
    const refFunc2 = refToFn(ref2);
    return val => {
      if (refFunc1) {
        refFunc1(val);
      }
      if (refFunc2) {
        refFunc2(val);
      }
    };
  }, [ref1, ref2]);
};

export default useMergeRef;
