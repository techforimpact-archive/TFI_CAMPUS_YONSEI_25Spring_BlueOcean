import openai
import pandas as pd
import time

# 최신 openai 라이브러리 기준 설정
from openai import OpenAI

client = OpenAI(api_key="Your_API_KEY")


def summarize_and_extract_keywords(text):
    prompt = f"""
다음 공지글을 1문장으로 요약하고, 주요 단어나 활동 대상 등과 같은 키워드를 쉼표로 구분해서 출력해줘. 키워드는 3개 이하여야 해!

공지글:
{text}

출력 형식:
요약: ...
키워드: ...
"""
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
    )
    return response.choices[0].message.content

df = pd.read_csv("C:/Users/jrnee/Desktop/babybaby/frontend/public/1388_output/1388_공지_크롤링.csv")

summaries = []
keywords = []

for content in df["본문"]:
    if pd.isna(content):
        summaries.append("")
        keywords.append("")
        continue

    result = summarize_and_extract_keywords(content)
    lines = result.split("\n")
    summary = lines[0].replace("요약:", "").strip()
    keyword = lines[1].replace("키워드:", "").strip()

    summaries.append(summary)
    keywords.append(keyword)
    time.sleep(1)

df["요약"] = summaries
df["키워드"] = keywords

df.to_csv("C:/Users/jrnee/Desktop/babybaby/frontend/public/1388_output/공지_요약완료.csv", index=False)
