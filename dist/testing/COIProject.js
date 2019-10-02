const projectInterface = (state) => ({
  type: 'projectInterface',
  add: () => state.add(state),
  show: () => state.show(state),
});

export default projectInterface;
