
const ThanhToanThanhCong = () => {

    const redirectToCart = () => {
        window.location.href = '/giohang';
    }


    return (
        <>
            <a onClick={redirectToCart}>Tiếp tục</a>
        </>
    );
}

export default ThanhToanThanhCong