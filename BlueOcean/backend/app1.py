import openai
import pandas as pd
import time
from openai import OpenAI
import os
client = OpenAI(api_key="YORE_API_KEY")

def summarize_and_extract_keywords(text):
    prompt = f"""
다음 공지글을 1문장으로 요약하고, 주요 단어나 활동 대상 등과 같은 키워드를 쉼표로 구분해서 출력해줘. 키워드는 3개 이하여야 해!
만약 청소년 대상이 아닌 것들은 제거해줘.
대외활동/공모전/입시는 중요해서 이런 내용이 있으면 키워드에 포함시켜줘줘

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

# CSV 불러오기
df = pd.read_csv("C:/Users/jrnee/Documents/babybaby/allcon_output/filtered_contest_data.csv")

summaries = []
keywords = []

error_log = []

for idx, content in enumerate(df["본문"]):
    if pd.isna(content):
        summaries.append("")
        keywords.append("")
        continue

    try:
        result = summarize_and_extract_keywords(content)
        lines = result.strip().split("\n")

        if len(lines) < 2 or not lines[0].startswith("요약:") or not lines[1].startswith("키워드:"):
            print(f"⚠️ 형식 오류 발생 (index={idx})\nresult:\n{result}\n")
            summaries.append("형식 오류")
            keywords.append("")
            error_log.append(f"[{idx}] 형식 오류\n{result}\n")
            continue

        summary = lines[0].replace("요약:", "").strip()
        keyword = lines[1].replace("키워드:", "").strip()

        summaries.append(summary)
        keywords.append(keyword)
        print(f"✅ [{idx}] 완료")

    except Exception as e:
        print(f"❌ 오류 발생 (index={idx}): {e}")
        summaries.append("에러")
        keywords.append("")
        error_log.append(f"[{idx}] 예외 발생: {e}\n")
        continue

    time.sleep(1)
# 결과 저장 경로
save_dir = "C:/Users/jrnee/Desktop/babybaby/allcon_output"
os.makedirs(save_dir, exist_ok=True)

# 데이터 저장
df["요약"] = summaries
df["키워드"] = keywords
df.to_csv(os.path.join(save_dir, "공지_요약완료_new.csv"), index=False)

# 에러 로그 저장
if error_log:
    with open(os.path.join(save_dir, "error_log.txt"), "w", encoding="utf-8") as f:
        f.write("\n\n".join(error_log))

print("🎉 전체 완료 및 저장됨!")