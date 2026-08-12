import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

// ----- [1] 고정 영역: 자기소개, 기술 스택 등으로 커스텀 -----
const staticContent = `
# 👋 반갑수다 현준혁이올시다.

> 주된 시간을 삽질로 태우고 있는 개발자입니다. Backend에서 시작해서 Full Stack Developer를 목표로 공부하고 있습니다.

---

## 이 페이지는 Tistory에 끄적이는 일상 및 일지를 Github를 통해 기록한 흔적입니다.
---
## 📕 Latest Blog Posts
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
  const finalContent = staticContent + blogSection;
  writeFileSync("README.md", finalContent, "utf8");

  console.log("README 업데이트 완료");
})();
