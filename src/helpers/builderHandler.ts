export const handlePending = (state: any) => {
  state.loading = true;
  state.errors = null;
};

export const handleFulfilled = (state: any) => {
  state.loading = false;
  state.errors = null;
};

export const handleRejected = (state: any, action: any) => {
  state.loading = false;
  state.errors = action.payload as any;
};
