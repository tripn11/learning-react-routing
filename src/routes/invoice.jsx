import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams(); //useParams returns an object like props of a component. It is like props but for links or url
  let invoice = getInvoice(parseInt(params.invoiceId, 10)); //the invoiceId is the variable passed in as the variable path in the link to each invoice page in the main.jsx. The parseInt must be used because the params properties are always strings.
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices" + location.search);
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}