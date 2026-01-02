function LoadingSpinner() {
  return (
    <div className="loading-container" aria-live="polite" aria-busy="true">
      <div className="ghost-loader">👻</div>
      <p>Loading ghost data...</p>
    </div>
  );
}

export default LoadingSpinner;
