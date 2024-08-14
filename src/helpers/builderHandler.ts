export const handlePending = (state: any) => {
  state.loading = true;
  state.errors = null;
};

export const handleFulfilled = (state: any, action?: any) => {
  state.loading = false;
  state.errors = null;
  if (Object.keys(state).includes('data') && action) {
    state.data = action?.payload;
  }
};

export const handleRejected = (state: any, action: any) => {
  state.loading = false;
  state.errors = action.payload as any;
};
