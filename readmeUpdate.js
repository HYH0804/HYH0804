import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

// ----- [1] 고정 영역: 자기소개, 기술 스택 등으로 커스텀 -----
const staticContent = `
# 👋 반갑수다 현준혁이올시다.

> 주된 시간을 삽질로 태우고 있는 개발자입니다. Backend에서 시작해서 Full Stack Developer를 목표로 공부하고 있습니다.

---

## 🚀 About Me

- 🧐 Backend 개발을 기반으로 Full Stack Developer를 목표로 하고 있습니다.
- 🌱 현재 React를 집중적으로 공부하고 있습니다.
- 🧑‍💻 새로운 기술을 배우고 직접 만들어보는 것을 좋아합니다.
- 🎯 취업 준비 및 소프트웨어마에스트로(18기) 준비를 병행하고 있습니다.

---

## 🎥 소백 (YouTube)

> 소프트웨어 마에스트로 18기 준비 및 취업 준비를 병행하며, 개발 공부와 삽질 과정을 기록하는 공간입니다.

[![YouTube Channel](https://img.shields.io/badge/YouTube-소백%20채널%20바로가기-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@somaHomeProtector)

---

## 🌐 Connect with Me

<a href="mailto:guswnsgur2276@gmail.com"><img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
<a href="https://guswnsgur2276.tistory.com/"><img src="https://img.shields.io/badge/Blog-000000?style=for-the-badge&logo=tistory&logoColor=white"/></a>

---

## 🛠️ Technologies & Tools

### 💻 Backend
<p>
  <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/spring%20boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/jpa-%2359666C.svg?style=for-the-badge&logo=hibernate&logoColor=white"/>
  <img src="https://img.shields.io/badge/mybatis-%23000000.svg?style=for-the-badge&logo=mybatis&logoColor=white"/>
</p>

### 🌐 Frontend
<p>
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/recoil-%233578E5.svg?style=for-the-badge&logo=recoil&logoColor=white"/>
  <img src="https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/antd-%230170FE.svg?style=for-the-badge&logo=antdesign&logoColor=white"/>
  <img src="https://img.shields.io/badge/styled--components-%23DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/react--router-%23CA4245.svg?style=for-the-badge&logo=reactrouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/immer-%2300E7C0.svg?style=for-the-badge&logo=immer&logoColor=black"/>
  <img src="https://img.shields.io/badge/SWR-%23000000.svg?style=for-the-badge&logo=swr&logoColor=white"/>
</p>

### 🚀 Infrastructure & Tools
<p>
  <img src="https://img.shields.io/badge/aws-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
  <img src="https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/github%20actions-%232088FF.svg?style=for-the-badge&logo=github-actions&logoColor=white"/>
</p>

---

## 📕 Latest Blog Posts
`;

const staticContentAfter = `

---
## 📍 Profile Views

![Views](https://visitor-badge.laobi.icu/badge?page_id=HYH0804)

`;

// ----- [2] 자동 갱신 영역: 블로그 RSS 읽어서 최신 글 목록 추가 -----
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  let blogSection = "";

  try {
    // ✅ 아래 parseURL("") 안에 본인의 블로그 rss 페이지 주소를 입력
    const feed = await parser.parseURL("https://guswnsgur2276.tistory.com/rss");
    const latestPostsCount = 5; // 최신 글을 몇 개 가져올지

    for (let i = 0; i < latestPostsCount && i < feed.items.length; i++) {
      const { title, link } = feed.items[i];
      console.log(`${i + 1}번째 게시물: ${title} (${link})`);
      blogSection += `<a href="${link}">${title}</a></br>\n`;
    }
  } catch (error) {
    console.error("RSS 파싱 중 오류 발생:", error);
    blogSection += "블로그 글을 불러오지 못했습니다.\n";
  }

  // ----- [3] 파일 작성 -----
  const finalContent = staticContent + blogSection + staticContentAfter;
  writeFileSync("README.md", finalContent, "utf8");

  console.log("README 업데이트 완료");
})();
