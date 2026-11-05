// Shows the latest observations of an iNaturalist project, using the public
// iNaturalist API (https://api.inaturalist.org/v1/docs/). Without JavaScript,
// or if the API is unreachable, the link to the project page still works.
document.querySelectorAll("[data-inat-project]").forEach(function (box) {
  var status = box.querySelector(".observations__status");
  var grid = box.querySelector(".observations__grid");
  var limit = box.getAttribute("data-inat-limit") || "12";
  var url = "https://api.inaturalist.org/v1/observations?photos=true&order=desc&order_by=created_at" +
    "&per_page=" + encodeURIComponent(limit) +
    "&project_id=" + encodeURIComponent(box.getAttribute("data-inat-project"));

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  fetch(url)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      var results = data.results || [];
      if (results.length === 0) {
        status.textContent = "No observations yet. They will appear here once the Bioblitz starts during the trip.";
        return;
      }
      results.forEach(function (obs) {
        var taxon = obs.taxon || {};
        var common = taxon.preferred_common_name;
        var scientific = taxon.name;
        var photo = obs.photos && obs.photos[0];

        var link = el("a");
        link.href = obs.uri || ("https://www.inaturalist.org/observations/" + obs.id);
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        if (photo && photo.url) {
          var img = el("img");
          img.src = photo.url.replace("/square.", "/medium.");
          img.alt = common || scientific || "Observation photo";
          img.loading = "lazy";
          if (photo.attribution) img.title = photo.attribution;
          link.appendChild(img);
        }

        var body = el("div", "observation__body");
        body.appendChild(el("p", "observation__name", common || scientific || "Unidentified"));
        if (common && scientific) body.appendChild(el("p", "observation__sci", scientific));
        // Non-breaking hyphens keep dates like 2026-12-09 on one line.
        var date = obs.observed_on && obs.observed_on.replace(/-/g, "\u2011");
        var meta = [obs.user && obs.user.login, date].filter(Boolean).join(" · ");
        if (meta) body.appendChild(el("p", "observation__meta", meta));
        link.appendChild(body);

        var item = el("li", "observation");
        item.appendChild(link);
        grid.appendChild(item);
      });
      status.textContent = data.total_results > results.length
        ? "Latest " + results.length + " of " + data.total_results + " observations."
        : results.length + (results.length === 1 ? " observation" : " observations") + " so far.";
      grid.hidden = false;
    })
    .catch(function () {
      status.textContent = "The latest observations could not be loaded. See them on iNaturalist instead.";
    });
});
