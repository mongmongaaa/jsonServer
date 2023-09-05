const express = require('express')
//첫번째 자리인 req 에서 사용자 프론트단위에서 받아낸 정보가 여기로 옴 
const cors = require('cors') //에러잡아주는놈 
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser') //모듈 가져오는거 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })) //사용
// parse application/json
app.use(bodyParser.json()) //사용 





const data = {
  select: function() {
    return  JSON.parse(fs.readFileSync('./test.json'));
  },
  insert: function(newobj) {
    const jsonData = data.select();
  let newData = [...jsonData, { id:jsonData.length+1, ...newobj }] // 데이터 추가해주는 작업 
                                //JSON.stringify 제이슨 문자 형식으로 만들어주는 애 
  fs.writeFileSync('./test.json',JSON.stringify(newData));   
  return newData;
  },
  update: function() {},
  delete: function() {}
}






    // 경로를 바꾸게되면 /abc 로 바꾼다면 브라우저 서버 요청한 값이 그것과 같다면 이걸 실행함 그럼 프론트단에서는 3030/abc 적어줘야함
app.get('/abc', function (req, res) {
  // const jsonData = fs.readFileSync('./test.json'); 위 셀렉트에서 써줬음
                    //비동기 awate가 걸린것과 같음 내용을 전부 가져오기 전까지  실행이 안됨  
  res.send( data.select() )
}) // 이거 많이 만들 수 있음 

              //동적파일 얘는   const {id} = req.params; 에 들어감
app.delete('/abc/:id', function (req, res) {
  const jsonData = data.select(); // 데이터 들어있는 놈
  const {id} = req.params; // 여기로 들어옴 
  const delData = jsonData.filter(n =>  n.id != id) // 클릭한놈 빼고 다시 뿌리기해주는 놈 
   fs.writeFileSync('./test.json',JSON.stringify(delData));

  res.send( delData )
})


app.post('/insert', function (req, res) {  
       
  res.send(data.insert(req.body)); //< 이건 꼭 있어야함 데이터 찾아주는 애 이거 안넣으면 계속 새로고침 됨  - 없으면 로딩이 길어짐 
})


app.listen(3000) //포트번호 

