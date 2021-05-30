import "./table.css";
const Table = ({ column, list, onDelete, onEdit }) => {
  let head = column;
  if (!column) head = Object.keys(list[0]);
  return (
    <table className="data-table">
      <thead>
        <tr>
          {head.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
          {(onDelete || onEdit) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {list.map((obj, index) => (
          <tr key={index}>
            {head.map((item, j) => (
              <td key={j}>{obj[item]}</td>
            ))}
            {(onDelete || onEdit) && (
              <td>
                {[
                  onEdit && (
                    <span
                      onClick={() => onEdit(index)}
                      key="edit"
                      className="p-5 t-underLine c-pointer"
                    >
                      Edit
                    </span>
                  ),
                  onDelete && (
                    <span
                      onClick={() => onDelete(index)}
                      key="del"
                      className="p-5 t-underLine c-pointer"
                    >
                      Delete
                    </span>
                  ),
                ]}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
