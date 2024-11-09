interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button
      style={{
        padding: "10px 20px",
        marginRight: "5px",
        cursor: "pointer",
        backgroundColor: active ? "#007bff" : "#f0f0f0",
        color: active ? "#fff" : "#000",
        borderRadius: "5px",
        borderColor: "darkblue",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
