// State management
let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const questionScreen = document.getElementById('question-screen');
const reviewScreen = document.getElementById('review-screen');
const recordingScreen = document.getElementById('recording-screen');
const startBtn = document.getElementById('start-btn');
const continueBtn = document.getElementById('continue-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const saveBtn = document.getElementById('save-btn');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');
const progressBar = document.getElementById('progress');
const currentQuestionSpan = document.getElementById('current-question');
const willPreview = document.getElementById('will-preview');
const startRecordingBtn = document.getElementById('start-recording');
const stopRecordingBtn = document.getElementById('stop-recording');
const recordingPreview = document.getElementById('recording-preview');

// Event Listeners
startBtn.addEventListener('click', startNewWill);
continueBtn.addEventListener('click', loadSavedWill);
prevBtn.addEventListener('click', showPreviousQuestion);
nextBtn.addEventListener('click', showNextQuestion);
saveBtn.addEventListener('click', saveProgress);
startRecordingBtn.addEventListener('click', startRecording);
stopRecordingBtn.addEventListener('click', stopRecording);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (questionScreen.classList.contains('active')) {
        if (e.key === 'Enter' && e.ctrlKey) {
            showNextQuestion();
        } else if (e.key === 'ArrowLeft' && e.altKey) {
            showPreviousQuestion();
        } else if (e.key === 'ArrowRight' && e.altKey) {
            showNextQuestion();
        } else if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            saveProgress();
        }
    }
});

// Initialize
function startNewWill() {
    answers = new Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    showScreen(questionScreen);
    updateQuestion();
}

function loadSavedWill() {
    const savedAnswers = localStorage.getItem('willAnswers');
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
        currentQuestionIndex = parseInt(localStorage.getItem('currentQuestion')) || 0;
        showScreen(questionScreen);
        updateQuestion();
    } else {
        showNotification('저장된 진행 상황이 없습니다.', 'error');
    }
}

function showScreen(screen) {
    [welcomeScreen, questionScreen, reviewScreen, recordingScreen].forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

function createQuestionElement(question) {
    const container = document.createElement('div');
    container.className = 'question-input-container';

    // Add question text
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question.text;
    container.appendChild(questionTitle);

    // Add example if exists
    if (question.example) {
        const example = document.createElement('p');
        example.className = 'example';
        example.textContent = `👉 ${question.example}`;
        container.appendChild(example);
    }

    // Create input based on question type
    switch (question.type) {
        case 'multiple':
            container.appendChild(createMultipleChoiceInput(question));
            break;
        case 'radio':
            container.appendChild(createRadioInput(question));
            break;
        case 'form':
            container.appendChild(createFormInput(question));
            break;
        case 'text':
        default:
            container.appendChild(createTextInput(question));
    }

    return container;
}

function createMultipleChoiceInput(question) {
    const wrapper = document.createElement('div');
    wrapper.className = 'options-container';

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = option;
        checkbox.checked = answers[currentQuestionIndex]?.includes(option) || false;
        checkbox.addEventListener('change', () => updateMultipleChoiceAnswer());

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));
        wrapper.appendChild(label);
    });

    if (question.hasOther) {
        const otherWrapper = document.createElement('div');
        otherWrapper.className = 'other-option';

        const otherCheckbox = document.createElement('input');
        otherCheckbox.type = 'checkbox';
        otherCheckbox.id = 'other-checkbox';
        
        const otherInput = document.createElement('input');
        otherInput.type = 'text';
        otherInput.placeholder = '기타...';
        otherInput.className = 'other-input';
        
        otherWrapper.appendChild(otherCheckbox);
        otherWrapper.appendChild(otherInput);
        wrapper.appendChild(otherWrapper);
    }

    return wrapper;
}

function createRadioInput(question) {
    const wrapper = document.createElement('div');
    wrapper.className = 'options-container';

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question-${question.id}`;
        radio.value = option;
        radio.checked = answers[currentQuestionIndex] === option;
        radio.addEventListener('change', () => updateRadioAnswer());

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        wrapper.appendChild(label);
    });

    if (question.hasDetails) {
        const detailsInput = document.createElement('input');
        detailsInput.type = 'text';
        detailsInput.placeholder = question.detailsPrompt;
        detailsInput.className = 'details-input';
        wrapper.appendChild(detailsInput);
    }

    return wrapper;
}

function createFormInput(question) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-container';

    question.fields.forEach(field => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field';

        const label = document.createElement('label');
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = field.label;
        input.value = answers[currentQuestionIndex]?.[field.key] || '';
        input.addEventListener('input', () => updateFormAnswer());

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(input);
        wrapper.appendChild(fieldWrapper);
    });

    return wrapper;
}

function createTextInput(question) {
    const textarea = document.createElement('textarea');
    textarea.className = 'answer-input';
    textarea.rows = 4;
    textarea.placeholder = '여기에 답변을 입력해주세요...';
    textarea.value = answers[currentQuestionIndex] || '';
    textarea.addEventListener('input', (e) => {
        answers[currentQuestionIndex] = e.target.value;
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
    });
    return textarea;
}

function updateMultipleChoiceAnswer() {
    const checkboxes = document.querySelectorAll('.option-label input[type="checkbox"]');
    const selectedOptions = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const otherCheckbox = document.getElementById('other-checkbox');
    const otherInput = document.querySelector('.other-input');
    if (otherCheckbox?.checked && otherInput?.value) {
        selectedOptions.push(otherInput.value);
    }

    answers[currentQuestionIndex] = selectedOptions;
}

function updateRadioAnswer() {
    const selectedRadio = document.querySelector(`input[name="question-${questions[currentQuestionIndex].id}"]:checked`);
    const detailsInput = document.querySelector('.details-input');
    
    if (selectedRadio) {
        answers[currentQuestionIndex] = {
            option: selectedRadio.value,
            details: detailsInput?.value || ''
        };
    }
}

function updateFormAnswer() {
    const formInputs = document.querySelectorAll('.form-field input');
    const formData = {};
    
    formInputs.forEach(input => {
        const field = questions[currentQuestionIndex].fields.find(f => f.label === input.placeholder);
        if (field) {
            formData[field.key] = input.value;
        }
    });
    
    answers[currentQuestionIndex] = formData;
}

function updateQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;
    
    // Clear previous content
    const container = document.getElementById('question-container');
    container.innerHTML = '';
    
    // Create and append new question element
    const questionElement = createQuestionElement(question);
    container.appendChild(questionElement);
    
    // Update progress
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    updateProgress();
    updateNavigationButtons();
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? '검토하기 →' : '다음 →';
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
        setTimeout(() => {
            answerInput.focus();
        }, 300);
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
        setTimeout(() => {
            answerInput.focus();
        }, 300);
    } else {
        showReviewScreen();
    }
}

function saveProgress() {
    localStorage.setItem('willAnswers', JSON.stringify(answers));
    localStorage.setItem('currentQuestion', currentQuestionIndex);
    showNotification('진행 상황이 저장되었습니다!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

function showReviewScreen() {
    showScreen(reviewScreen);
    generateWillPreview();
}

function generateWillPreview() {
    let willContent = `<h3>유언장</h3>
<p>본인은 다음과 같이 유언장을 작성합니다:</p>`;

    // Part 1
    willContent += `<div class="will-section">
        <h4>제 1장. 유언의 목적과 기본 정보</h4>`;
    for (let i = 0; i < 4; i++) {
        if (answers[i]) {
            willContent += `<div class="qa-pair">
                <strong>${questions[i]}</strong>
                <p>${answers[i]}</p>
            </div>`;
        }
    }
    willContent += '</div>';

    // Part 2
    willContent += `<div class="will-section">
        <h4>제 2장. 재산에 대한 유언</h4>`;
    for (let i = 4; i < 19; i++) {
        if (answers[i]) {
            willContent += `<div class="qa-pair">
                <strong>${questions[i]}</strong>
                <p>${answers[i]}</p>
            </div>`;
        }
    }
    willContent += '</div>';

    // Part 3
    willContent += `<div class="will-section">
        <h4>제 3장. 생명과 죽음에 대한 결정</h4>`;
    for (let i = 19; i < 32; i++) {
        if (answers[i]) {
            willContent += `<div class="qa-pair">
                <strong>${questions[i]}</strong>
                <p>${answers[i]}</p>
            </div>`;
        }
    }
    willContent += '</div>';

    // Part 4
    willContent += `<div class="will-section">
        <h4>제 4장. 가족과 관계에 대한 유언</h4>`;
    for (let i = 32; i < 38; i++) {
        if (answers[i]) {
            willContent += `<div class="qa-pair">
                <strong>${questions[i]}</strong>
                <p>${answers[i]}</p>
            </div>`;
        }
    }
    willContent += '</div>';

    // Part 5
    willContent += `<div class="will-section">
        <h4>제 5장. 디지털 자산과 온라인 정체성</h4>`;
    for (let i = 38; i < 44; i++) {
        if (answers[i]) {
            willContent += `<div class="qa-pair">
                <strong>${questions[i]}</strong>
                <p>${answers[i]}</p>
            </div>`;
        }
    }
    willContent += '</div>';

    // Part 6
    willContent += `<div class="will-section">
        <h4>제 6장. 미래형 유언과 개인 철학</h4>`;
    for (let i = 44; i < questions.length; i++) {
        if (answers[i]) {
            willContent += `<div class="qa-pair">
                <strong>${questions[i]}</strong>
                <p>${answers[i]}</p>
            </div>`;
        }
    }
    willContent += '</div>';

    willPreview.innerHTML = willContent;
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = document.createElement('audio');
            audio.src = audioUrl;
            audio.controls = true;
            recordingPreview.innerHTML = '';
            recordingPreview.appendChild(audio);

            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = '유언장_녹음.wav';
            downloadLink.textContent = '녹음 다운로드';
            downloadLink.className = 'btn secondary';
            recordingPreview.appendChild(downloadLink);
        });

        mediaRecorder.start();
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false;
        isRecording = true;
        showNotification('녹음이 시작되었습니다.');
    } catch (error) {
        console.error('마이크 접근 오류:', error);
        showNotification('마이크 접근 권한을 확인해주세요.');
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
        isRecording = false;
        showNotification('녹음이 완료되었습니다.');
    }
} 