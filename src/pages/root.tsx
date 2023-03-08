import React from "react";

const Root = (): JSX.Element => {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form
            id="search-form"
            role="search"
          >
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div
              aria-hidden
              hidden
              id="search-spinner"
            />
            <div
              aria-live="polite"
              className="sr-only"
            />
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/contacts/1">Your Name</a>
            </li>
            <li>
              <a href="/contacts/2">Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" />
    </>
  );
};

export default Root;
