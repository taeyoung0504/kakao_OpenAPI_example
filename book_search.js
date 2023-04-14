let bookName = document.querySelector("#book_name");
let searchBtn = document.querySelector("#search_btn");



//이벤트 핸들러 설정
searchBtn.addEventListener("click", function(e){
    //버튼 기본동작 해제
    e.preventDefault();

    //사용자 입력값
    let searchTitle = bookName.value;
    //인증 키 상수
    const REST_API_KEY= "39d85261aac360dc0c341d7248efb501";
    
    //아래 url에서 target은 검색 필드를 제한함 => 검색 필드를 제목으로 제한하였다.
    fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${searchTitle}`, {
    headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`
    }   
})
    .then(response => response.json())
    .then(renderHTML);  //json 객체를 renderHTML 함수로 넘겨줌
                        // function (searchData) { renderHTML(searchData); }
});

function renderHTML(searchDate){
    
    const result = document.querySelector("#result");
    let output = ``;

    
    for(let i=0; i<searchDate.documents.length; i++){
    const api = searchDate.documents[i]; //중복 코드 json 변수로 만들기
    output += `
    <ul style="list-style: none;">
    <li><img src="${api.thumbnail}" alt="book thumbnail"></li>
    <li> 저자 : ${api.authors}</li>
    <li>책 내용 : ${api.contents}</li>
    <li>가격 : ${api.price}</li>
    <li>세일 가격 : ${api.sale_price}</li>
    <li>isbn : ${api.isbn}</li>
    </ul>
    `
    result.innerHTML = output;
    }
    console.log(searchDate.documents);

}