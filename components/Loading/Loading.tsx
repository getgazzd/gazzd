const Loading = ({ style }: { style?: object }) => {
  return (
    <div data-testid="loading" className="m-auto w-max" style={style}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
