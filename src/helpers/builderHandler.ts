export const handlePending = (state: any) => {
  state.loading = true;
};

export const handleFulfilled = (state: any) => {
  state.loading = false;
};

export const handleRejected = (state: any, action: any) => {
  state.loading = false;
  state.errors = action.payload as any;
};
