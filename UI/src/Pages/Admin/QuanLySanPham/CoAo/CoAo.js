import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../Rudux/Reducer/LoadingSlice";
import { toast } from "react-toastify";
import MoDalCoAo from "./ModalCoAo/MoDalCoAo";
const CoAo = () => {
  const [data, setdata] = useState([]);
  const [loaduseE, setloaduseE] = useState(false);
  useEffect(() => {
    getdata();
  }, [loaduseE]);
  const getdata = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/CoAo/getAllCoAoQLCA"
      );
      console.log(res.data);
      if (res.data.length > 0) {
        setdata(res.data);
      }
    } catch (error) {}
  };

  const HandleOnChangeSearch = async (event) => {
    if (event.target.value === "") {
      return getdata();
    }
    try {
      var res = await axios.get(
        `https://localhost:7095/api/CoAo/getAllCoAoQLCAbyname?name=${event.target.value}`
      );
      if (res.data.length > 0) {
        setdata(res.data);
      } else {
        setdata([]);
      }
    } catch (error) {}
  };
  const dispath = useDispatch();
  const HandleOclickDelete = async (item) => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.delete(
          `https://localhost:7095/api/CoAo/${item.id}`
        );

        toast.success("Xóa thành công");
        dispath(SetLoading(false));
        setloaduseE(!loaduseE);
      } catch (error) {
        toast.error(`Gặp lỗi: ${error.response.data}`);
        dispath(SetLoading(false));
      }
    }, 3000);
  };
  return (
    <div className="QuanlyChatLieu">
      <div className="mb-5 ">
        <div className="w-25 mx-auto">
          <h3>Quản lý cổ áo</h3>
        </div>
      </div>

      <div className="QuanlyChatLieu_search">
        <div className="w-45 d-flex">
          <input
            type="text"
            className="form-control ms-3"
            placeholder="Tên cổ áo"
            style={{ width: "36%" }}
            onChange={(event) => HandleOnChangeSearch(event)}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-3 ms-4">
          <MoDalCoAo loaduseE={loaduseE} setloaduseE={setloaduseE} />
        </div>
        <div
          className="w-100 mx-auto"
          style={{ height: "400px", overflowY: "auto" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>ID</th>
                <th>Tên kích thước</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.ten}</td>
                    <td
                      style={{ color: item.trangThai === 1 ? "green" : "red" }}
                    >
                      {item.trangThai === 1 ? "Đang sử dụng" : "Ngưng sử dụng"}
                    </td>
                    <td>
                      <MoDalCoAo
                        item={item}
                        loaduseE={loaduseE}
                        setloaduseE={setloaduseE}
                      />
                      <Button
                        className="ms-2"
                        variant="danger"
                        onClick={() => HandleOclickDelete(item)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CoAo;
