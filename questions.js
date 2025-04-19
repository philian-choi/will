const questions = [
    // PART 1. 유언의 목적과 기본 정보
    {
        id: 1,
        text: "이번 유언을 남기게 된 계기는 무엇인가요? (복수 선택 가능)",
        type: "multiple",
        options: [
            "최근 병원 진단 또는 건강 악화",
            "사고를 겪거나 주변인의 죽음을 경험함",
            "나이가 들면서 미래를 준비하고 싶음",
            "가족에게 내 뜻을 미리 전달하고 싶음",
            "이전 유언을 갱신하고 싶음"
        ],
        hasOther: true,
        example: "갑작스러운 암 진단으로 나의 뜻을 가족에게 명확히 남기고 싶어졌습니다."
    },
    {
        id: 2,
        text: "유언을 통해 가장 전하고 싶은 메시지는 무엇인가요? (복수 선택 가능)",
        type: "multiple",
        options: [
            "재산 분배에 대한 명확한 의사",
            "가족 간 갈등 방지",
            "자녀에게 남기는 인생 철학",
            "감사 또는 사과 등 감정적 표현",
            "장례나 치료 방식에 대한 내 결정"
        ],
        example: "돈보다 감사와 철학을 남기고 싶습니다."
    },
    {
        id: 3,
        text: "본인의 인적사항을 작성해 주세요.",
        type: "form",
        fields: [
            { label: "이름", key: "name" },
            { label: "생년월일", key: "birthdate" },
            { label: "주소", key: "address" },
            { label: "연락처", key: "phone" }
        ]
    },
    {
        id: 4,
        text: "이 유언은 기존 유언을 대체하는 것인가요?",
        type: "radio",
        options: [
            "처음 작성함",
            "기존 유언을 수정하거나 대체함"
        ],
        hasDetails: true,
        detailsPrompt: "작성일자: ______, 내용: ______"
    },

    // PART 2. 재산에 대한 유언
    {
        id: 5,
        text: "본인이 소유한 부동산은 다음 중 어떤 것이 있나요? (복수 선택 가능)",
        type: "multiple",
        options: [
            "본인 거주 아파트",
            "상가, 사무실",
            "임대용 부동산",
            "토지"
        ],
        hasOther: true,
        hasDetails: true,
        detailsPrompt: "주소, 면적, 등기 여부를 아래에 작성해 주세요."
    },
    {
        id: 6,
        text: "각 부동산은 누구에게 상속하길 원하시나요?",
        type: "text",
        example: "서울 서초 아파트는 장남에게. 해당 지역에 거주 중이어서 실익이 높음."
    },
    {
        id: 7,
        text: "부동산 처리(등기, 세금 등)를 맡기고 싶은 사람이 있다면?",
        type: "radio",
        options: [
            "없음",
            "가족 구성원",
            "변호사 또는 법무사"
        ],
        hasDetails: true,
        detailsPrompt: "이름/관계: ______"
    },
    {
        id: 8,
        text: "금융자산(예금, 보험, 펀드 등)의 종류와 보유 기관은? (복수 선택 가능)",
        type: "multiple",
        options: [
            "예금",
            "보험",
            "연금",
            "펀드 또는 CMA 계좌"
        ],
        hasDetails: true,
        detailsPrompt: "은행명/기관명: ______, 잔고/수익자: ______"
    },
    {
        id: 9,
        text: "금융자산은 어떻게 상속하길 원하시나요?",
        type: "radio",
        options: [
            "자녀에게 균등하게",
            "배우자에게 전액",
            "특정 자산만 지정",
            "일부는 기부"
        ],
        hasDetails: true,
        detailsPrompt: "구체적인 분배 방식: ______"
    },
    {
        id: 10,
        text: "금융 정보(비밀번호, OTP 등)는 어떻게 전달하길 원하시나요?",
        type: "radio",
        options: [
            "종이 메모",
            "암호 관리자 앱",
            "가족 1인에게 구두 전달",
            "USB 또는 클라우드"
        ],
        hasDetails: true,
        detailsPrompt: "전달 방식 상세: ______"
    },
    {
        id: 11,
        text: "보유 중인 주식/ETF/가상자산은 어떤 플랫폼에 있나요?",
        type: "form",
        fields: [
            { label: "증권사", key: "securities" },
            { label: "코인 거래소", key: "crypto_exchange" },
            { label: "보유 종목 및 수량", key: "holdings" }
        ]
    },
    {
        id: 12,
        text: "암호화폐 지갑 복구키는 어디에 있나요?",
        type: "radio",
        options: [
            "종이에 기록",
            "금고에 보관",
            "가족 1인에게 전달",
            "아직 준비되지 않음"
        ]
    },
    {
        id: 13,
        text: "주식/코인은 어떤 기준으로 분배하고 싶으신가요?",
        type: "radio",
        options: [
            "투자 경험자에게 위험 자산 우선",
            "자녀별로 균등하게",
            "특정 자산은 특정인에게"
        ],
        hasDetails: true,
        detailsPrompt: "분배 방식 상세: ______"
    },
    {
        id: 14,
        text: "현재 채무나 보증이 있나요?",
        type: "multiple",
        options: [
            "없음",
            "전세 대출",
            "신용카드",
            "보증",
            "기타"
        ],
        hasDetails: true,
        detailsPrompt: "금액과 금융기관: ______"
    },
    {
        id: 15,
        text: "상속인에게 남기고 싶은 채무 처리 요청은?",
        type: "radio",
        options: [
            "상속포기 권장",
            "일부 채무는 갚아주길 바람"
        ],
        hasDetails: true,
        detailsPrompt: "구체적인 요청사항: ______"
    },
    {
        id: 16,
        text: "자동차, 미술품, 귀금속 등 기타 자산이 있다면 적어주세요",
        type: "text",
        placeholder: "각각의 자산별 명칭, 가치, 상속 대상"
    },
    {
        id: 17,
        text: "반려동물 이름, 품종, 성격은?",
        type: "text",
        example: "복실이 / 말티즈 / 온순하고 외향적"
    },
    {
        id: 18,
        text: "반려동물의 양육을 부탁하고 싶은 사람은?",
        type: "radio",
        options: [
            "가족",
            "지인"
        ],
        hasDetails: true,
        detailsPrompt: "이름: ______, 사전 동의 여부: ______"
    },
    {
        id: 19,
        text: "반려동물 양육비를 남기고 싶으신가요?",
        type: "radio",
        options: [
            "없음",
            "있음"
        ],
        hasDetails: true,
        detailsPrompt: "매월 ___만 원 / 총액 ___만 원"
    },

    // PART 3. 생명과 죽음에 대한 결정
    {
        id: 20,
        text: "회복 불가능한 상황일 경우 연명치료를 원하시나요?",
        type: "radio",
        options: [
            "받지 않음 (존엄사 희망)",
            "상황에 따라 가족 판단",
            "가능하면 연장 원함"
        ]
    },
    {
        id: 21,
        text: "어떤 조건에서 연명치료를 거부하고 싶으신가요? (복수 선택 가능)",
        type: "multiple",
        options: [
            "회복 가능성이 3개월 미만",
            "식물인간 상태",
            "뇌사 진단"
        ],
        hasOther: true
    },
    {
        id: 22,
        text: "가족이 반대해도 본인의 뜻이 우선되길 바라시나요?",
        type: "radio",
        options: [
            "예",
            "아니오"
        ]
    },
    {
        id: 23,
        text: "연명의료의향서를 별도로 작성하셨나요?",
        type: "radio",
        options: [
            "예",
            "아니오"
        ],
        hasDetails: true,
        detailsPrompt: "작성기관 및 날짜: ______"
    },
    {
        id: 24,
        text: "장기기증에 동의하시나요?",
        type: "radio",
        options: [
            "예",
            "아니오"
        ]
    },
    {
        id: 25,
        text: "기증하고 싶은 장기를 선택해 주세요. (복수 선택 가능)",
        type: "multiple",
        options: [
            "심장",
            "신장",
            "간",
            "각막",
            "일부 제외하고 싶음 (예: 얼굴, 피부 등)"
        ],
        hasOther: true
    },
    {
        id: 26,
        text: "해부용 인체 기증 의향이 있으신가요?",
        type: "radio",
        options: [
            "예",
            "아니오"
        ],
        hasDetails: true,
        detailsPrompt: "기관: ______"
    },
    {
        id: 27,
        text: "장례 방식 선호",
        type: "radio",
        options: [
            "화장",
            "매장",
            "수목장",
            "가족 판단에 맡김"
        ]
    },
    {
        id: 28,
        text: "유골 안치 장소 지정",
        type: "text",
        placeholder: "지역, 납골당명, 수목장 등 자유 입력"
    },
    {
        id: 29,
        text: "장례식 규모",
        type: "radio",
        options: [
            "가족장",
            "지인 포함 공개 장례"
        ],
        hasOther: true
    },
    {
        id: 30,
        text: "장례식의 구체적 방식 요청이 있다면 적어주세요",
        type: "text",
        placeholder: "종교, 음악, 진행자 등"
    },
    {
        id: 31,
        text: "장례비용은 어떤 자산에서 지급되길 원하시나요?",
        type: "text",
        placeholder: "계좌 또는 상속인 지정"
    },

    // PART 4. 가족과 관계에 대한 유언
    {
        id: 32,
        text: "감사 메시지를 남기고 싶은 사람이 있다면 누구인가요?",
        type: "text",
        placeholder: "이름 / 관계 / 메시지"
    },
    {
        id: 33,
        text: "사과하고 싶은 사람이 있다면 누구인가요?",
        type: "text",
        placeholder: "이름 / 관계 / 사과의 이유와 말"
    },
    {
        id: 34,
        text: "감사를 표현하고 싶은 지인 또는 도움을 준 분이 있다면?",
        type: "text",
        placeholder: "이름 / 금액 또는 방법"
    },
    {
        id: 35,
        text: "화해하고 싶은 가족이 있다면 누구인가요?",
        type: "text",
        placeholder: "메시지 형식으로 작성 가능"
    },
    {
        id: 36,
        text: "제3자에게 유산 일부를 증여할 계획이 있나요?",
        type: "radio",
        options: [
            "예",
            "아니오"
        ],
        hasDetails: true,
        detailsPrompt: "대상: ______ / 금액: ______"
    },
    {
        id: 37,
        text: "유언 집행자를 지정하고 싶으신가요?",
        type: "radio",
        options: [
            "가족",
            "법률 전문가",
            "없음"
        ],
        hasDetails: true,
        detailsPrompt: "이름/관계: ______"
    },

    // PART 5. 디지털 자산과 온라인 정체성
    {
        id: 38,
        text: "사용 중인 SNS 계정은 어떤 방식으로 처리하길 원하시나요? (복수 선택 가능)",
        type: "multiple",
        options: [
            "삭제",
            "추모 계정 전환",
            "가족이 유지"
        ],
        hasOther: true
    },
    {
        id: 39,
        text: "유튜브, 블로그, 웹사이트는 어떻게 하시겠습니까?",
        type: "text",
        placeholder: "채널, 블로그명, 유지/삭제 여부"
    },
    {
        id: 40,
        text: "이메일 계정 처리 방식",
        type: "radio",
        options: [
            "삭제",
            "가족 전달",
            "유지"
        ]
    },
    {
        id: 41,
        text: "클라우드 저장소 접근 권한 지정",
        type: "text",
        placeholder: "iCloud / Google Drive 등의 계정, 전달 대상, 자료 유지 여부"
    },
    {
        id: 42,
        text: "사진, 영상은 남기길 원하시나요?",
        type: "radio",
        options: [
            "가족 사진만 남김",
            "전체 삭제",
            "선택 삭제"
        ],
        hasDetails: true,
        detailsPrompt: "삭제할 항목: ______"
    },
    {
        id: 43,
        text: "NFT, 디지털 아트 등 메타버스 자산이 있다면",
        type: "text",
        placeholder: "계정명, 작품명, 상속 대상 또는 처리 방식"
    },

    // PART 6. 미래형 유언과 개인 철학
    {
        id: 44,
        text: "사망 후 AI 복제(챗봇, 디지털 분신)에 대해",
        type: "radio",
        options: [
            "동의함",
            "가족 동의 시 허용",
            "동의하지 않음"
        ]
    },
    {
        id: 45,
        text: "유언 영상 공개 범위",
        type: "radio",
        options: [
            "가족만",
            "일부 지인 포함",
            "전면 비공개"
        ]
    },
    {
        id: 46,
        text: "자서전, 일기 등의 콘텐츠 공개 여부",
        type: "text",
        example: "일기는 비공개, 자서전은 가족에게만 공유"
    },
    {
        id: 47,
        text: "가족이 기일에 나를 어떻게 기억해주길 바라시나요?",
        type: "text",
        example: "매년 생일에 식사하며 음악을 틀어줬으면"
    },
    {
        id: 48,
        text: "메타버스 추모관, 생중계 장례 허용 여부",
        type: "radio",
        options: [
            "허용",
            "원하지 않음"
        ]
    },
    {
        id: 49,
        text: "사후 기부 의사",
        type: "radio",
        options: [
            "예",
            "아니오"
        ],
        hasDetails: true,
        detailsPrompt: "단체명: ______ / 금액 또는 조건: ______"
    },
    {
        id: 50,
        text: "나의 인생철학을 한 문장으로 요약한다면?",
        type: "text",
        example: "정직하게 살고, 받은 사랑을 나누라"
    }
];

// Question types:
// - "multiple": Multiple choice with checkboxes
// - "radio": Single choice with radio buttons
// - "form": Multiple text input fields
// - "text": Single text input
// - "select": Dropdown selection

// Export the questions array
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questions;
} 