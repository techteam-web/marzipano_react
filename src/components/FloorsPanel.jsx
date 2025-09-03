function FloorsPanel({ current, onSelect }) {
  const floors = [
    { id: "120", label: "120th Floor" },
    { id: "105", label: "105th Floor" },
    { id: "89", label: "89th Floor" },
    { id: "73", label: "73rd Floor" },
  ];

  return (
    <div id="floorsPanel">
      <h2 className="floors-heading">Floors</h2>
      <ul className="floors-list">
        {floors.map((floor) => (
          <li
            key={floor.id}
            className={`floor-item ${current === floor.id ? "selected" : ""}`}
            onClick={() => onSelect(floor.id)}
          >
            {floor.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FloorsPanel;
