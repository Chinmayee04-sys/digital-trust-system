const RemarksTimeline = ({ remarks }) => {
  if (!remarks || remarks.length === 0) {
    return <p>No remarks yet</p>;
  }

  return (
    <ul>
      {remarks.map((r, index) => (
        <li key={index}>
          <strong>{r.role}</strong>: {r.text}
        </li>
      ))}
    </ul>
  );
};

export default RemarksTimeline;
