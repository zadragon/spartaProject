import React, { useEffect } from "react";

const Nemo = (props) => {
  //count값에 컬러값을 추가한 객체로 기본상태를 세팅한다. { count: 3, color: [] }
  const [count, setCount] = React.useState({ count: 3, color: [] });

  //16진수 랜덤한 컬러값을 리턴하는 함수를 만든다.
  const randomBg = () => {
    let colorCode = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    return colorCode;
  };

  //컬러값세팅은 useEffect를 이용하여 처음 페이지를 불러올때 한번만 실행한다.
  useEffect(() => {
    //카운트 갯수만큼 랜덤컬러값을 가진 배열을 만든다.
    const nemo_count = Array.from({ length: count.count }, (v, i) =>
      randomBg()
    );
    console.log(nemo_count);

    //setCount로 color값 세팅을 한다.
    setCount({ ...count, color: [...nemo_count] });
  }, []);

  console.log(count);

  //네모 추가 클릭이벤트
  const addNemo = () => {
    //setCount를 이용하여 count값은 1을 더하고 color값에는 새로운 랜덤 컬러를 추가한다.
    setCount({
      ...count,
      count: count.count + 1,
      color: [...count.color, randomBg()],
    });
  };

  //네모 삭제
  const removeNemo = () => {
    //count.color 마지막 값을 빼서
    count.color.splice(-1, 1);

    setCount(
      //컬러값 갯수가 0개 이상일때
      count.color.length > 0
        ? { ...count, color: count.color } //컬러값을 삭제한 배열로 덮어씌운다.
        : { ...count, count: 0 } //0과 같거나 -값이면 빈배열을 리턴한다.
    );
  };

  return (
    <div className="App">
      {/* 컴포넌트 렌더링은 컬러값 갯수만큼 랜더링 */}
      {count.color.map((colorCode, idx) => {
        return (
          <div
            key={idx}
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: colorCode, //백그라운드 컬러에 map으로 들어오는 컬러값 렌더링
              margin: "10px",
            }}
          >
            nemo
          </div>
        );
      })}

      <div>
        {/* 함수를 호출합니다. */}
        <button onClick={addNemo}>하나 추가</button>
        <button onClick={removeNemo}>하나 빼기</button>
      </div>
    </div>
  );
};

export default Nemo;
