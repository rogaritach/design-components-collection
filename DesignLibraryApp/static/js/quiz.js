const form = document.getElementById("quiz-form");
const resultsContainer = document.getElementById("quiz-results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const answers = [
    interaction.value,
    weight.value,
    mood.value,
    type.value
  ];

  // fetch components from backend
  const response = await fetch("/api/components");
  const components = await response.json();

  // score components
  const scored = components.map(component => {
    let score = 0;
    answers.forEach(answer => {
      if (component.tags.includes(answer)) {
        score++;
      }
    });
    return { ...component, score };
  });

  // sort by best match
  const bestMatches = scored
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  renderResults(bestMatches);
});

function renderResults(components) {
  resultsContainer.innerHTML = "<h3>Recommended for you</h3>";

  if (components.length === 0) {
    resultsContainer.innerHTML += "<p>No matches found.</p>";
    return;
  }

  components.forEach(c => {
    resultsContainer.innerHTML += `
      <a href="/component/${c.id}" class="component-card glass-card">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <div class="tags">
          ${c.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </a>
    `;
  });
}
