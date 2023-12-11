export default function Home() {
  const apiKey = process.env.REACT_APP_GIPHY_API_KEY;

  return (
    <div>
      <h1>Home Page</h1>
      {apiKey ? (
        <div className="row">
          <img src="logo512.png" alt="Logo" />
        </div>
      ) : (
        <div className="alert alert-warning">
          <strong>Warning:</strong> Please set the environment variable
          REACT_APP_GIPHY_API_KEY to a valid key.
        </div>
      )}
    </div>
  );
}
