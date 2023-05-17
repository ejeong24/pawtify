import React, {useEffect} from "react";
import {searchSpotify} from "../spotify";
import {useLoaderData, useNavigation, useSubmit, Form} from "react-router-dom";
export async function loader({request}) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const results = await searchSpotify(q);
  return {results, q};
}
function Search() {
  const {results, q} = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new useEffect(() => {
      document.getElementById("q").value = q;
    }, [q]);

  return (
    <Form
      className="searchbar flex justify-center"
      id="search-form"
      role="search">
      <input
        type="search"
        id="q"
        className={
          searching
            ? "loading w-[500px] rounded-full pl-4 my-4"
            : "w-[500px] h-10 rounded-full pl-4 my-4"
        }
        placeholder="not so workies yet"
        defaultValue={q}
        onChange={e => {
          const isFirstSearch = q == null;
          submit(e.currentTarget.form, {
            replace: !isFirstSearch,
          });
        }}
      />
      <button type="submit">🔍</button>
      <div id="search-spinner" aria-hidden hidden={!searching} />
      <div className="sr-only" aria-live="polite"></div>
    </Form>
  );
}
export default Search;
