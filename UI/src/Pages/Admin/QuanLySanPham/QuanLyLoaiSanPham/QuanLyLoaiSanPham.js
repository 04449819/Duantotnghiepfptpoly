import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import AddLoaiSP from "./AddLoaiSp/AddLoaiSp";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../Rudux/Reducer/LoadingSlice";
import { toast } from "react-toastify";
const QuanLyLoaiSanPham = () => {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const dispath = useDispatch();

  const handleOnChangeSearch = (event) => {
    setInputSearch(event.target.value);
    getData(1, event.target.value, 2);
    setPageNumber(1);
  };

  const HandleOnLoading = (check) => {
    if (check === true) {
      getData(1, "", 2);
      setPageNumber(1);
    }
  };
  useEffect(() => {
    getData(pageNumber, inputSearch, 1);
  }, []);

  const getData = async (page, search, check) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://localhost:7095/api/LoaiSP/getAll?page=${page}&totalPage=100000&tenLoaiSP=${search}`
      );
      if (res.data.listLsp) {
        if (check === 1) {
          setData((prev) => [...prev, ...res.data.listLsp]);
        } else {
          setData(res.data.listLsp);
        }
        setTotalPage(res.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isBottom && !loading) {
      if (pageNumber < totalPage) {
        getData(pageNumber + 1, inputSearch, 1);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
  };
  const HandleOclickDelete = (item) => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.delete(
          `https://localhost:7095/api/LoaiSP/delete/${item.id}`
        );
        toast.success(`đã xóa thành công`);
        setInputSearch("");
        dispath(SetLoading(false));
        getData(1, "", 2);
        setPageNumber(1);
      } catch (error) {
        toast.error(`Gặp lỗi: ${error.response.data}`);
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  return (
    <div>
      <div className="mb-5">
        <div className="w-25 mx-auto">
          <h3>Quản lý loại sản phẩm</h3>
        </div>
      </div>

      <div>
        <div className="w-45 d-flex ms-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tên loại sản phẩm"
            value={inputSearch}
            style={{ width: "36%" }}
            onChange={handleOnChangeSearch}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-4 ms-4">
          <AddLoaiSP HandleOnLoading={HandleOnLoading} />
        </div>
        <div
          className="w-100 mx-auto QuanLyLoaiSanPham_table"
          onScroll={handleOnScroll}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th style={{ width: "330px" }}>ID loại sản phẩm</th>
                <th>Tên Loại sản phẩm</th>
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
                      {/* <Button
                        variant="warning"
                        onClick={() => HandleOclickUpdate(item)}
                      >
                        Sửa
                      </Button> */}
                      <AddLoaiSP
                        HandleOnLoading={HandleOnLoading}
                        item={item}
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
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default QuanLyLoaiSanPham;
