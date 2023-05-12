import { TableStyles } from "react-data-table-component";

type styleDatatable = {
  headRow: {
    style: React.CSSProperties;
  };
};

export const customStyles: styleDatatable = {
  headRow: {
    style: {
      padding: "10px",
    },
  },
};
