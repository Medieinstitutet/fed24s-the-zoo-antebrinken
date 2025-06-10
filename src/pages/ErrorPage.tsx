import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div>
      <h1>Oops! Något gick fel.</h1>
      <p>{error.statusText || error.message || "Okänt fel"}</p>
      <a href="/">Tillbaka till startsidan</a>
    </div>
  );
}