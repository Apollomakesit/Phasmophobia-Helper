function LoadingSpinner() {
  return (
    <div className="loading-container" aria-label="Loading analysis">
      <div className="ghost-loader" aria-hidden="true">
        👻
      </div>
      <p className="loading-text">Analyzing evidence...</p>
    </div>
  );
}

export default LoadingSpinner;
