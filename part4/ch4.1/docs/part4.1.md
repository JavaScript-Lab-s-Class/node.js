## 📖 4.1 요청과 응답 이해하기

---

**📷 사진**

![1.png](..%2Fimages%2F1.png)


**👨🏻‍🏫 설명**

---

**클라이언트에서 서버로 요청(`Request`)를 보내고, 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트에 응답(`Response`)를 보냅니다.**

- **따라서 서버에서는 요청을 받는 부분과 응답을 보내는 부분이 있어야 합니다.**
- **`Node.js`에서는 요청과 응답은 이벤트 방식이라고 생각하면 됩니다.**

**→ 서버는 클라이언트로부터 요청이 왔을 때, 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해둬야 합니다.**

<br/>

**💻 코드**

``` javascript
const http = require('http');

http.createServer((req, res) => {
  //응답 내용
});
```

**👨🏻‍🏫 설명**

- **`http` 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 `HTTP` 모듈을 사용했습니다.**
- **`http` 모듈에는 `createServer` 메서드가 존재하며, 인수로 요청에 대한 콜백 함수를 넣을 수 있으며, 요청이 들어올 때마다 매번 콜백 함수가 실행됩니다.**

**→ 해당 콜백 함수에 응답을 적으면 작동합니다.**

- **`createServer`의 콜백 부분을 보면, `req`와 `res` 매개변수가 존재하며, 보통 `request`를 줄여 `req`라고 표현하고 `response`를 줄여 `res`라고 표현합니다.**
- **`req` 객체 = 요청에 관한 정보들, `res` 객체 = 응답에 관한 정보들을 담고 있음**

<br/>

**💻 코드**

- **서버를 종료하려면 `Commend + C`를 입력하면 됩니다.**

``` javascript
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });

```

**📷 코드 실행 성공 시**

- **`localhost:8080` 과 콘솔에 다음과 같이 출력됩니다.**

```bash
8080번 포트에서 서버 대기 중입니다!
```

![2.png](..%2Fimages%2F2.png)

<br/>

**👨🏻‍🏫 설명**

- **`createServer` 메서드 뒤에 `listen` 메서드를 붙이고, 클라이언트에 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수를 넣습니다.**

**→ 해당 파일을 실행하면 서버는 8080번 포트에서 요청이 오기를 기다립니다.**

- **`res` 객체에는 `res.writeHead`와 `res.write`, `res.end` 메서드가 있습니다.**
    - **`res.writeHead` = 응답에 대한 정보를 기록하는 메서드**
    - 첫번째 인수로, 성공적인 요청임을 의미하는 200
    - 두번째 인수로 응답에 대한 정보를 보냄(콘텐츠의 형식이 HTML이며, 한글 표시를 위해 charset을 utf-8로 저정함)

→ 헤더 정보라고 합니다.

- **`res.write` 메서드 = 데이터가 기록하는 본문**
    - **첫번째 인수로 클라이언트로 보낼 데이터**
    - **HTML 모양의 문자열을 보냈지만, 버퍼를 보낼 수 있음**
    - **여러 번 호출해서 데이터를 여러 개 보낼 수 있음**
- **`res.end` 메서드 = 응답을 종료하는 메서드**
    - **만약 인수가 있다면, 해당 데이터도 클라이언트로 보내고 응답을 종료함**

<br/>

**📷 사진**

---

![3.png](..%2Fimages%2F3.png)

**👨🏻‍🏫 설명**

---

- **위의 코드는 `res.write`에서 `<h1>Hello Node!</h1>`를
  `res.end`에서 `<p>Hello Server!</p>`를 보내고 응답이 종료됩니다.**

**➕ 추가 코드**

- **`listen` 메서드에 콜백 함수를 넣는 대신, 서버에 `listening` 이벤트 리스너를 붙여도 됩니다. 또한 `error` 이벤트 리스너도 붙여도 됩니다.**

<br/>

**💻 코드**

``` javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
server.listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다.');
})

server.on('error', (error) => {
  console.error(error);
})
```

<br/>

**💻 코드**

- **한번에 여러 서버를 실행할 수도 있습니다. `createServer`를 원하는 만큼 호출하면 됩니다.**
- **`localhost:8080`번 포트와 `localhost:8081`번 포트로 서버를 동시에 띄울 수 있습니다.**

**→ 실무에서 이런 식으로 서버를 여러 개 띄우는 일은 드뭅니다.**

``` javascript
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})

  .listen(8080, () => { //서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다.');
  });

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})

  .listen(8081, () => { //서버 연결
    console.log('8081번 포트에서 서버 대기중입니다.');
  });

```

- **`res.write`와 `res.end`에 일일히 `HTML`을 작성하는 것은 비효율적이기에 미리 `HTML`파일을 만들어 사용합니다.**

**→ 이에 미리 `HTML` 파일을 만들고 나서 띄우도록 변경하겠습니다.**

<br/>

**💻 코드**

``` javascript
const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server2.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain;charset = utf-8'});
    res.end(err.message);
  }
})

  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기중입니다!');
  });
```

**📷 코드 실행 성공 시**

```bash
8081번 포트에서 서버 대기중입니다!
```

![4.png](..%2Fimages%2F4.png)

<br/>

**👨🏻‍🏫 설명**

1. 요청이 들어오면 먼저 fs모듈로 HTML 파일을 읽습니다.
2. data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 됩니다.

→ 이전 코드에서는 문자열을 보냈지만, 위와 같이 버퍼를 이용해서 보낼 수도 있습니다.

1. 예기치 못한 에러가 발생한 경우, 에러 메시지를 응답합니다.
- **에러 메시지는 일반 문자열이므로, `text/plain`을 사용했습니다.**
1. 포트 번호를 8081번으로 사용했습니다.