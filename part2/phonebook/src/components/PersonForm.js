const PersonForm = ({
  onSubmit,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name:{" "}
      <input
        required
        value={nameValue}
        onChange={onNameChange}
      />
    </div>
    <div>
      number:{" "}
      <input
        required
        value={numberValue}
        onChange={onNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
