## 📖 4.2 REST와 라우팅 사용하기

---

- 서버에 요청을 보낼 때는 주소를 통해서 요청의 내용을 표현합니다.

**예시**

- **주소가 `/index.html`이면 서버의 `index.html`을 보내달라는 뜻이고, `/about.html`이면 `about.html`을 보내달라는 뜻입니다.**

- **항상 `html`만 요청할 필요는 없으며, `css`나 `js` 또는 이미지 같은 파일을 요청할 수도 있고 특정 동작을 행하는 것을 요청할 수도 있습니다.**
- **요청의 내용이 주소를 통해 표현됨으로, 서버가 이해하기 쉬운 주소를 사용하는 것이 좋습니다.**

→ 여기서 `**REST**`가 등장합니다.

- `**REST`는 `REpresentational Status Transfer`의 줄임말로, 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킵니다.**
- **일종의 약속이이며, 자원이라고 해서 꼭 파일일 필요는 없고 서버가 행할 수 있는 것들을 통틀어서 의미합니다.**

- **주소는 의미를 명확히 전달하기 위해 명사로 구성됩니다.**

**예시**

- **`/user` = 사용자 정보에 관련된 자원을 요청함**
- **`/post` = 게시글에 관련된 자원을 요청함**

**→ 단순히 명사만 있으면, 무슨 동작을 행하라는 것을 알기 어려움으로 REST에서는 주소 외에 HTTP 요청 메서드라는 것을 사용합니다.**

| HTTP 요청 메서드 | 의미 |
| --- | --- |
| GET | 서버의 자원을 가져올 때 사용합니다. 요청의 본문에 데이터를 넣지 않습니다. 데이터를 서버로 보내야 한다면 쿼리 스트링을 사용합니다. |
| POST | 서버로 자원을 새로 등록할 때 사용합니다. 요청의 본문에 새로 등록할 데이터를 넣어 보냅니다. |
| PUT | 서버의 자원을 요청에 들어 있는 자원을 치환하고자 할 때 사용합니다. 요청의 본문에 치환할 데이터를 넣어 보냅니다. |
| PATCH | 서버 자원의 일부만 수정할 때 사용합니다. 요청의 본문에 일부 수정할 데이터를 넣어 보냅니다. |
| DELETE | 서버의 자원을 삭제하고자 할 때 사용합니다. 요청의 본문에 데이터를 넣지 않습니다. |
| OPTIONS | 요청을 하기 전에 통신 옵션을 설명하기 위해 사용합니다. |

**⚠️ 알아두어야 할 점**

- **주소 하나가 요청 메서드를 여러 개 가질 수 있습니다.**
- **`GET` 메서드의 `/user` 주소로 요청을 보내면, 사용자 정보를 가져오는 요청이라는 것을 알 수 있고, `POST` 메서드의 `/user` 주소로 요청을 보내면 새로운 사용자를 등록하려는 것을 알 수 있습니다.**

**→ 만약 위로 메서드로 표현하기 애매한 로그인 같은 동작이 있다면, 그냥 POST를 사용하면 됩니다.**

**📷 사진**

---

![1.png](..%2Fimages%2F1.png)


**👍🏻장점**

---

- **주소와 메서드만 보고, 요청의 내용을 알아볼 수 있습니다.**

**→ GET 메소드의 경우, 브라우저에 캐싱(기억)할 수 있어 같은 주소로 GET 요청을 할 때 서버에서 가져오는 것이 아닌, 캐시에서 가져올 수 있습니다.**

- **이렇게 캐싱이 되면 성능이 좋아집니다.**
- **HTTP 통신을 사용하면 클라이언트가 누구든 상관없이 같은 방식으로 서버와 소통할 수 있습니다.**

**→ 서버와 클라이언트가 분리되어, 추후 서버를 확장할 때 클라이언트에 구애되지 않아 좋습니다.**

**🔎 예시 - `REST`에 기반한 서버 주소 구조**

| HTTP 메서드 | 주소 | 역할 |
| --- | --- | --- |
| GET | / | restFront.html 파일 제공 |
| GET | /about | about.html 파일 제공 |
| GET | /users | 사용자 목록 제공 |
| GET | 기타 | 기타 정적 파일 제공 |
| POST | /user | 사용자 등록 |
| PUT | /user/ 사용자 id | 해당 id의 사용자 수정 |
| DELETE | /user/ 사용자 id | 해당 id의 사용자 제거 |

**📷 코드**

`**restFront.css**`

```css
a {
    color: blue;
    text-decoration: none;
}ㅊ
```

**`restFront.html`**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>RESTful SERVER</title>
    <link rel='stylesheet' href="restFront.css">
</head>
<body>
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
<div>
    <form id="form">
        <input type="text" id="username">
        <button type="submit">등록</button>
    </form>
</div>
<div id='list'></div>
<script src="https://unpkg.com/axios/dist.min.js"></script>
<script src="restFront.js"></script>

</body>
</html>
```

**`restFront.js`**

```jsx
async function getUser() { //로딩 시 사용자 정보를 가져오는 함수
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const list = document.getElementById('list');
    list.innerHTML = '';
    //사용자가 반복적으로 화면 표시 및 이벤트 연결
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      span.textContent = users[key];
      const edit = document.createElement('button');
      edit.addEventListener('click', async () => { //수정 버튼 클릭
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다.');
        }
        try {
          await axios.put('/user/' + key, {name});
          getUser();
        } catch (err) {
          console.log(err);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { //삭제 버튼 클릭
        try {
          await axios.delete('/user/' + key);
          getUser();
        } catch (err) {
          console.log(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser(); //화면 로딩 시 getUser 호출
//폼 제출(submit)시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  try {
    await axios.post('/user', {name});
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
});
```

**`about.html`**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>RESTful SERVER</title>
    <link rel="stylesheet" href="restFront.css">
</head>
<body>
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
<div>
    <h2>소개 페이지입니다.</h2>
    <p>사용자 이름을 등록하세요!</p>
</div>
</body>
</html>
```

**`restServer.js`**

```jsx
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile(path.join(__dirname, 'about.html'));
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        return res.end(data);
      }
      // 주소가 /도 /about도 아니면
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(err.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
```

**👨🏻‍🏫 설명**

- **req.method로 HTTP 요청 메서드를 구분하고 있습니다.**
- **메서드가 `GET`이면, `req.url`로 요청 주소를 구분합니다.**
    - **주소가 `/`일때는 `restFront.html`을 제공하고, 주소가 `/about`이면 `about.html` 파일을 제공합니다.**

  **→ 이외의 경우, 주소에 적힌 파일을 제공함**


**📷 코드**

- **`restServer.js`의 나머지 코드를 구현함**
1. **다른 HTTP 요청 메서드를 추가하고, DB대용으로 `users`라는 객체를 선언하여 사용자 정보를 저장함**
2. **POST /user 요청에는 사용자를 새로 저장하고 있으며, PUT /user/아이디 요청에 대해서는 해당 아이디의 사용자를 수정하고 있습니다.**
- **DELETE /user/아이디 요청에서는 해당 아이디의 사용자를 제거합니다.**

```jsx
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {};// 데이터 저장용

http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile(path.join(__dirname, 'about.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
       // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('등록 성공');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
```
