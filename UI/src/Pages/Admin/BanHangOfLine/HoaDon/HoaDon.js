import React from 'react';
import QRCode from 'qrcode.react';

  const HoaDon = ( ) => {
    const invoiceData = {
      phoneNumber: '0338957590',
      invoiceNumber: 'HD088843',
      date: '23/12/2023 16:35:50',
      customerName: 'Nguyễn Hà Nhật Nam',
      customerPhone: '0378538888',
      customerAddress: '10 Trung Dương Thanh, Xã Minh Hòa, Huyện Dầu Tiếng, Bình Dương',
      items: [
        {
          name: 'KAPPA GIÀY SNEAKERS 123',
          price: 4500000,
          quantity: 1,
          status: 'Thành công',
          total: 4500000
        },
        {
          name: 'KAPPA GIÀY SNEAKERS 123',
          price: 5000000,
          quantity: 1,
          status: 'Thành công',
          total: 5000000
        }
      ],
      subtotal: 9500000,
      discount: 300000,
      shippingFee: 222222,
      total: 9422222,
      totalItems: 2,
      paymentAmount: 9422222,
      paymentMethod: '14257947',
      totalPayment: 9422222,
      change: 0
    };
    const handlePrint = () => {
      window.print();
    };

    return (
      <div className="invoice-container">
        <div className="invoice">
          <div className="invoice-header">
            <div className="logo">
              <img src="/path-to-your-logo.png" alt="SHOE BEE Logo" />
            </div>
            <div className="company-info">
              <h1>SHOE BEE</h1>
              <p>Chương trình Phổ thông Cao đẳng FPT Polytechnic,</p>
              <p>Phường Cạnh, Từ Liêm, Hà Nội, Việt Nam</p>
              <p>SĐT: {invoiceData.phoneNumber}</p>
            </div>
            <div className="qr-code">
              <QRCode value={invoiceData.invoiceNumber} size={100} />
            </div>
          </div>

          <div className="invoice-info">
            <table>
              <tbody>
                <tr>
                  <td><strong>Mã hóa đơn:</strong></td>
                  <td>{invoiceData.invoiceNumber}</td>
                  <td><strong>Ngày:</strong></td>
                  <td>{invoiceData.date}</td>
                </tr>
                <tr>
                  <td><strong>Khách hàng:</strong></td>
                  <td>{invoiceData.customerName}</td>
                  <td><strong>SĐT:</strong></td>
                  <td>{invoiceData.customerPhone}</td>
                </tr>
                <tr>
                  <td><strong>Địa chỉ:</strong></td>
                  <td colSpan="3">{invoiceData.customerAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="invoice-items">
            <h2>Nội dung đơn hàng (Tổng số lượng sản phẩm: {invoiceData.totalItems})</h2>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString()} đ</td>
                    <td>{item.quantity}</td>
                    <td>{item.status}</td>
                    <td>{item.total.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-summary">
            <table>
              <tbody>
                <tr>
                  <td><strong>Tổng Tiền hàng:</strong></td>
                  <td>{invoiceData.subtotal.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <td><strong>Giảm giá:</strong></td>
                  <td>{invoiceData.discount.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <td><strong>Phí ship:</strong></td>
                  <td>{invoiceData.shippingFee.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <td><strong>Tổng hóa đơn:</strong></td>
                  <td>{invoiceData.total.toLocaleString()} đ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="payment-info">
            <h2>Thông tin thanh toán</h2>
            <table>
              <tbody>
                <tr>
                  <td><strong>Chuyển khoản:</strong></td>
                  <td>{invoiceData.paymentAmount.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <td><strong>Phương thức:</strong></td>
                  <td>{invoiceData.paymentMethod}</td>
                </tr>
                <tr>
                  <td><strong>Tổng thanh toán:</strong></td>
                  <td>{invoiceData.totalPayment.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <td><strong>Tiền thối lại:</strong></td>
                  <td>{invoiceData.change.toLocaleString()} đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="print-button" onClick={handlePrint}>In hóa đơn</button>
       
        <ThongTinThanhToan onPaymentSuccess={handlePrint} name={name} phone={phone} email={email} address={address} />

      </div>
      
    );
  };

  export default HoaDon;