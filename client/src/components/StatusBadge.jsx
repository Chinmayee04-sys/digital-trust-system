const StatusBadge = ({ status }) => {
  const colors = {
    Open: "gray",
    "Under Review": "orange",
    "In Progress": "blue",
    Resolved: "green",
  };

  return (
    <span style={{ color: colors[status] }}>
      {status}
    </span>
  );
};

export default StatusBadge;
