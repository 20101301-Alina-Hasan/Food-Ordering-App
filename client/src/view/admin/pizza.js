export default function Pizza({ pizza }) {
  return (
    <div className="m-5">
      <h1>{pizza.name}</h1>
      <img
        src={pizza.image}
        alt="Example"
        className="img-fluid"
        style={{ height: "20rem", width: "20rem", padding: "2rem" }}
      />
      <div
        className="flex-container"
        style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
      </div>
    </div>
  );
}
