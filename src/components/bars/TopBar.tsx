import { ChangeEvent, SetStateAction } from "react";
import { Completed, Search } from "../../App";
import Logo from "/vite.svg";

interface Props {
  searchObj: {
    search: Search;
    setSearch: (inputText: SetStateAction<Search>) => void;
  };
}
type HandeSearch = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function TopBar({ searchObj }: Props) {
  const { search, setSearch } = searchObj;

  const handleSearch = (e: HandeSearch) => {
    console.log(e.target.value);
    setSearch((currentSearch) => ({
      ...currentSearch,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          <img
            src={Logo}
            alt=""
            className="navbar-brand"
            style={{
              height: "40px",
            }}
          />
          React and Typescript
        </a>
        <form className="d-flex" role="search">
          <input
            value={search.inputText}
            className="form-control me-2"
            placeholder="Search"
            onChange={handleSearch}
            name="inputText"
          />
          <select
            name="completed"
            className="form-select"
            onChange={handleSearch}
          >
            <option value={Completed.ALL} defaultValue={Completed.ALL}>
              All
            </option>
            <option value={Completed.ACTIVE}>Active</option>
            <option value={Completed.INACTIVE}>Inactive</option>
          </select>
        </form>
      </div>
    </nav>
  );
}
