import React from "react";

function NewReleases() {
  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="grid card bg-base-300 rounded-box place-items-center">
        <span id="newReleaseText">The newest hits for your party</span>
        <section id="newReleases">
          {releaseArray.map(release => (
            <Card key={release.id} card={release} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default NewReleases;
