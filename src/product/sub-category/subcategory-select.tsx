type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {};
export const SubcategorySelect = ({ ...props }: Props) => {
  return (
    <div className="space-y-3">
      <label htmlFor="selectSub">Sub-Category</label>
      <select id="selectSub" data-te-select-init className="p-2 w-full border">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
      </select>
    </div>
  );
};
export default SubcategorySelect;
