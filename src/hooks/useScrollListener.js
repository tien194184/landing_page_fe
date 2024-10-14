import { createContext, useState, useEffect } from "react";

export default function useScrollListener() {
  const [data, setData] = useState({
    x: window.scrollX,  // Đặt giá trị khởi tạo từ vị trí hiện tại
    y: window.scrollY,
    lastX: 0,
    lastY: 0
  });

  // set up event listeners
  useEffect(() => {
    const handleScroll = () => {
      setData((last) => ({
        x: window.scrollX,
        y: window.scrollY,
        lastX: last.x,
        lastY: last.y
      }));
    };

    window.addEventListener("scroll", handleScroll);

    // Gọi hàm để cập nhật giá trị khởi tạo ngay lập tức
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return data;
}

export const ScrollContext = createContext(null);
