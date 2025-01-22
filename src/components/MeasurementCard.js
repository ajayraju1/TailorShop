const MeasurementCard = ({ label, onChange, value, image }) => {
  return (
    <div className="measurement-card">
      <img src={image} alt={label} className="measurement-image" />
      <label className="measurement-label">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="measurement-input"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

export default MeasurementCard;
