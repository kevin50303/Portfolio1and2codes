import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  // 為了預防 使用者只在input輸入值後 直接按更多圖片
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "DjTbdnE8ByevKxw9L5X0Sh8LHPE1qGXIZnKvUpDP8rxCtDbjIFZZHlcm";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    let newURL;
    // 將page+1 拿到後面的圖片集
    setPage(page + 1);
    // 假如 input 未輸入 就放入未輸入的圖片集
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}_page=15`;
    }
    // 假如input 有輸入 就要放入有輸入的圖片集 ex:panda
    else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      ;
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
