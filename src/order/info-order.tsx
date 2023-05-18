import { AppInterface } from "@/commons/interface/app";
import BaseModal from "@/components/modals/base-modal";
import styled from "styled-components";

type Props = { order?: AppInterface.Order; onCLose: () => void };
export const InfoOrderPage = ({ order, onCLose = () => {}, ...props }: Props) => {
  if (!order) return <></>;

  return (
    <BaseModal
      open={!!order}
      onClose={() => {
        onCLose();
      }}
      header={<span>Order Info</span>}
      className="max-w-none sm:max-w-screen-md    "
    >
      <div>
        <h1 className="text-center text-2xl my-2 pb-2">{order.id}</h1>
        <div className="flex gap-2 justify-between">
          <div className="flex w-1/2">
            <TabelStyle className="w-full">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{order.name}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>:</td>
                  <td>{order.phone}</td>
                </tr>
                <tr>
                  <td>Courier</td>
                  <td>:</td>
                  <td>{order.courier}</td>
                </tr>
              </tbody>
            </TabelStyle>
          </div>
          <div className="w-1/2">
            <TabelStyle className="w-full">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap align-top">Detail Address</td>
                  <td>:</td>
                  <td className="align-top">{order.detail_address}</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap align-top"> Postal Code</td>
                  <td>:</td>
                  <td>{order.postal_code}</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap align-top">Payement Method</td>
                  <td>:</td>
                  <td>{order.payment_method}</td>
                </tr>
              </tbody>
            </TabelStyle>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex gap-4 flex-wrap ">
          {Object.keys(order.order).map((key, i) => {
            const product = order.order[key];
            return (
              <div key={i} className="space-y-1">
                <div className="flex gap-2">
                  <div className="image border shadow">
                    <img src="" className="w-[120px]" alt="" />
                  </div>
                  <div className="body text-sm">
                    <h2>{product.productTitle}</h2>
                    <div>Choice : {product.productChoice}</div>
                    <div>Qty : {product.productQty}</div>
                    <div>Price : {product.productPrice}</div>
                  </div>
                </div>
                <div>Total : {product.total}</div>
              </div>
            );
          })}
        </div>
      </div>
    </BaseModal>
  );
};

const TabelStyle = styled.table`
  td {
    vertical-align: top;
    padding: 4px;
    &: nth-child(2) {
      font-weight: bold;
    }
  }
`;

export default InfoOrderPage;
