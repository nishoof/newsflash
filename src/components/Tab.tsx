interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button
      style={{
        borderBottomStyle: active ? "solid" : "hidden",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
