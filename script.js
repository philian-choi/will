// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const container = document.getElementById('notification-container');
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update the existing functions to use notifications
function showQuestion(index) {
    if (index < questions.length) {
        currentQuestionIndex = index;
        const questionScreen = document.getElementById('question-screen');
        const questionText = document.getElementById('question-text');
        const answerInput = document.getElementById('answer-input');
        
        questionText.textContent = questions[index];
        answerInput.value = answers[index] || '';
        
        updateProgress();
        showScreen('question-screen');
    } else {
        showNotification('모든 질문에 답변하셨습니다!', 'success');
        showScreen('preview-screen');
        generatePreview();
    }
}

function saveAnswer() {
    const answer = document.getElementById('answer-input').value.trim();
    if (answer) {
        answers[currentQuestionIndex] = answer;
        showNotification('답변이 저장되었습니다.', 'success');
        showQuestion(currentQuestionIndex + 1);
    } else {
        showNotification('답변을 입력해주세요.', 'error');
    }
}

function generatePreview() {
    // ... existing code ...
    showNotification('미리보기가 생성되었습니다.', 'info');
}

function copyToClipboard() {
    const previewText = document.getElementById('preview-text');
    navigator.clipboard.writeText(previewText.value)
        .then(() => {
            showNotification('클립보드에 복사되었습니다.', 'success');
        })
        .catch(() => {
            showNotification('복사에 실패했습니다.', 'error');
        });
} 