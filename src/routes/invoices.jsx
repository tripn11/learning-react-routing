import { Outlet, NavLink,useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams(); //useSearchParams returns an array of the current searchParams and a function to set the searchParams.

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""} //get the current properties if any and write it in the input box
          onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
              setSearchParams({ filter }); //set the filter properties to be equal to what the user has typed.
          } else {
              setSearchParams({});
          }
          }}
      />
      {invoices
          .filter((invoice) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = invoice.name.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}