import corpApi from "@/apis/corp";
import ico_edit from "@/assets/images/ico_edit_white.png";
import { useEffect, useState } from "react";
import styles from "../pages/review/Write.module.scss";

interface SearchCorpBarProps {
  onSelect: (value: string) => void;
}
interface Corp {
  id: number;
  corp_name: string;
  city: string;
  gugun: string;
}

const SearchCorpBar: React.FC<SearchCorpBarProps> = ({ onSelect }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Corp[]>([]);
  const [selected, setSelected] = useState<string>("");

  const [corpList, setCorpList] = useState<Corp[]>([]);

  useEffect(() => {
    if (corpList.length > 0) {
      return;
    }
    const loadCorpList = async () => {
      const savedData = localStorage.getItem("corpList");
      const ONE_DAY = 24 * 60 * 60 * 1000;
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const savedTime = parsed.timestamp;

        if (Date.now() - savedTime < ONE_DAY) {
          setCorpList(parsed.data);
          return;
        }
      }

      const res: any = await corpApi.getAllListForDump();
      const saveObj = {
        timestamp: Date.now(),
        data: res.data,
      };
      localStorage.setItem("corpList", JSON.stringify(saveObj));
      setCorpList(res.data);
    };
    loadCorpList();
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      setResults(corpList.filter((corp) => corp.corp_name.includes(value)));
    } else {
      setResults([]);
    }
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setIsFocused(false);
    setResults([]);
    onSelect(item);
    setSelected(item);
  };

  return (
    <div className={styles.search_bar}>
      {!isFocused ? (
        !selected ? (
          <h1
            className={styles.corp_name}
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "1rem",
              cursor: "text",
            }}
            onClick={() => setIsFocused(true)}
          >
            기관명을 입력해주세요
          </h1>
        ) : (
          <h1
            className={styles.corp_name}
            style={{
              cursor: "text",
            }}
            onClick={() => setIsFocused(true)}
          >
            {selected}
            <img
              src={ico_edit}
              alt="수정"
              style={{ height: "18px", marginLeft: "10px", cursor: "pointer" }}
            />
          </h1>
        )
      ) : (
        <div
          className={styles.search_warp}
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsFocused(false);
            }
          }}
        >
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="기관명을 입력해주세요"
          />
          <div className={styles.search_results}>
            {results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.corp_name)}
                style={{
                  padding: "16px 20px",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ededed")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                {item.corp_name + " | " + item.city + " " + item.gugun}
              </div>
            ))}
          </div>
          <div style={{ padding: "16px 20px", marginTop: "20px" }}>
            찾으시는 기관이 없나요?{" "}
            <a
              className="subtitle"
              style={{ color: "#6269f5", cursor: "pointer" }}
              target="_blank"
              href="https://forms.gle/R1nGsYURtngudXBJ7"
            >
              기관 등록하기
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCorpBar;
